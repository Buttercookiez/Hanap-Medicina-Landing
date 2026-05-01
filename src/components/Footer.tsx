import { useEffect } from 'react';

export default function Footer() {

  useEffect(() => {
    const reveals = document.querySelectorAll('.ft-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = 'running';
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="ft-section">
      <div className="ft-container">
        
        {/* ── TOP: MASSIVE TYPOGRAPHY ── */}
        <div className="ft-top">
          <span className="ft-eyebrow">LET'S CONNECT</span>
          <h1 className="ft-headline">
            <span className="ft-reveal">DISCOVER YOUR</span><br />
            <span className="ft-reveal ft-reveal--delay ft-italic">remedies</span>
          </h1>
        </div>

        {/* ── DIVIDER ── */}
        <hr className="ft-divider" />

        {/* ── BOTTOM: 4-COLUMN GRID ── */}
        <div className="ft-bottom">
          
          {/* Column 1: Headquarters */}
          <div className="ft-col">
            <h4 className="ft-col-title">HEADQUARTERS</h4>
            <div className="ft-text">
              Alamninos City, Laguna<br />
              Alaminos 4001<br />
              Philippines
            </div>
            <a href="mailto:hello@hanapmedicina.ph" className="ft-link-underline">
              hello@hanapmedicina.ph
            </a>
          </div>

          {/* Column 2: Socials */}
          <div className="ft-col">
            <h4 className="ft-col-title">SOCIALS</h4>
            <ul className="ft-list">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter/X</a></li>
              <li><a href="#">Behance</a></li>
            </ul>
          </div>

          {/* Column 3: Sitemap */}
          <div className="ft-col">
            <h4 className="ft-col-title">SITEMAP</h4>
            <ul className="ft-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">App Features</a></li>
              <li><a href="#">Plant Library</a></li>
              <li><a href="#">Download</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="ft-col ft-col-newsletter">
            <h4 className="ft-col-title">NEWSLETTER</h4>
            <p className="ft-text" style={{ marginBottom: "20px" }}>
              Join our community for updates on natural healing and sustainable practices.
            </p>
            <form className="ft-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="ft-input" 
                required 
              />
              <button type="submit" className="ft-submit">→</button>
            </form>
          </div>

        </div>
      </div>

      <style>{`
        /* ── ANIMATION ── */
        .ft-headline {
          overflow: hidden;
        }

        .ft-reveal {
          display: inline-block;
          opacity: 0;
          transform: translateY(60px) skewY(3deg);
          animation: ft-revealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-play-state: paused;
        }

        .ft-reveal--delay {
          animation-delay: 0.18s;
        }

        @keyframes ft-revealUp {
          to {
            opacity: 1;
            transform: translateY(0) skewY(0deg);
          }
        }

        /* ── SECTION ── */
        .ft-section {
          background: #010f07;
          color: #ffffff; 
          padding: 120px 5% 60px;
          position: relative;
          z-index: 10;
        }

        .ft-container {
          max-width: 1600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* ── TOP SECTION ── */
        .ft-top {
          margin-bottom: 60px;
        }

        .ft-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #86efac;
          display: block;
          margin-bottom: 24px;
        }

        .ft-headline {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: clamp(4rem, 11vw, 12rem);
          line-height: 0.85;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
        }

        .ft-italic {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          color: #86efac;
          font-size: 1.05em; 
          text-transform: lowercase;
          letter-spacing: -0.02em;
        }

        /* ── DIVIDER ── */
        .ft-divider {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 0;
        }

        /* ── BOTTOM GRID ── */
        .ft-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.5fr;
          gap: 40px;
          padding-top: 60px;
        }

        .ft-col-title {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.35);
          margin: 0 0 24px 0;
        }

        .ft-text {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .ft-link-underline {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          color: #ffffff;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(255, 255, 255, 0.3);
          transition: text-decoration-color 0.3s, color 0.3s;
        }

        .ft-link-underline:hover {
          color: #86efac;
          text-decoration-color: #86efac;
        }

        .ft-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ft-list a {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: color 0.3s;
        }

        .ft-list a:hover {
          color: #86efac;
        }

        /* ── NEWSLETTER FORM ── */
        .ft-form {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 8px;
          transition: border-color 0.3s;
        }

        .ft-form:focus-within {
          border-color: #ffffff;
        }

        .ft-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
        }

        .ft-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .ft-submit {
          background: transparent;
          border: none;
          color: #86efac;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0 0 0 16px;
          transition: transform 0.3s;
        }

        .ft-submit:hover {
          transform: translateX(4px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ft-bottom {
            grid-template-columns: 1fr 1fr;
            row-gap: 60px;
          }
          .ft-headline { font-size: 10vw; }
        }

        @media (max-width: 640px) {
          .ft-section { padding: 80px 5% 40px; }
          .ft-bottom { grid-template-columns: 1fr; row-gap: 48px; }
          .ft-headline { font-size: 14vw; }
        }
      `}</style>
    </footer>
  );
}