// Nav.jsx — Fixed top nav with scroll glass + mobile overlay menu
const { useState, useEffect } = React;

function EvanNav({ activeTab, setActiveTab, setLinkState }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (tab, state = 'home') => {
    setActiveTab(tab);
    setLinkState(state);
    window.scrollTo({ top: 0 });
    setMenuOpen(false);
  };

  const base = { fontFamily: 'var(--body-font)', border: 'none', cursor: 'pointer', background: 'none', padding: 0 };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 64, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(130%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(130%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--surface-border)' : '1px solid transparent',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}>

        {/* Logo */}
        <button onClick={() => goTo('links')} style={{
          ...base, display: 'flex', alignItems: 'center', gap: '0.55rem',
          fontFamily: 'var(--display-font)', fontSize: '1.05rem', fontWeight: 600,
          letterSpacing: '0.01em', color: 'var(--fg)', flexShrink: 0,
          whiteSpace: 'nowrap', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <span className="nav-live-dot" />
          Evan Friesen
        </button>

        {/* Center tabs — desktop only */}
        <div className="nav-tabs-desktop" style={{
          display: 'flex', gap: '0.2rem',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}>
          {[['links', 'Links'], ['portfolio', 'Portfolio']].map(([id, label]) => (
            <button key={id} onClick={() => goTo(id)} style={{
              ...base,
              fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: activeTab === id ? 'var(--fg)' : 'var(--muted)',
              background: activeTab === id ? 'var(--surface)' : 'transparent',
              border: `1px solid ${activeTab === id ? 'var(--surface-border)' : 'transparent'}`,
              borderRadius: 100, padding: '0.45rem 1.2rem',
              transition: 'all 0.22s ease',
            }}>{label}</button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <button onClick={() => goTo('links', 'brand')} className="nav-cta-btn" style={{
            ...base,
            fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--accent)', border: '1px solid var(--accent)',
            borderRadius: 100, padding: '0.45rem 1.1rem',
            transition: 'opacity 0.2s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Work With Me</button>

          {/* Hamburger — mobile only */}
          <button className="nav-ham" onClick={() => setMenuOpen(o => !o)} style={{
            ...base, display: 'none', color: 'var(--fg)',
            fontSize: '1.3rem', padding: '0.3rem', lineHeight: 1,
          }}>{menuOpen ? '✕' : '≡'}</button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 199, background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.35s ease',
      }}>
        {[['links', 'Links'], ['portfolio', 'Portfolio']].map(([id, label]) => (
          <button key={id} onClick={() => goTo(id)} style={{
            ...base,
            fontFamily: 'var(--display-font)',
            fontSize: 'clamp(3rem, 10vw, 4.5rem)',
            fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1,
            color: activeTab === id ? 'var(--accent)' : 'var(--fg)',
            transition: 'color 0.2s',
          }}>{label}</button>
        ))}
        <button onClick={() => goTo('links', 'brand')} style={{
          ...base,
          fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--accent)', border: '1px solid var(--accent)',
          borderRadius: 100, padding: '0.75rem 2rem', marginTop: '1rem',
        }}>Work With Me</button>
      </div>
    </>
  );
}

Object.assign(window, { EvanNav });
