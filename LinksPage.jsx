// LinksPage.jsx — clean rebuild, no decoration components
const { useState, useEffect } = React;

const VIEWER_LINKS = [
  { label: 'Instagram',  desc: '@evancreates · Day-to-day content',   href: 'https://instagram.com' },
  { label: 'TikTok',     desc: '@evancreates · Short form videos',     href: 'https://tiktok.com' },
  { label: 'YouTube',    desc: '@evancreates · Long form & vlogs',     href: 'https://youtube.com' },
  { label: 'Newsletter', desc: 'Subscribe for exclusives',             href: '#' },
];

const BRAND_LINKS = [
  { label: 'Media Kit',            desc: 'Stats, rates & past brand work', href: '#' },
  { label: 'Book a Collaboration', desc: 'Schedule a discovery call',      href: '#' },
  { label: 'Email Me Directly',    desc: 'hello@evanfriesen.com',          href: 'mailto:hello@evanfriesen.com' },
];

function HeroHome({ setLinkState }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    var t = setTimeout(function() { setReady(true); }, 40);
    return function() { clearTimeout(t); };
  }, []);

  var pill = {
    fontFamily: 'var(--body-font)', fontSize: '0.7rem', fontWeight: 500,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    borderRadius: 100, padding: '0.82rem 1.8rem',
    cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
    transition: 'opacity 0.2s, background 0.2s, border-color 0.2s',
  };

  return (
    <div className="hero-grid" style={{
      display: 'grid', gridTemplateColumns: '45% 55%',
      minHeight: 'calc(100dvh - 64px)',
    }}>
      {/* mobile photo */}
      <div className="hero-mobile-photo" style={{
        display: 'none', gridColumn: '1 / -1',
        width: '100%', height: '44vh', position: 'relative', overflow: 'hidden',
      }}>
        <img src="uploads/Image.jpeg" alt="Evan Friesen" style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 8%',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, transparent 55%, var(--bg) 100%)',
        }} />
      </div>

      {/* desktop photo column */}
      <div className="hero-photo-col" style={{ position: 'relative' }}>
        <img src="uploads/Image.jpeg" alt="Evan Friesen" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: '50% 8%',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, transparent 42%, var(--bg) 96%)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 18%)',
        }} />
      </div>

      {/* text column */}
      <div className="hero-text-col" style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '5rem 4rem 5rem 5rem',
        position: 'relative', overflow: 'hidden',
        opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(22px)',
        transition: 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Camera UI decorations */}
        <div className="vf-wrap">
          <div className="vf-corner vf-tl"></div>
          <div className="vf-corner vf-tr"></div>
          <div className="vf-corner vf-bl"></div>
          <div className="vf-corner vf-br"></div>
          <div className="rec-badge" style={{ opacity: 0.4 }}>
            <div className="rec-dot"></div>
            <span className="rec-label" style={{ fontFamily: 'var(--body-font)' }}>Rec</span>
          </div>
        </div>
        <p style={{
          fontFamily: 'var(--body-font)', fontSize: '0.6rem',
          letterSpacing: '0.26em', textTransform: 'uppercase',
          color: 'var(--muted)', marginBottom: '1.75rem',
        }}>UGC Specialist · Content Creator</p>

        <h1 style={{
          fontFamily: 'var(--display-font)',
          fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: '-0.025em', marginBottom: '2.5rem',
        }}>
          <span style={{ display: 'block' }}>Evan</span>
          <span style={{ display: 'block', color: 'var(--accent)', fontStyle: 'var(--hero-name-style, normal)' }}>Friesen</span>
        </h1>

        <p style={{
          fontFamily: 'var(--body-font)', fontSize: '0.87rem',
          lineHeight: 1.8, color: 'var(--muted)',
          maxWidth: '310px', marginBottom: '2rem',
        }}>
          Scroll-stopping vertical content that converts — brand partnerships across every niche.
        </p>

        {/* Stats bar */}
        <div style={{ display: 'flex', marginBottom: '2.5rem', gap: 0 }}>
          {[['500K+', 'Monthly Views'], ['50+', 'Brand Deals'], ['3 Yrs', 'Creating']].map(function(item, i) {
            return (
              <div key={i} style={{
                flex: 1,
                paddingLeft: i === 0 ? 0 : '1.25rem',
                paddingRight: i === 2 ? 0 : '1.25rem',
                borderRight: i < 2 ? '1px solid var(--surface-border)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--display-font)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 400, lineHeight: 1, color: 'var(--fg)',
                  marginBottom: '0.2rem',
                }}>{item[0]}</div>
                <div style={{
                  fontFamily: 'var(--body-font)', fontSize: '0.5rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)',
                }}>{item[1]}</div>
              </div>
            );
          })}
        </div>

        <div className="hero-cta-group" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={function() { setLinkState('viewer'); }}
            style={Object.assign({}, pill, { color: 'var(--fg)', background: 'transparent', border: '1px solid var(--surface-border)' })}
            onMouseEnter={function(e) { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--muted)'; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--surface-border)'; }}
          >I'm a Viewer</button>

          <button
            onClick={function() { setLinkState('brand'); }}
            style={Object.assign({}, pill, { color: 'var(--bg)', background: 'var(--accent)', border: '1px solid var(--accent)' })}
            onMouseEnter={function(e) { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={function(e) { e.currentTarget.style.opacity = '1'; }}
          >I'm a Brand &rarr;</button>
        </div>

        {/* Camera metadata strip */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '44px',
          display: 'flex', alignItems: 'center', gap: '1.2rem',
          pointerEvents: 'none',
        }}>
          {['4K', '60FPS', 'VERTICAL'].map(function(tag, i) {
            return (
              <span key={i} style={{
                fontFamily: 'var(--body-font)', fontSize: '0.46rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--muted)', opacity: 0.5,
              }}>{tag}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LinkCard({ link, index, isBrand }) {
  const [hov, setHov] = useState(false);
  var isExt = !link.href.startsWith('mailto') && link.href !== '#';
  return (
    <a
      href={link.href}
      target={isExt ? '_blank' : '_self'}
      rel={isExt ? 'noopener noreferrer' : undefined}
      onMouseEnter={function() { setHov(true); }}
      onMouseLeave={function() { setHov(false); }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.35rem 0',
        paddingLeft: hov ? '0.65rem' : '0',
        borderBottom: '1px solid var(--surface-border)',
        textDecoration: 'none',
        transition: 'padding-left 0.25s cubic-bezier(0.16,1,0.3,1)',
        animation: 'staggerIn 0.5s cubic-bezier(0.16,1,0.3,1) ' + (index * 0.07) + 's both',
      }}
    >
      <div>
        <div style={{
          fontFamily: 'var(--body-font)', fontWeight: 600, fontSize: '0.78rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: (hov && isBrand) ? 'var(--accent)' : 'var(--fg)',
          marginBottom: '0.22rem', transition: 'color 0.2s',
        }}>{link.label}</div>
        <div style={{ fontFamily: 'var(--body-font)', fontSize: '0.73rem', color: 'var(--muted)' }}>{link.desc}</div>
      </div>
      <span style={{
        color: 'var(--accent)', fontSize: '1rem', flexShrink: 0, marginLeft: '1.5rem',
        opacity: hov ? 1 : 0.4,
        transform: hov ? 'translate(3px,-3px)' : 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        display: 'block',
      }}>{'\u2197'}</span>
    </a>
  );
}

function LinkTree({ type, setLinkState }) {
  const [ready, setReady] = useState(false);
  var links = type === 'viewer' ? VIEWER_LINKS : BRAND_LINKS;
  var subtitle = type === 'viewer' ? 'Follow Along' : "Let's Work Together";
  useEffect(function() {
    var t = setTimeout(function() { setReady(true); }, 30);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <div style={{
      minHeight: 'calc(100dvh - 64px)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Camera UI decorations */}
      <div className="vf-wrap">
        <div className="vf-corner vf-tl"></div>
        <div className="vf-corner vf-tr"></div>
        <div className="vf-corner vf-bl"></div>
        <div className="vf-corner vf-br"></div>
        <div className="rec-badge" style={{ opacity: 0.3 }}>
          <div className="rec-dot"></div>
          <span className="rec-label" style={{ fontFamily: 'var(--body-font)' }}>Live</span>
        </div>
        <div className="cam-ticker-wrap" style={{ opacity: 0.18 }}>
          <span className="cam-ticker" style={{ fontFamily: 'var(--body-font)' }}>
            UGC SPECIALIST &nbsp;·&nbsp; CONTENT CREATOR &nbsp;·&nbsp; BRAND PARTNERSHIPS &nbsp;·&nbsp; SCROLL-STOPPING VIDEO &nbsp;·&nbsp; UGC SPECIALIST &nbsp;·&nbsp; CONTENT CREATOR &nbsp;·&nbsp; BRAND PARTNERSHIPS &nbsp;·&nbsp; SCROLL-STOPPING VIDEO &nbsp;·&nbsp;
          </span>
        </div>
      </div>

      {/* Main content — top-anchored with generous padding */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 680, width: '100%', margin: '0 auto',
        padding: 'clamp(3.5rem, 10vh, 6rem) 3.5rem clamp(3rem, 8vh, 5rem)',
        opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(18px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
      }}>

        {/* Breadcrumb */}
        <button
          onClick={function() { setLinkState('home'); }}
          style={{
            fontFamily: 'var(--body-font)', fontSize: '0.56rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--muted)', background: 'none', border: 'none',
            cursor: 'pointer', padding: 0, marginBottom: '2.5rem',
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--fg)'; }}
          onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--muted)'; }}
        >
          <span>&larr;</span>
          <span>Evan Friesen</span>
          <span style={{ opacity: 0.35 }}>/</span>
          <span>{type === 'viewer' ? 'Viewers' : 'Brands'}</span>
        </button>

        {/* Title block with rule */}
        <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--surface-border)' }}>
          <h2 style={{
            fontFamily: 'var(--display-font)',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 0.9,
            marginBottom: '1rem',
          }}>{subtitle}</h2>
          <p style={{
            fontFamily: 'var(--body-font)', fontSize: '0.56rem',
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)',
          }}>Evan Friesen &nbsp;·&nbsp; UGC Creator</p>
        </div>

        {/* Links */}
        <div>
          {links.map(function(link, i) {
            return <LinkCard key={i} link={link} index={i} isBrand={type === 'brand'} />;
          })}
        </div>
      </div>
    </div>
  );
}

function LinksPage({ linkState, setLinkState }) {
  return (
    <div>
      {linkState === 'home' && (
        <div style={{ animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
          <HeroHome setLinkState={setLinkState} />
        </div>
      )}
      {linkState === 'viewer' && (
        <div style={{ animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
          <LinkTree type="viewer" setLinkState={setLinkState} />
        </div>
      )}
      {linkState === 'brand' && (
        <div style={{ animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
          <LinkTree type="brand" setLinkState={setLinkState} />
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LinksPage });
