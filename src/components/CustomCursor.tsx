import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const leafPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!dotRef.current || !leafRef.current || !leafPathRef.current) return;

    // Assign to non-null local variables so TypeScript narrows the type
    // for the entire closure (animate loop, event handlers, cleanup).
    const dot: HTMLDivElement = dotRef.current;
    const leaf: HTMLDivElement = leafRef.current;
    const leafPath: SVGPathElement = leafPathRef.current;

    let mx = -100, my = -100;
    let lx = -100, ly = -100;
    let isHover = false;
    let rafId: number;

    const LEAF_NORMAL = 'M16 2 C16 2 28 8 28 20 C28 26 22 30 16 30 C10 30 4 26 4 20 C4 8 16 2 16 2Z';
    const LEAF_HOVER  = 'M16 2 C22 4 30 10 30 18 C30 26 24 31 16 31 C8 31 2 26 2 18 C2 10 10 4 16 2Z';

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onMouseEnter = () => {
      isHover = true;
      leaf.style.width = '48px';
      leaf.style.height = '48px';
      leafPath.setAttribute('d', LEAF_HOVER);
      dot.style.width = '4px';
      dot.style.height = '4px';
    };

    const onMouseLeave = () => {
      isHover = false;
      leaf.style.width = '32px';
      leaf.style.height = '32px';
      leafPath.setAttribute('d', LEAF_NORMAL);
      dot.style.width = '8px';
      dot.style.height = '8px';
    };

    // Hide default cursor site-wide
    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', onMouseMove);

    // Apply hover listeners to all interactive elements
    const applyHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, label, select, textarea')
        .forEach(el => {
          (el as HTMLElement).style.cursor = 'none';
          el.addEventListener('mouseenter', onMouseEnter);
          el.addEventListener('mouseleave', onMouseLeave);
        });
    };

    applyHoverListeners();

    // Re-apply if DOM changes (e.g. React re-renders)
    const observer = new MutationObserver(applyHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate() {
      lx = lerp(lx, mx, 0.1);
      ly = lerp(ly, my, 0.1);

      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      leaf.style.left = `${lx}px`;
      leaf.style.top = `${ly}px`;

      const dx = mx - lx;
      const dy = my - ly;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const speed = Math.sqrt(dx * dx + dy * dy);
      const tilt = isHover ? 0 : -35 + angle * 0.3;
      const scale = isHover ? 1 : 1 + Math.min(speed * 0.01, 0.15);

      leaf.style.transform = `translate(-50%, -50%) rotate(${tilt}deg) scale(${scale})`;

      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Small precise dot */}
      <div
        ref={dotRef}
        style={{
          width: 8,
          height: 8,
          background: '#86efac',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
          zIndex: 99999,
        }}
      />

      {/* Lagging leaf */}
      <div
        ref={leafRef}
        style={{
          width: 32,
          height: 32,
          position: 'fixed',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) rotate(-35deg)',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 99998,
        }}
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path
            ref={leafPathRef}
            d="M16 2 C16 2 28 8 28 20 C28 26 22 30 16 30 C10 30 4 26 4 20 C4 8 16 2 16 2Z"
            fill="#86efac"
            opacity="0.9"
            style={{ transition: 'd 0.3s cubic-bezier(0.16,1,0.3,1)' }}
          />
          {/* Leaf veins */}
          <path d="M16 4 C16 4 16 28 16 29" stroke="#010f07" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
          <path d="M16 10 C12 14 8 16 6 18"  stroke="#010f07" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35"/>
          <path d="M16 15 C20 18 24 19 26 20" stroke="#010f07" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35"/>
          <path d="M16 20 C13 22 10 23 8 24"  stroke="#010f07" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35"/>
        </svg>
      </div>
    </>
  );
}