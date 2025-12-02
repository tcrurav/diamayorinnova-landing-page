(() => {
  const body = document.body;
  const main = document.querySelector('main');
  const track = document.getElementById('smooth-track');
  if (!main || !track) return;

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // clean if user doesn't want motions
    body.style.height = '';
    Object.assign(main.style, { position: '', inset: '', width: '', overflow: '' });
    track.style.transform = '';
    return;
  }

  // <main> fixed, only #smooth-track is moved
  Object.assign(main.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    overflow: 'hidden',
    willChange: 'transform'
  });

  // avoids side overflow
  document.documentElement.style.overflowX = 'hidden';
  body.style.overflowX = 'hidden';

  let sy = window.pageYOffset || 0;
  let dy = sy;
  const ease = 0.08;

  function setBodyHeight() {
    // mesuare actual track height (moveable content)
    const h = track.getBoundingClientRect().height; // solid with margins
    body.style.height = h + 'px';
  }

  // observe changes on track
  const ro = new ResizeObserver(setBodyHeight);
  ro.observe(track);

  addEventListener('load', setBodyHeight, { once: true });
  addEventListener('resize', setBodyHeight);
  setBodyHeight();

  addEventListener('scroll', () => { sy = pageYOffset || 0; }, { passive: true });

  function render() {
    dy = dy + (sy - dy) * ease;
    track.style.transform = `translate3d(0, ${-Math.round(dy * 100) / 100}px, 0)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();