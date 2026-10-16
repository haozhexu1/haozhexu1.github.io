// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Keep the highlighted navigation item in sync with the section on screen.
const navLinks = [...document.querySelectorAll('.topbar nav a[href^="#"]')];
const sections = navLinks
  .map(link => document.getElementById(link.hash.slice(1)))
  .filter(Boolean);

function updateActiveNavigation() {
  const headerHeight = document.querySelector('.topbar')?.getBoundingClientRect().height || 70;
  const activationLine = headerHeight + Math.min(230, window.innerHeight * 0.30);
  let activeId = sections[0]?.id;

  // Choose the latest section reached by the reading position, rather than
  // whichever tall section happens to have an observer intersection.
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= activationLine) {
      activeId = section.id;
    }
  }

  // The last section can be shorter than the viewport; highlight it at page end.
  const doc = document.documentElement;
  if (window.innerHeight + window.scrollY >= doc.scrollHeight - 3 && sections.length) {
    activeId = sections[sections.length - 1].id;
  }

  for (const link of navLinks) {
    const isActive = link.hash === '#' + activeId;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

let pending = false;
function requestNavUpdate() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    pending = false;
    updateActiveNavigation();
  });
}

window.addEventListener('scroll', requestNavUpdate, { passive: true });
window.addEventListener('resize', requestNavUpdate);
window.addEventListener('hashchange', requestNavUpdate);
// Show the chosen section immediately when a navigation item is clicked.
navLinks.forEach(link => link.addEventListener('click', () => {
  navLinks.forEach(item => {
    const active = item === link;
    item.classList.toggle('active', active);
    if (active) item.setAttribute('aria-current','location');
    else item.removeAttribute('aria-current');
  });
}));
window.addEventListener('load', requestNavUpdate);
requestNavUpdate();
