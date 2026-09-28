'use client';

/**
 * The enquiry funnel.
 *
 * Reduced from seven steps to four required ones. The previous build asked for
 * project type, dimensions, location, free-text requirements and attachments
 * before it would take a name — five screens of friction in front of the only
 * thing that actually matters, which is being able to reply to someone.
 *
 * Now: product → opening → contact, and that is submittable. Detail and files
 * are offered afterwards, as an optional fourth step, because a brief with a
 * photograph is better but a brief without one is still a lead.
 *
 * The API contract is unchanged — the same schema, the same idempotent
 * requestId, the same upload rules.
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Upload, Download } from 'lucide-react';

import { products, flatName } from '@/lib/content';
import { company, waLink } from '@/lib/company';
import { enquirySchema, maxFileSize, allowedMime, type Enquiry } from '@/lib/enquiry-schema';
import { ChoiceGroup, UnitSelect } from './form-controls';
import { track } from '@/lib/analytics';

const STEPS = [
  ['What are you after?', 'Pick the closest starting point. If you are not sure, say so — that is a valid answer.'],
  ['How big is the opening?', 'Approximate is fine. Leave it blank if you have not measured yet.'],
  ['How do we reach you?', 'A name and a number is all that is required.'],
  ['Anything else?', 'Optional. A photograph of the opening is the single most useful thing you can add.'],
] as const;

const LAST = STEPS.length - 1;
/** The step from which the enquiry can be submitted. */
const SUBMITTABLE = 2;

export function QuoteForm() {
  const search = useSearchParams();
  const preset = products.some((p) => p.slug === search.get('product'))
    ? search.get('product')!
    : 'not-sure';

  const [step, setStep] = useState(0);
  const [data, setData] = useState<Enquiry>({
    requestId: '',
    product: preset as Enquiry['product'],
    projectType: 'Commercial',
    width: search.get('width') || '',
    height: search.get('height') || '',
    unit: (['mm', 'cm', 'm', 'ft'].includes(search.get('unit') || '') ? search.get('unit') : 'mm') as Enquiry['unit'],
    location: search.get('location') || '',
    requirements: search.get('brief') || (search.get('interest') === 'references'
      ? 'Please send installation references for work like mine.' : ''),
    name: '', phone: '', whatsapp: '', email: '',
    consent: false as true, website: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; notification: string } | null>(null);

  const requestId = useRef('');
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => { track('quote_form_start', { product: preset }); }, [preset]);

  useEffect(() => {
    if (moved.current) heading.current?.focus();
    moved.current = true;
  }, [step, receipt]);

  const set = (key: keyof Enquiry, value: string | boolean) =>
    setData((d) => ({ ...d, [key]: value }));

  function validate(at: number) {
    if (at === 1) {
      for (const key of ['width', 'height'] as const) {
        const check = enquirySchema.shape[key].safeParse(data[key]);
        if (!check.success) return check.error.issues[0].message;
      }
      if (data.location.trim().length < 2) return 'Add the city or area the project is in.';
    }
    if (at === 2) {
      const partial = enquirySchema.pick({ name: true, phone: true }).safeParse(data);
      if (!partial.success) return partial.error.issues[0].message;
      if (!data.consent) return 'Please agree to the privacy notice so we can handle your enquiry.';
    }
    return '';
  }

  function go(next: number) {
    const problem = validate(step);
    if (next > step && problem) { setError(problem); return; }
    setError('');
    setStep(next);
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    if (files.length + incoming.length > 3) { setError('Up to 3 files.'); return; }
    if (incoming.some((f) => f.size > maxFileSize || !allowedMime.includes(f.type))) {
      setError('JPG, PNG, WebP or PDF, up to 4 MB each.');
      return;
    }
    setFiles((prev) => [...prev, ...incoming]);
    setError('');
    if (fileInput.current) fileInput.current.value = '';
  }

  async function send() {
    // Minted on the first attempt and reused on retries, so a resend of the
    // same enquiry is idempotent server-side rather than a duplicate. Done
    // here rather than on mount: crypto.randomUUID() has no server equivalent
    // during SSR, and generating it in render would mismatch on hydration.
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const parsed = enquirySchema.safeParse({ ...data, requestId: requestId.current });
    if (!parsed.success) { setError(parsed.error.issues.map((i) => i.message).join(' ')); return; }
    setError('');
    setBusy(true);
    try {
      const body = new FormData();
      body.set('enquiry', JSON.stringify(parsed.data));
      files.forEach((f) => body.append('files', f));
      const response = await fetch('/api/enquiries', { method: 'POST', body });
      const result = await response.json() as { id: string; notification: string; error?: string };
      if (!response.ok) throw Error(result.error || 'Your enquiry could not be saved. Please try again.');
      setReceipt(result);
      track('quote_form_completion', { product: data.product, attachments: files.length, step });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not connect. Your entries are still here — try again.');
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate(step);
    if (problem) { setError(problem); return; }
    setError('');
    if (step < SUBMITTABLE) { setStep(step + 1); return; }
    void send();
  }

  const productName = products.find((p) => p.slug === data.product)
    ? flatName(products.find((p) => p.slug === data.product)!)
    : 'Not sure yet';

  const summary = [
    `Ashoka Fabricators enquiry${receipt ? ` — ${receipt.id}` : ''}`,
    `Product:      ${productName}`,
    `Project:      ${data.projectType}`,
    `Opening:      ${data.width || '—'} × ${data.height || '—'} ${data.unit}`,
    `Location:     ${data.location}`,
    `Requirements: ${data.requirements || 'To discuss'}`,
    `Name:         ${data.name}`,
    `Phone:        ${data.phone}`,
    `Email:        ${data.email || 'Not provided'}`,
    `Attachments:  ${files.map((f) => f.name).join(', ') || 'None'}`,
  ].join('\n');

  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `ashoka-enquiry-${receipt?.id || 'brief'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* --- Receipt ------------------------------------------------- */
  if (receipt) {
    const wa = waLink(summary);
    return (
      <div className="form-panel" role="status">
        <p className="meta meta--annot">Enquiry recorded</p>
        <h2 ref={heading} tabIndex={-1} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Check size={28} strokeWidth={2.5} color="var(--annot)" aria-hidden="true" />
          It&rsquo;s in.
        </h2>
        <p className="body-c">
          Your enquiry{files.length ? ` and ${files.length} attachment${files.length === 1 ? '' : 's'}` : ''} has
          been stored against the reference below. Keep it — it identifies your
          enquiry in any follow-up.
        </p>

        <ul className="ledger" style={{ margin: '24px 0' }}>
          <li>
            <span className="ledger__k">Reference</span>
            <span className="ledger__dots" aria-hidden="true" />
            <span className="ledger__v">{receipt.id}</span>
          </li>
          <li>
            <span className="ledger__k">Opening</span>
            <span className="ledger__dots" aria-hidden="true" />
            <span className="ledger__v">{data.width || '—'} × {data.height || '—'} {data.unit}</span>
          </li>
          <li>
            <span className="ledger__k">Product</span>
            <span className="ledger__dots" aria-hidden="true" />
            <span className="ledger__v">{productName}</span>
          </li>
        </ul>

        <div className="note">
          We have your enquiry. For anything urgent, call or WhatsApp {company.phone} and quote your reference.
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 24px', alignItems: 'center', marginTop: 26 }}>
          <button className="btn" onClick={download}>Save your brief <Download size={16} /></button>
          {wa && <a className="link" href={wa} target="_blank" rel="noreferrer">Send on WhatsApp <ArrowRight size={14} /></a>}
          {company.phone && <a className="link" href={`tel:${company.phone.replace(/s/g, '')}`}>Call {company.phone} <ArrowRight size={14} /></a>}
        </div>

        <p className="meta" style={{ marginTop: 24 }}>
          This is an enquiry receipt. It is not a quotation, a price or an order.
        </p>
      </div>
    );
  }

  /* --- Form ---------------------------------------------------- */
  return (
    <form className="form-panel" onSubmit={onSubmit} noValidate>
      <div className="step-row">
        <span className="meta">Step {step + 1} of {STEPS.length}</span>
        <span className="meta">{step >= SUBMITTABLE ? 'Ready to send' : `${SUBMITTABLE - step} to go`}</span>
      </div>
      <div className="form-track" aria-hidden="true">
        {STEPS.map((_, i) => <i key={i} data-on={i <= step ? '1' : '0'} />)}
      </div>

      <h2 ref={heading} tabIndex={-1}>{STEPS[step][0]}</h2>
      <p className="form-step-note">{STEPS[step][1]}</p>

      {step === 0 && (
        <>
          <ChoiceGroup
            name="Product" value={data.product} onChange={(v) => set('product', v)}
            options={[
              ...products.map((p) => ({ label: flatName(p), value: p.slug })),
              { label: 'Not sure yet', value: 'not-sure' },
            ]}
          />
          <p className="field-label" style={{ marginTop: 26 }}>What kind of project?</p>
          <ChoiceGroup
            name="Project type" value={data.projectType} onChange={(v) => set('projectType', v)}
            options={['Residential', 'Commercial', 'Industrial', 'Retail', 'Warehouse', 'Other']
              .map((x) => ({ label: x, value: x }))}
          />
        </>
      )}

      {step === 1 && (
        <>
          <div className="field-row">
            <label className="field">
              <span>Width</span>
              <input inputMode="decimal" value={data.width} maxLength={12} placeholder="3000"
                onChange={(e) => set('width', e.target.value)} />
            </label>
            <label className="field">
              <span>Height</span>
              <input inputMode="decimal" value={data.height} maxLength={12} placeholder="2400"
                onChange={(e) => set('height', e.target.value)} />
            </label>
          </div>
          <UnitSelect value={data.unit} onChange={(v) => set('unit', v)} />
          <label className="field">
            <span>City or area *</span>
            <input value={data.location} maxLength={160} required autoComplete="address-level2"
              placeholder="Madhapur, Hyderabad"
              onChange={(e) => set('location', e.target.value)} />
            <small>Where the opening is, not where you live.</small>
          </label>
          <div className="note">
            These are for scale, not for manufacture. The measurements that go on
            the drawing are taken on site.
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <dl className="review">
            <div><dt>Product</dt><dd>{productName}</dd></div>
            <div><dt>Project</dt><dd>{data.projectType}</dd></div>
            <div><dt>Opening</dt><dd>{data.width || '—'} × {data.height || '—'} {data.unit}</dd></div>
            <div><dt>Location</dt><dd>{data.location || '—'}</dd></div>
          </dl>

          <label className="field">
            <span>Your name *</span>
            <input value={data.name} required maxLength={100} autoComplete="name"
              onChange={(e) => set('name', e.target.value)} />
          </label>
          <div className="field-row">
            <label className="field">
              <span>Phone *</span>
              <input type="tel" value={data.phone} required maxLength={25} autoComplete="tel"
                placeholder="+91" onChange={(e) => set('phone', e.target.value)} />
            </label>
            <label className="field">
              <span>WhatsApp (optional)</span>
              <input type="tel" value={data.whatsapp} maxLength={25}
                onChange={(e) => set('whatsapp', e.target.value)} />
            </label>
          </div>
          <label className="field">
            <span>Email (optional)</span>
            <input type="email" value={data.email} maxLength={254} autoComplete="email"
              onChange={(e) => set('email', e.target.value)} />
          </label>

          <label className="honeypot" aria-hidden="true">
            Website
            <input tabIndex={-1} autoComplete="off" value={data.website}
              onChange={(e) => set('website', e.target.value)} />
          </label>

          <div className="consent">
            <input
              type="checkbox" id="consent" checked={data.consent}
              onChange={(e) => set('consent', e.target.checked)}
            />
            <label htmlFor="consent">
              I agree to these details and any attachments being used to handle this
              enquiry, as set out in the <Link href="/privacy">privacy notice</Link>.
            </label>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <label className="field">
            <span>Anything we should know</span>
            <textarea value={data.requirements} rows={5} maxLength={3000}
              placeholder="How it will be used, how often, finish preferences, timing…"
              onChange={(e) => set('requirements', e.target.value)} />
            <small>{data.requirements.length} / 3000</small>
          </label>

          <div className="drop">
            <Upload size={22} aria-hidden="true" />
            <label className="field" style={{ margin: 0, width: '100%' }}>
              <span>Photograph or drawing</span>
              <input ref={fileInput} type="file" multiple
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={(e) => addFiles(e.target.files)} />
              <small>Up to 3 files · JPG, PNG, WebP or PDF · 4 MB each</small>
            </label>
          </div>

          {files.length > 0 && (
            <ul className="file-list">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`}>
                  <span>{f.name} · {(f.size / 1024).toFixed(0)} KB</span>
                  <button type="button" aria-label={`Remove ${f.name}`}
                    onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>Remove</button>
                </li>
              ))}
            </ul>
          )}

          <p className="meta" style={{ marginTop: 18 }}>
            Photograph the opening from ground level, from somewhere safe. Never
            climb, and never reach into a mechanism to get the shot.
          </p>
        </>
      )}

      {error && <div className="form-err" role="alert">{error}</div>}

      <div className="form-actions">
        {step > 0 ? (
          <button type="button" className="link" onClick={() => go(step - 1)} disabled={busy}>
            <ArrowLeft size={14} /> Back
          </button>
        ) : (
          <span className="meta">No obligation</span>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {step === SUBMITTABLE && (
            <button type="button" className="link" onClick={() => go(LAST)} disabled={busy}>
              Add a photo first
            </button>
          )}
          <button type="submit" className="btn" disabled={busy}>
            {busy ? 'Sending…' : step < SUBMITTABLE ? 'Continue' : 'Send enquiry'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </form>
  );
}
