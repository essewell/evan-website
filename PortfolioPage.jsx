// PortfolioPage.jsx — Single embed at a time, retry-until-ready processing, always-visible nav
const { useState, useEffect, useRef } = React;

const POSTS = [
  { url: 'https://www.instagram.com/p/DXP_sTigaI8/' },
  { url: 'https://www.instagram.com/reel/DWXF8hnEhHX/' },
  { url: 'https://www.instagram.com/reel/DT_M_fckmDt/' },
  { url: 'https://www.instagram.com/p/DXhFnz7ytIk/' },
  { url: 'https://www.instagram.com/reel/DTMlL-pETAs/' },
  { url: 'https://www.instagram.com/p/DXb78RDSUv4/' },
];

/* Retry calling instgrm.Embeds.process() until embed.js is loaded */
function processEmbeds(attempts) {
  if (attempts === undefined) attempts = 0;
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  } else if (attempts < 20) {
    setTimeout(function() { processEmbeds(attempts + 1); }, 250);
  }
}

/* Loading skeleton — shown while Instagram processes */
function EmbedSkeleton() {
  return (
    <div style={{
      width: '100%', maxWidth: 400, margin: '0 auto',
      height: 520, borderRadius: 6,
      background: 'var(--surface)',
      border: '1px solid var(--surface-border)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '2px solid var(--surface-border)',
        borderTopColor: 'var(--accent)',
        animation: 'spin 0.9s linear infinite',
      }} />
      <span style={{
        fontFamily: 'var(--body-font)', fontSize: '0.6rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--muted)',
      }}>Loading</span>
    </div>
  );
}

function PortfolioPage() {
  const [current,    setCurrent]    = useState(0);
  const [fading,     setFading]     = useState(false);
  const [embedReady, setEmbedReady] = useState(false);
  const [pageReady,  setPageReady]  = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* Each time current changes: hide embed, process, reveal after delay */
  useEffect(() => {
    setEmbedReady(false);
    clearTimeout(timerRef.current);
    processEmbeds();
    timerRef.current = setTimeout(() => setEmbedReady(true), 1400);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  const go = (dir) => {
    if (fading) return;
    setFading(true);
    setEmbedReady(false); // show skeleton immediately — no black gap
    setTimeout(() => {
      setCurrent(c => (c + dir + POSTS.length) % POSTS.length);
      setFading(false);
    }, 80);
  };

  const goTo = (i) => {
    if (fading || i === current) return;
    setFading(true);
    setEmbedReady(false);
    setTimeout(() => { setCurrent(i); setFading(false); }, 80);
  };

  const navBtn = {
    fontFamily: 'var(--body-font)', fontSize: '0.6rem',
    letterSpacing: '0.16em', textTransform: 'uppercase',
    color: 'var(--muted)', background: 'none', border: 'none',
    cursor: 'pointer', padding: '0.5rem 0.25rem', transition: 'color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100dvh', paddingTop: 64,
      display: 'flex', flexDirection: 'column',
      opacity: pageReady ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>

      {/* Section header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '2.5rem 3rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <p style={{
            fontFamily: 'var(--body-font)', fontSize: '0.58rem',
            letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)',
          }}>UGC Portfolio</p>
          <span style={{
            fontFamily: 'var(--body-font)', fontSize: '0.46rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--muted)', opacity: 0.45,
          }}>9:16 &nbsp;·&nbsp; Vertical Format &nbsp;·&nbsp; UGC</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--display-font)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 0.93,
        }}>
          Content that{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'var(--hero-name-style, italic)' }}>converts.</em>
        </h2>
      </div>

      {/* Navigation — always visible, above the embed */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '1rem',
        padding: '0.5rem 1.5rem 1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <button style={navBtn} onClick={() => go(-1)}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >← Prev</button>

          <span style={{
            fontFamily: 'var(--body-font)', fontSize: '0.66rem',
            letterSpacing: '0.1em', color: 'var(--muted)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {String(current + 1).padStart(2, '0')} / {String(POSTS.length).padStart(2, '0')}
          </span>

          <button style={navBtn} onClick={() => go(1)}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >Next →</button>
        </div>

        {/* Pill dots */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {POSTS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? 22 : 5, height: 5, borderRadius: 3,
              padding: 0, border: 'none',
              background: i === current ? 'var(--accent)' : 'var(--muted)',
              opacity: i === current ? 1 : 0.45,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }} />
          ))}
        </div>
      </div>

      {/* Embed area — skeleton covers loading, no outer opacity flash */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '0 1.5rem 3rem', position: 'relative',
      }}>
        {/* Viewfinder corners around embed */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 460, height: '100%', pointerEvents: 'none' }}>
          <div className="vf-corner vf-tl" style={{ top: 0, left: 0 }}></div>
          <div className="vf-corner vf-tr" style={{ top: 0, right: 0 }}></div>
          <div className="vf-corner vf-bl" style={{ bottom: 0, left: 0 }}></div>
          <div className="vf-corner vf-br" style={{ bottom: 0, right: 0 }}></div>
        </div>
        {!embedReady && <EmbedSkeleton />}

        {/* key on the wrapper — React replaces the whole div, never touches
            Instagram's iframe directly (avoids removeChild crash) */}
        <div
          key={`post-${current}`}
          style={{
            width: '100%', maxWidth: 400, margin: '0 auto',
            opacity: embedReady ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
          dangerouslySetInnerHTML={{ __html:
            `<blockquote
              class="instagram-media"
              data-instgrm-permalink="${POSTS[current].url}"
              data-instgrm-version="14"
              style="margin:0 auto;min-width:unset;max-width:100%"
            ></blockquote>`
          }}
        />
      </div>
    </div>
  );
}

Object.assign(window, { PortfolioPage });
