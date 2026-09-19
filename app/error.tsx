'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="page-shell"><div className="page-intro"><h1>This page could not load.</h1><p className="intro-copy">Please try again. Your enquiry will only be submitted when you choose to send it.</p><button className="button" onClick={reset} style={{marginTop:25}}>Try again</button></div></div>}
