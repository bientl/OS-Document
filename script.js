// ============================================================
//  Navigation
// ============================================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const sidebar  = document.getElementById('sidebar');
const toggle   = document.getElementById('menu-toggle');

function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
  if (activeLink) {
    // Auto-expand the group containing the active link
    const group = activeLink.closest('.nav-group');
    if (group && !group.classList.contains('open')) {
      group.classList.add('open');
    }
    activeLink.classList.add('active');
    activeLink.scrollIntoView({ block: 'nearest' });
  }

  document.getElementById('main').scrollTo({ top: 0 });
  window.scrollTo({ top: 0 });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const sectionId = link.dataset.section;
    showSection(sectionId);
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  });
});

// ============================================================
//  Accordion — group headers toggle open/closed
// ============================================================
document.querySelectorAll('.nav-group-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.nav-group');
    group.classList.toggle('open');
  });
});

// ============================================================
//  Mobile menu toggle
// ============================================================
toggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.addEventListener('click', e => {
  if (window.innerWidth <= 768 &&
      !sidebar.contains(e.target) &&
      e.target !== toggle) {
    sidebar.classList.remove('open');
  }
});

// ============================================================
//  Init
// ============================================================
showSection('intro');
