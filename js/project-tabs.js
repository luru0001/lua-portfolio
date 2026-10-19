// Skifter mellem Resultat og Process
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-panel]");

  function showPanel(name, moveFocus = false) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === name;

      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      if (isActive && moveFocus) {
        tab.focus();
      }
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== name;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      showPanel(tab.dataset.tab);
    });

    // Gør det muligt at skifte med piletasterne
    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();

        const direction = event.key === "ArrowRight" ? 1 : -1;

        const nextIndex = (index + direction + tabs.length) % tabs.length;

        showPanel(tabs[nextIndex].dataset.tab, true);
      }
    });
  });

  // Resultat vises som standard, når siden åbnes
  showPanel("resultat");
});
