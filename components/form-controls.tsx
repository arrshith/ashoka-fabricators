/**
 * Native form controls.
 *
 * These were Radix Select / RadioGroup / Checkbox, which cost around 60KB of
 * JavaScript on the quote route to reimplement behaviour the platform already
 * has. A four-option unit picker in particular is better native: on a phone it
 * opens the system picker instead of a scrolling div. Keyboard support, form
 * association and screen-reader semantics all come for free, and this file is
 * now a server component.
 */

export function ChoiceGroup({
  name, value, options, onChange,
}: {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const group = name.toLowerCase().replace(/\s+/g, '-');
  return (
    <fieldset className="choices">
      <legend className="sr-only">{name}</legend>
      {options.map((o) => (
        <label className="choice" key={o.value}>
          <input
            type="radio" name={group} value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
          <span>{o.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

const units: [string, string][] = [
  ['mm', 'Millimetres (mm)'],
  ['cm', 'Centimetres (cm)'],
  ['m', 'Metres (m)'],
  ['ft', 'Feet (ft)'],
];

export function UnitSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="field">
      <span>Measured in</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {units.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
      </select>
    </label>
  );
}
