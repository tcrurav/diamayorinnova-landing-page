const burger = document.getElementById('hamburger');
const menu = document.getElementById('collapsible-top-menu');


function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open && window.matchMedia('(max-width: 767px)').matches ? 'hidden' : '';
}


burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'false';
    setMenu(open);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') setMenu(false);
});


document.addEventListener('click', (e) => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    if (!expanded) return;
    if (!e.target.closest('#collapsible-top-menu') && !e.target.closest('#hamburger')) setMenu(false);
});


const mql = window.matchMedia('(min-width: 998px)');
mql.addEventListener('change', () => setMenu(false));

menu.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const isMobile = window.matchMedia('(max-width: 991px)').matches;
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    if (isMobile && isOpen) {
        // Esperamos al siguiente frame para no interferir con el scroll del ancla
        requestAnimationFrame(() => setMenu(false));
    }
});