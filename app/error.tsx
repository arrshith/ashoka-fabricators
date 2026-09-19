'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="shell">
      <div className="page-head">
        <p className="meta meta--annot">Something went wrong</p>
        <h1 className="display d-md">This page<br />did not load.</h1>
        <p className="lede" style={{ marginTop: 26 }}>
          Try again. Nothing is submitted until you choose to send it, so an
          enquiry in progress has not gone anywhere.
        </p>
        <button className="btn" onClick={reset} style={{ marginTop: 30 }}>Try again</button>
      </div>
    </div>
  );
}
