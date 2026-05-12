"use client";

import { useState, useRef, useEffect } from "react";

function useCountdown(target: Date) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const launch = new Date("2026-07-26T00:00:00");
  const { days, hours, minutes, seconds } = useCountdown(launch);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.25;
    }
  }, []);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.25rem 2rem; display: flex; justify-content: center; align-items: center;
        }
        .nav__top {
          font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-cream);
        }
        .nav__divider {
          width: 32px; height: 1px; background: rgba(249,247,242,0.35); margin: 3px auto;
        }
        .nav__bottom {
          font-family: var(--font-serif); font-size: 1.25rem; font-style: italic;
          font-weight: 300; letter-spacing: 0.05em; color: var(--color-cream);
        }

        .hero {
          position: relative; height: 100svh; min-height: 600px;
          display: grid; place-items: center; overflow: hidden;
        }
        .hero__video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
          filter: contrast(1.08) saturate(0.75) brightness(0.85);
        }
        .hero__overlay {
          position: absolute; inset: 0; z-index: 1;
          background: radial-gradient(ellipse at center, transparent 30%, rgba(27,48,34,0.4) 100%),
                      linear-gradient(to bottom, transparent 40%, rgba(27,48,34,0.25) 100%);
        }
        .hero__grain {
          position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.07;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        .hero__countdown-wrap {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          width: 100%;
        }
        .hero__countdown-label {
          font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(249,247,242,0.5);
        }
        .hero__countdown {
          display: flex; gap: 1.5rem;
        }
        .hero__countdown-value {
          font-family: var(--font-serif); font-size: 2rem; font-weight: 300;
          color: var(--color-cream); line-height: 1; font-variant-numeric: tabular-nums;
        }
        .hero__countdown-unit {
          font-family: var(--font-sans); font-size: 0.5625rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(249,247,242,0.45); margin-top: 0.25rem;
        }

        .intro {
          text-align: center; max-width: 640px; margin: 0 auto; padding: 4rem 1.5rem 2.5rem;
        }
        .intro__eyebrow {
          font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--color-charcoal-mid); margin-bottom: 1.25rem;
        }
        .intro__title {
          font-family: var(--font-serif); font-size: clamp(2.25rem, 6vw, 4.5rem);
          font-weight: 300; font-style: italic; letter-spacing: -0.02em;
          line-height: 1.1; color: var(--color-charcoal); margin-bottom: 1.25rem;
        }
        .intro__body {
          font-family: var(--font-sans); font-size: 0.9375rem; font-weight: 300;
          line-height: 1.7; color: var(--color-charcoal-mid); max-width: 440px; margin: 0 auto;
        }

        .products {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
          max-width: 900px; margin: 0 auto; padding: 0.5rem 1.5rem 1.5rem;
        }
        .products__label {
          font-family: var(--font-serif); font-size: 1rem; font-weight: 300;
          font-style: italic; color: var(--color-charcoal); margin-top: 0.75rem;
        }
        .products img { width: 100%; height: auto; display: block; }

        .cta-section { text-align: center; padding: 1.5rem 1.5rem 3.5rem; }
        .cta-price {
          font-family: var(--font-sans); font-size: 1.125rem; font-weight: 400;
          color: var(--color-brass); letter-spacing: 0.02em; margin-bottom: 1.25rem;
        }
        .cta-btn {
          display: inline-block; font-family: var(--font-sans); font-size: 0.6875rem;
          font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; padding: 0.75rem 2.5rem;
          border: 1px solid var(--color-forest); color: var(--color-forest);
          background: transparent; cursor: pointer; transition: all 0.25s ease;
        }
        .cta-btn:hover { background: var(--color-forest); color: var(--color-cream); }
        .cta-btn--solid {
          background: var(--color-forest); color: var(--color-cream);
          border: 1px solid var(--color-forest);
        }
        .cta-btn--solid:hover { background: var(--color-forest-mid); }

        .divider { width: 100%; height: 1px; background: var(--color-cream-border); }

        .split-image { max-width: 900px; margin: 0 auto; padding: 4rem 1.5rem; }
        .split-image img { width: 100%; height: auto; display: block; }

        .brand-text {
          max-width: 540px; margin: 0 auto; padding: 0 1.5rem 4rem; text-align: center;
        }
        .brand-text__eyebrow {
          font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--color-charcoal-mid); margin-bottom: 1.25rem;
        }
        .brand-text__title {
          font-family: var(--font-serif); font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 300; font-style: italic; letter-spacing: -0.02em;
          line-height: 1.15; color: var(--color-charcoal); margin-bottom: 1.25rem;
        }
        .brand-text__body {
          font-family: var(--font-sans); font-size: 0.9375rem; font-weight: 300;
          line-height: 1.7; color: var(--color-charcoal-mid);
        }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .grid-2 + .grid-2 { margin-top: 2px; }
        .grid-2__cell { overflow: hidden; aspect-ratio: 3/4; }
        .grid-2__cell--wide { aspect-ratio: 4/5; }
        .grid-2__cell img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .full-img { margin-top: 2px; }
        .full-img img { width: 100%; height: auto; display: block; }

        .closing-video { max-width: 640px; margin: 0 auto; padding: 4rem 1.5rem; }
        .closing-video video { width: 100%; height: auto; display: block;
          filter: contrast(1.06) saturate(0.78) brightness(0.9); }

        .final-cta {
          text-align: center; padding: 4rem 1.5rem; max-width: 480px; margin: 0 auto;
        }
        .final-cta__title {
          font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300; font-style: italic; letter-spacing: -0.02em;
          line-height: 1.1; color: var(--color-charcoal); margin-bottom: 1rem;
        }
        .final-cta__body {
          font-family: var(--font-sans); font-size: 0.875rem; font-weight: 300;
          line-height: 1.7; color: var(--color-charcoal-mid); margin-bottom: 2rem;
        }

        .newsletter {
          background: var(--color-forest); padding: 4rem 1.5rem; text-align: center;
        }
        .newsletter__eyebrow {
          font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(249,247,242,0.5); margin-bottom: 1rem;
        }
        .newsletter__title {
          font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 300; font-style: italic; letter-spacing: -0.02em;
          color: var(--color-cream); margin-bottom: 2rem;
        }
        .newsletter__form { display: flex; max-width: 440px; margin: 0 auto; }
        .newsletter__input {
          flex: 1; padding: 0.875rem 1rem; background: transparent;
          border: 1px solid rgba(249,247,242,0.35); border-right: none;
          color: var(--color-cream); font-family: var(--font-sans);
          font-size: 0.875rem; outline: none; border-radius: 0;
          min-width: 0;
        }
        .newsletter__input::placeholder { color: rgba(249,247,242,0.35); }
        .newsletter__btn {
          padding: 0.875rem 1.25rem; background: var(--color-cream);
          border: 1px solid var(--color-cream); color: var(--color-forest);
          font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; border-radius: 0; white-space: nowrap;
        }
        .newsletter__note {
          font-family: var(--font-sans); font-size: 0.6875rem;
          color: rgba(249,247,242,0.3); margin-top: 1rem; font-weight: 300;
        }
        .newsletter__success {
          font-family: var(--font-serif); font-size: 1.25rem; font-style: italic;
          font-weight: 300; color: var(--color-cream);
        }

        .footer {
          background: var(--color-charcoal); padding: 2.5rem 1.5rem; text-align: center;
        }
        .footer__name {
          font-family: var(--font-serif); font-size: 1.25rem; font-style: italic;
          font-weight: 300; color: var(--color-cream); margin-bottom: 0.5rem;
        }
        .footer__copy {
          font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 300;
          letter-spacing: 0.05em; color: rgba(249,247,242,0.3);
        }

        @media (max-width: 640px) {
          .nav { padding: 1rem 1rem; }
          .hero { min-height: auto; height: auto; }
          .hero__video { position: relative; height: auto; aspect-ratio: auto; }
          .hero__countdown { gap: 0.75rem; }
          .hero__countdown-value { font-size: 1.5rem; }
          .hero__overlay, .hero__grain { position: absolute; }
          .hero__countdown-wrap { bottom: 1rem; }
          .intro { padding: 3rem 1.25rem 2rem; }
          .intro__body { font-size: 0.875rem; }
          .products { gap: 0.5rem; padding: 0.5rem 1rem 1.5rem; }
          .products__label { font-size: 0.875rem; margin-top: 0.5rem; }
          .cta-section { padding: 1rem 1.25rem 3rem; }
          .split-image { padding: 3rem 1rem; }
          .brand-text { padding: 0 1.25rem 3rem; }
          .brand-text__body { font-size: 0.875rem; }
          .grid-2__cell { aspect-ratio: 1/1; }
          .grid-2__cell--wide { aspect-ratio: 1/1; }
          .closing-video { padding: 3rem 1rem; }
          .final-cta { padding: 3rem 1.25rem; }
          .newsletter { padding: 3rem 1.25rem; }
          .newsletter__form { flex-direction: column; gap: 0; }
          .newsletter__input { border-right: 1px solid rgba(249,247,242,0.35); border-bottom: none; }
          .newsletter__btn { padding: 0.875rem; }
        }
      `}</style>

      <nav className="nav">
        <div style={{ textAlign: "center" }}>
          <div className="nav__top">Mise en Place</div>
          <div className="nav__divider" />
          <div className="nav__bottom">Golf</div>
        </div>
      </nav>

      <section className="hero">
        <video ref={videoRef} autoPlay muted loop playsInline className="hero__video">
          <source src="/videos/chef-hero.mov" type="video/quicktime" />
          <source src="/videos/chef-hero.mov" type="video/mp4" />
        </video>
        <div className="hero__overlay" />
        <div className="hero__grain" />
        <div className="hero__countdown-wrap">
          <p className="hero__countdown-label">Preorder closes</p>
          <div className="hero__countdown">
            {[
              { value: days, label: "Days" },
              { value: hours, label: "Hrs" },
              { value: minutes, label: "Min" },
              { value: seconds, label: "Sec" },
            ].map((unit) => (
              <div key={unit.label} style={{ textAlign: "center" }}>
                <div className="hero__countdown-value">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="hero__countdown-unit">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="intro">
        <p className="intro__eyebrow">Preorder Now &mdash; Ships Summer 2025</p>
        <h1 className="intro__title">The Chef Polo.</h1>
        <p className="intro__body">
          A chef-coat closure on a golf polo. The discipline of the kitchen meets
          the quiet confidence of the course. Pima cotton piqué, made in Portugal.
        </p>
      </section>

      <section id="preorder" className="products">
        <div style={{ textAlign: "center" }}>
          <img src="/images/polo-grey-flat.png" alt="The Chef Polo in grey" />
          <p className="products__label">Grey</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src="/images/polo-navy-flat.png" alt="The Chef Polo in navy" />
          <p className="products__label">Navy</p>
        </div>
      </section>

      <section className="cta-section">
        <p className="cta-price">$98</p>
        <a href="mailto:hello@miseenplacegolf.com?subject=Preorder%20—%20The%20Chef%20Polo" className="cta-btn">
          Preorder Now
        </a>
      </section>

      <div className="divider" />

      <section className="split-image">
        <img src="/images/chef-golfer-split.png" alt="A chef plating in the kitchen. Two golfers reading a putt. More alike than you think." />
      </section>

      <section className="brand-text">
        <p className="brand-text__eyebrow">The Concept</p>
        <h2 className="brand-text__title">More alike than you think.</h2>
        <p className="brand-text__body">
          The chef and the golfer share the same ritual: preparation, precision,
          quiet confidence. We took the double-breasted closure of a French
          chef&rsquo;s coat and put it on a golf polo. No logos. No noise. Just craft.
        </p>
      </section>

      <div className="grid-2">
        <div className="grid-2__cell">
          <img src="/images/polo-grey-clothesline.png" alt="Grey chef polo on a clothesline at golden hour" />
        </div>
        <div className="grid-2__cell">
          <img src="/images/polo-navy-model.png" alt="Model wearing the navy chef polo" />
        </div>
      </div>

      <div className="grid-2">
        <div className="grid-2__cell">
          <img src="/images/golf-cheers.png" alt="Golfer celebrating with a beer" />
        </div>
        <div className="grid-2__cell">
          <img src="/images/golf-chappelle.png" alt="Golfer with a cigar on the fairway" />
        </div>
      </div>

      <div className="full-img">
        <img src="/images/golf-action-bw.png" alt="Black and white golf action shots" />
      </div>

      <div className="grid-2">
        <div className="grid-2__cell grid-2__cell--wide">
          <img src="/images/polo-grey-marbled.png" alt="Grey polo on marbled green background" />
        </div>
        <div className="grid-2__cell grid-2__cell--wide">
          <img src="/images/polo-navy-type.png" alt="Navy polo over MISE EN PLACE typography" />
        </div>
      </div>

      <section className="closing-video">
        <video autoPlay muted loop playsInline>
          <source src="/videos/golf-footer.mov" type="video/quicktime" />
          <source src="/videos/golf-footer.mov" type="video/mp4" />
        </video>
      </section>

      <div className="divider" />

      <section className="final-cta">
        <h2 className="final-cta__title">Everything in its place.</h2>
        <p className="final-cta__body">Two polos. One idea. The Chef Polo preorder is open now.</p>
        <a href="mailto:hello@miseenplacegolf.com?subject=Preorder%20—%20The%20Chef%20Polo" className="cta-btn cta-btn--solid">
          Preorder &mdash; $98
        </a>
      </section>

      <section className="newsletter">
        <p className="newsletter__eyebrow">Stay in the loop</p>
        <h2 className="newsletter__title">The Caddie Bag</h2>
        {submitted ? (
          <p className="newsletter__success">Welcome to the club.</p>
        ) : (
          <form className="newsletter__form" onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}>
            <input type="email" className="newsletter__input" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email address" />
            <button type="submit" className="newsletter__btn">Join</button>
          </form>
        )}
        <p className="newsletter__note">Field notes, drops &amp; early access. No spam.</p>
      </section>

      <footer className="footer">
        <div className="footer__name">Mise en Place Golf</div>
        <p className="footer__copy">&copy; {new Date().getFullYear()} Mise en Place Golf</p>
      </footer>
    </>
  );
}
