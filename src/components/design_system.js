// Shared visual and accessibility refinements for every generated page.
// Page-specific layouts remain in build_map.js; cross-page behavior belongs here.

const DESIGN_SYSTEM_CSS = `
    :root {
      --focus-ring: #0ea5e9;
      --hub-accent: #dc2626;
      --village-accent: #2563eb;
      --admin-accent: #059669;
    }

    body {
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }

    .nav-tabs {
      gap: 4px;
      padding: 4px;
      border-radius: 14px;
      box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.08);
    }

    .nav-tab {
      position: relative;
      min-height: 40px;
      padding: 8px 14px;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 10px;
      line-height: 1.2;
    }

    .nav-tab:hover {
      color: #1d4ed8;
      background: rgba(37, 99, 235, 0.08);
    }

    .nav-tab.active,
    .nav-tab[aria-current="page"] {
      color: #1d4ed8;
      border-color: rgba(37, 99, 235, 0.22);
      background: var(--bg-card);
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
    }

    .nav-tab.active::after,
    .nav-tab[aria-current="page"]::after {
      content: "";
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 3px;
      height: 3px;
      border-radius: 999px;
      background: #2563eb;
    }

    [data-theme="dark"] .nav-tab:hover {
      color: #bfdbfe;
      background: rgba(96, 165, 250, 0.12);
    }

    [data-theme="dark"] .nav-tab.active,
    [data-theme="dark"] .nav-tab[aria-current="page"] {
      color: #bfdbfe;
      border-color: rgba(96, 165, 250, 0.38);
      background: #171717;
    }

    [data-theme="dark"] .nav-tab.active::after,
    [data-theme="dark"] .nav-tab[aria-current="page"]::after {
      background: #60a5fa;
    }

    :where(a, button, input, textarea, select, [tabindex]):focus-visible {
      outline: 3px solid var(--focus-ring) !important;
      outline-offset: 3px;
      box-shadow: 0 0 0 5px rgba(14, 165, 233, 0.18) !important;
    }

    :where(.header-title, .mentor-name, .mentor-role, .mentor-desc, .event-location-name,
      .event-activity-title, .event-activity-desc, .timeline-location-title,
      .timeline-activity-title, .timeline-description, .switch-title, .switch-desc,
      .card-main-title, .card-subtitle) {
      overflow-wrap: anywhere;
    }

    .admin-indicator,
    .admin-controls-group,
    #admin-active-card {
      border-color: rgba(5, 150, 105, 0.42) !important;
    }

    .admin-controls-group,
    #admin-active-card {
      box-shadow: inset 4px 0 0 var(--admin-accent);
    }

    .admin-controls-group::before {
      content: "ადმინისტრატორის ხელსაწყოები";
      align-self: center;
      color: #047857;
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.02em;
    }

    [data-theme="dark"] .admin-controls-group::before {
      color: #6ee7b7;
    }

    /* Calendar hierarchy and consistent hub/village language */
    .calendar-day-cell {
      font-family: inherit;
      color: var(--text-main);
    }

    .calendar-day-cell.has-event {
      border-width: 2px;
      border-color: var(--village-accent);
      background: rgba(37, 99, 235, 0.09);
      box-shadow: inset 0 -3px 0 rgba(37, 99, 235, 0.42);
    }

    .calendar-day-cell.has-hub {
      border-color: var(--hub-accent);
      background: rgba(220, 38, 38, 0.08);
      box-shadow: inset 0 -3px 0 rgba(220, 38, 38, 0.42);
    }

    [data-theme="dark"] .calendar-day-cell.has-event {
      background: rgba(37, 99, 235, 0.18);
    }

    [data-theme="dark"] .calendar-day-cell.has-hub {
      background: rgba(220, 38, 38, 0.18);
    }

    .event-dot {
      width: 7px;
      height: 7px;
    }

    .day-events-card {
      border-top: 4px solid var(--village-accent);
    }

    .timeline-grid {
      gap: 16px;
    }

    .timeline-item-card {
      position: relative;
      padding: 18px;
      gap: 12px;
      border-left: 4px solid var(--village-accent);
    }

    .timeline-item-card.timeline-hub {
      border-left-color: var(--hub-accent);
    }

    .timeline-meta-row,
    .timeline-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .timeline-location-title {
      margin: 0;
      color: var(--text-main);
      font-size: 1rem;
      font-weight: 850;
      line-height: 1.35;
    }

    .timeline-activity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .timeline-activity-title {
      color: var(--text-muted);
      font-size: 0.84rem;
      font-weight: 750;
      line-height: 1.45;
    }

    .timeline-description {
      margin: 0;
      color: var(--text-subtle);
      font-size: 0.78rem;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    /* Mentor cards and professional profile layout */
    .mentors-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .mentor-card {
      align-items: stretch;
      text-align: left;
      padding: 22px;
      gap: 16px;
    }

    .mentor-card-header {
      display: flex;
      align-items: center;
      gap: 15px;
      min-width: 0;
    }

    .mentor-card-identity {
      min-width: 0;
      flex: 1;
    }

    .avatar-wrapper,
    .profile-header-avatar {
      overflow: hidden;
      isolation: isolate;
      background: var(--bg-card-subtle);
      border: 3px solid var(--bg-card);
      box-shadow: 0 0 0 1px var(--border-light), 0 8px 20px rgba(15, 23, 42, 0.12);
    }

    .avatar-wrapper {
      width: 84px;
      height: 84px;
      flex: 0 0 84px;
    }

    .mentor-avatar-fallback,
    .mentor-photo {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }

    .mentor-avatar-fallback {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .mentor-photo {
      position: relative;
      z-index: 2;
      display: block;
      object-fit: cover;
      object-position: center;
    }

    .mentor-name {
      margin: 0 0 7px;
      font-size: 1.08rem;
      line-height: 1.35;
    }

    .mentor-role {
      padding: 4px 9px;
      line-height: 1.35;
    }

    .mentor-desc {
      margin: 0;
      font-size: 0.84rem;
      line-height: 1.65;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }

    .mentor-card .tags-row {
      justify-content: flex-start;
      gap: 6px;
      margin-top: 0;
    }

    .tag-badge {
      padding: 4px 8px;
      line-height: 1.25;
    }

    .mentor-profile-window {
      max-width: 820px;
      border-radius: 20px;
      overflow: hidden;
    }

    .mentor-profile-window .modal-header {
      padding: 22px 24px;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.10), rgba(14, 165, 233, 0.04));
      border-bottom: 1px solid var(--border-light);
    }

    .profile-header-avatar {
      width: 76px;
      height: 76px;
      flex: 0 0 76px;
      position: relative;
    }

    .profile-modal-body {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      padding: 22px 24px 26px;
    }

    .cv-section-block {
      padding: 16px;
      gap: 9px;
      border-radius: 14px;
    }

    .profile-summary,
    .profile-achievements,
    .profile-expertise {
      grid-column: 1 / -1;
    }

    .cv-section-title {
      font-size: 0.88rem;
    }

    .cv-section-text {
      font-size: 0.84rem;
      line-height: 1.75;
    }

    .profile-social-links {
      gap: 9px;
      margin-top: 9px;
    }

    .social-link-btn {
      width: 44px;
      height: 44px;
    }

    /* Settings information architecture */
    .settings-group-heading {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 2px -4px;
      color: var(--text-main);
    }

    .settings-group-heading::after {
      content: "";
      height: 1px;
      flex: 1;
      background: var(--border-light);
    }

    .settings-group-icon {
      width: 38px;
      height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 11px;
      background: rgba(37, 99, 235, 0.10);
      color: #1d4ed8;
      font-size: 1rem;
    }

    .settings-group-title {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 850;
    }

    .settings-group-kicker {
      margin: 2px 0 0;
      color: var(--text-subtle);
      font-size: 0.72rem;
      line-height: 1.4;
    }

    .appearance-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 14px 16px;
      border: 1px solid var(--border-light);
      border-radius: 14px;
      background: var(--bg-card-subtle);
    }

    .appearance-preview {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .appearance-preview-icon {
      width: 42px;
      height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      font-size: 1.2rem;
    }

    .settings-card--privacy {
      border-left: 4px solid #8b5cf6;
    }

    .settings-card--system {
      border-left: 4px solid #0ea5e9;
    }

    #admin-active-card,
    #admin-analytics-card {
      border-left: 4px solid var(--admin-accent);
    }

    .ui-state-panel,
    .empty-events-state {
      min-height: 150px;
      padding: 26px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 9px;
      text-align: center;
      color: var(--text-muted);
      background: var(--bg-card-subtle);
      border: 1px dashed var(--border-light);
      border-radius: 14px;
    }

    .ui-state-panel strong {
      color: var(--text-main);
      font-size: 0.92rem;
    }

    .ui-state-icon {
      font-size: 1.8rem;
      line-height: 1;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      border: 1px solid var(--border-light);
      font-size: 0.75rem;
      font-weight: 750;
      line-height: 1.35;
    }

    .status-badge[data-state="loading"],
    .status-badge[data-state="offline"] {
      color: #a16207;
      background: rgba(234, 179, 8, 0.12);
      border-color: rgba(202, 138, 4, 0.28);
    }

    .status-badge[data-state="success"] {
      color: #047857;
      background: rgba(16, 185, 129, 0.12);
      border-color: rgba(5, 150, 105, 0.28);
    }

    .status-badge[data-state="error"] {
      color: #b91c1c;
      background: rgba(239, 68, 68, 0.11);
      border-color: rgba(220, 38, 38, 0.28);
    }

    [data-theme="dark"] .status-badge[data-state="loading"],
    [data-theme="dark"] .status-badge[data-state="offline"] { color: #fde68a; }
    [data-theme="dark"] .status-badge[data-state="success"] { color: #6ee7b7; }
    [data-theme="dark"] .status-badge[data-state="error"] { color: #fca5a5; }

    @media (pointer: coarse) {
      :where(.nav-tab, .btn, button, .theme-toggle-btn, .btn-return-map, .loc-action-btn,
        .social-link-btn, .month-btn, .filter-btn, .lever-switch) {
        min-height: 44px;
        min-width: 44px;
      }
    }

    @media (max-width: 768px) {
      header.header {
        padding: 8px 10px;
        gap: 7px;
      }

      .header-title {
        font-size: 0.98rem;
      }

      .header-logo {
        font-size: 1.1rem;
      }

      .nav-tabs {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        width: 100%;
        gap: 3px;
        padding: 3px;
        overflow: visible;
        border-radius: 12px;
      }

      .nav-tab {
        min-width: 0;
        min-height: 44px;
        padding: 5px 4px;
        white-space: normal;
        font-size: clamp(0.65rem, 2.45vw, 0.76rem);
        line-height: 1.2;
      }

      .nav-tab.active::after,
      .nav-tab[aria-current="page"]::after {
        left: 20%;
        right: 20%;
        bottom: 2px;
      }

      .calendar-layout {
        display: flex;
        flex-direction: column;
      }

      .day-events-card {
        order: -1;
      }

      .calendar-day-cell {
        min-height: 40px;
        aspect-ratio: auto;
        padding: 4px 1px;
      }

      .event-dots-wrap {
        margin-top: 2px;
      }

      .event-dot {
        width: 5px;
        height: 5px;
      }

      .timeline-item-card {
        padding: 15px;
      }

      .timeline-actions {
        align-items: stretch;
      }

      .timeline-actions > * {
        flex: 1;
        justify-content: center;
      }

      .mentors-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .mentor-card {
        padding: 17px;
      }

      .avatar-wrapper {
        width: 72px;
        height: 72px;
        flex-basis: 72px;
      }

      .mentor-profile-window .modal-header {
        padding: 17px;
      }

      .profile-modal-body {
        grid-template-columns: 1fr;
        padding: 16px;
      }

      .profile-summary,
      .profile-achievements,
      .profile-expertise {
        grid-column: auto;
      }

      .appearance-row {
        align-items: stretch;
        flex-direction: column;
      }

      .appearance-row .btn {
        width: 100%;
        justify-content: center;
      }

      .settings-group-heading {
        margin-top: 12px;
      }

      .admin-controls-group::before {
        width: 100%;
      }
    }

    @media (max-width: 420px) {
      .header-title > span:last-child {
        max-width: 205px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mentor-card-header {
        align-items: flex-start;
      }

      .profile-header-avatar {
        width: 64px;
        height: 64px;
        flex-basis: 64px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
`;

module.exports = { DESIGN_SYSTEM_CSS };
