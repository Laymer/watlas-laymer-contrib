(() => {
  const key = 'warrior-atlas:theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try {
    preference = localStorage.getItem(key);
  } catch {
    // The switch also works for this page when browser storage is unavailable.
  }

  function apply() {
    const theme = ['light', 'dark'].includes(preference) ? preference : system.matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.getElementById('theme-toggle')?.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  apply();
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = event.newValue;
      apply();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('theme-toggle').addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply();
      try {
        localStorage.setItem(key, preference);
      } catch {
        // Keep the chosen palette for the rest of this visit.
      }
    });
  });
})();
