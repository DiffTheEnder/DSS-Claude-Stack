// Shared utilities for all dashboard pages

const DATA_DIR = 'data/';

async function loadJSON(filename) {
  const resp = await fetch(DATA_DIR + filename);
  if (!resp.ok) throw new Error(`Failed to load ${filename}: ${resp.status}`);
  return resp.json();
}

// Dark mode
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  const html = document.documentElement;
  const stored = localStorage.getItem('dark-mode');
  if (stored === 'true' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('dark-mode', html.classList.contains('dark'));
    });
  }
}

// Mobile sidebar toggle
function initSidebar() {
  const btn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !btn.contains(e.target)) sidebar.classList.remove('open');
    });
  }
}

// Highlight active nav and load freshness indicator
function initNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
  initBuildFreshness();
}

// Build freshness indicator
async function initBuildFreshness() {
  try {
    const meta = await loadJSON('meta.json');
    const el = document.getElementById('build-freshness');
    if (el && meta.buildTimestamp) {
      const built = new Date(meta.buildTimestamp);
      const ago = formatTimeAgo(built);
      el.textContent = `Last built: ${ago}`;
      el.title = built.toLocaleString();
    }
  } catch (_e) {
    // meta.json may not exist in older builds
  }
}

function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Kill condition status to CSS class
function kcStatusClass(status) {
  const s = (status || '').toUpperCase().trim();
  if (s.includes('UNTESTED')) return 'kc-untested';
  if (s.includes('EARLY SIGNAL')) return 'kc-early-signal';
  if (s.includes('BUILDING')) return 'kc-building';
  if (s.includes('WEAKENING')) return 'kc-weakening';
  if (s.includes('PASSED')) return 'kc-passed';
  if (s.includes('FAILED')) return 'kc-failed';
  return 'kc-untested';
}
