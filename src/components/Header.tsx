import { useEffect, useState } from "react";

// Updated NAV_LINKS inline — update your data.ts to match:
// export const NAV_LINKS = ["Home", "Features", "Capabilities", "How it Works", "Plants", "FAQ", "Download"];
const NAV_LINKS = ["Home", "About", "Docs", "Contact", "Community", "App"];

type Theme = "light" | "dark";

interface HeaderProps {
  isLoaded?: boolean;
  isPlaying?: boolean;
  toggleAudio?: () => void;
}

export default function Header({ isLoaded = true, isPlaying = false, toggleAudio }: HeaderProps) {
  const [activeLink, setActiveLink] = useState(0);
  const [visible, setVisible] = useState(true);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    function resetTimer() {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), 3000);
    }

    function onScroll() {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        setVisible(true);
        resetTimer();
      } else if (currentY > lastScrollY) {
        setVisible(false);
        if (hideTimer) clearTimeout(hideTimer);
      }
      lastScrollY = currentY;
    }

    function onMouseMove() {
      setVisible(true);
      resetTimer();
    }

    resetTimer();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-header-theme]");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = (entry.target as HTMLElement).dataset.headerTheme as Theme;
            if (t === "light" || t === "dark") setTheme(t);
          }
        });
      },
      { rootMargin: "0px 0px -90% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isLight = theme === "light";

  const logoColor    = isLight ? "rgba(10,30,15,0.85)"  : "rgba(255,255,255,0.90)";
  const navBg        = isLight ? "rgba(0,0,0,0.06)"     : "rgba(255,255,255,0.06)";
  const navBorder    = isLight ? "rgba(0,0,0,0.10)"     : "rgba(255,255,255,0.08)";
  const linkActive   = isLight ? "rgba(10,30,15,0.95)"  : "rgba(255,255,255,0.95)";
  const linkInactive = isLight ? "rgba(10,30,15,0.40)"  : "rgba(255,255,255,0.45)";
  const linkActiveBg = isLight ? "rgba(0,0,0,0.08)"     : "rgba(255,255,255,0.10)";
  const ctaBg        = isLight ? "rgba(10,30,15,0.90)"  : "rgba(255,255,255,0.90)";
  const ctaColor     = isLight ? "#fff"                 : "rgba(3,18,9,0.95)";
  const ctaBgHover   = isLight ? "rgba(10,30,15,1)"     : "rgba(255,255,255,1)";

  function handleNavEnter(e: React.MouseEvent<HTMLAnchorElement>, i: number) {
    if (activeLink !== i) {
      e.currentTarget.style.color = isLight ? "rgba(10,30,15,0.75)" : "rgba(255,255,255,0.75)";
    }
  }

  function handleNavLeave(e: React.MouseEvent<HTMLAnchorElement>, i: number) {
    if (activeLink !== i) {
      e.currentTarget.style.color = linkInactive;
    }
  }

  function handleCtaEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.background = ctaBgHover;
  }

  function handleCtaLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.background = ctaBg;
  }

  const showHeader = visible && isLoaded;

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: "64px",
    background: "transparent",
    transform: showHeader ? "translateY(0)" : "translateY(-100%)",
    opacity: showHeader ? 1 : 0,
    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease",
  };

  const logoLinkStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 600,
    letterSpacing: "0.22em", textTransform: "uppercase", color: logoColor,
    textDecoration: "none", display: "flex", alignItems: "center", gap: "7px",
    transition: "color 0.4s ease",
  };

  const navStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "2px", background: navBg,
    border: `1px solid ${navBorder}`, borderRadius: "999px", padding: "6px 8px",
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    transition: "background 0.4s ease, border-color 0.4s ease",
  };

  const ctaStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif", fontSize: "0.76rem", fontWeight: 500,
    letterSpacing: "0.04em", color: ctaColor, background: ctaBg,
    textDecoration: "none", padding: "9px 20px", borderRadius: "999px",
    transition: "background 0.2s ease, color 0.4s ease", display: "inline-block",
    whiteSpace: "nowrap",
  };

  function getNavLinkStyle(i: number): React.CSSProperties {
    return {
      fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: activeLink === i ? 500 : 400,
      letterSpacing: "0.01em", color: activeLink === i ? linkActive : linkInactive,
      textDecoration: "none", padding: "7px 18px", borderRadius: "999px",
      background: activeLink === i ? linkActiveBg : "transparent",
      transition: "color 0.2s ease, background 0.2s ease", display: "inline-block",
      whiteSpace: "nowrap",
    };
  }

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", minWidth: "120px" }}>
        <a href="#" style={logoLinkStyle}>
          Hanap
        </a>
      </div>

      <nav style={navStyle}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link} href="#" onClick={() => setActiveLink(i)}
            onMouseEnter={(e) => handleNavEnter(e, i)} onMouseLeave={(e) => handleNavLeave(e, i)}
            style={getNavLinkStyle(i)}
          >
            {link}
          </a>
        ))}
      </nav>

      <div style={{ minWidth: "120px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "20px" }}>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (toggleAudio) toggleAudio();
          }}
          className={`sound-toggle-btn ${isPlaying ? 'playing' : 'muted'}`}
          style={{ 
            background: "transparent", border: "none", cursor: "pointer", 
            display: "flex", alignItems: "center", justifyContent: "center", gap: "3px",
            color: logoColor, 
            height: "24px", padding: "0 4px", opacity: 0.8,
            transition: "opacity 0.2s ease, color 0.4s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}
          aria-label="Toggle Background Music"
        >
          <div className="sound-bar"></div>
          <div className="sound-bar"></div>
          <div className="sound-bar"></div>
          <div className="sound-bar"></div>
          <div className="sound-bar"></div>
        </button>

        <a href="#" onMouseEnter={handleCtaEnter} onMouseLeave={handleCtaLeave} style={ctaStyle}>
          Download
        </a>
      </div>
    </header>
  );
}