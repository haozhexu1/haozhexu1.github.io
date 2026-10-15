'use strict';
const profile = window.PROFILE || {};
const portraitHost = document.getElementById('portrait');
if (profile.photoUrl && portraitHost) {
  const image = new Image();
  image.alt = 'Portrait of Haozhe Xu';
  image.onload = () => portraitHost.replaceChildren(image);
  image.src = profile.photoUrl;
}

const linkContainer = document.querySelector('.profile-links');
const linkMap = [
  ['scholarUrl', 'Google Scholar'],
  ['githubUrl', 'GitHub'],
  ['linkedinUrl', 'LinkedIn']
];
if (linkContainer) {
  for (const [key, label] of linkMap) {
    if (!profile[key]) continue;
    const a = document.createElement('a');
    a.href = profile[key];
    a.textContent = label;
    a.target = '_blank';
    a.rel = 'noopener';
    linkContainer.append(a);
  }
}

if (profile.cvUrl) {
  document.querySelector('.cv-placeholder').hidden = true;
  const holder = document.getElementById('cv-document');
  holder.hidden = false;
  const a = document.createElement('a');
  a.href = profile.cvUrl;
  a.textContent = 'View / Download CV';
  a.className = 'cv-download';
  a.target = '_blank';
  a.rel = 'noopener';
  const frame = document.createElement('iframe');
  frame.src = profile.cvUrl;
  frame.title = 'Curriculum Vitae of Haozhe Xu';
  frame.className = 'cv-viewer';
  holder.append(a, frame);
}

const links = [...document.querySelectorAll('.content-nav a')];
function selectPanel() {
  const current = ['about','research','cv'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'about';
  document.querySelectorAll('.page-panel').forEach(panel => panel.hidden = panel.id !== current);
  links.forEach(link => {
    const active = link.hash === '#' + current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
links.forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  history.pushState(null, '', link.hash);
  selectPanel();
  if (window.innerWidth <= 760) {
    document.querySelector('main').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }
}));
addEventListener('hashchange', selectPanel);
addEventListener('popstate', selectPanel);
selectPanel();
document.getElementById('year').textContent = new Date().getFullYear();
