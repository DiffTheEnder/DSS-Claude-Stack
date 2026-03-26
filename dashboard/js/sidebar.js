// Shared sidebar component — injected into all dashboard pages
// Usage: include this script, then call renderSidebar() before app.js

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <a href="index.html" class="sidebar-brand" style="text-decoration:none;color:inherit">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="8" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
        <circle cx="16" cy="16" r="3" stroke="#2DB892" stroke-width="1.5"/>
        <line x1="16" y1="6" x2="16" y2="12" stroke="#2DB892" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="16" y1="20" x2="16" y2="26" stroke="#2DB892" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="6" y1="16" x2="12" y2="16" stroke="#2DB892" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="20" y1="16" x2="26" y2="16" stroke="#2DB892" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <div>
        <div class="sidebar-title">{{PROJECT_NAME}}</div>
        <div class="sidebar-subtitle">Strategy Dashboard</div>
      </div>
    </a>
    <nav class="sidebar-nav">
      <div class="sidebar-label">Core</div>
      <a href="index.html" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
        Overview
      </a>
      <a href="pipeline.html" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 4h12M2 8h8M2 12h5"/></svg>
        Pipeline
      </a>
      <a href="competitors.html" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>
        Competitors
      </a>
      <div class="sidebar-label" style="margin-top: 0.75rem">Strategy</div>
      <a href="decisions.html" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2v12M2 8h12"/><circle cx="8" cy="8" r="6"/></svg>
        Decisions
      </a>
      <a href="scoring.html" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 13l3-4 3 2 4-6"/></svg>
        Scoring
      </a>
      <a href="timeline.html" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 3h12M2 8h12M2 13h12"/><circle cx="5" cy="3" r="1" fill="currentColor"/><circle cx="10" cy="8" r="1" fill="currentColor"/><circle cx="7" cy="13" r="1" fill="currentColor"/></svg>
        Timeline
      </a>
      <a href="research.html" class="nav-link">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>
        Research Hub
      </a>
    </nav>
    <div style="padding: 0.75rem; border-top: 1px solid rgba(255,248,240,0.06);">
      <button id="dark-toggle" class="nav-link" style="width:100%; border:none; background:none; cursor:pointer">
        <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 1a7 7 0 100 14 5 5 0 010-10"/></svg>
        Toggle Theme
      </button>
    </div>
  `;
}
