const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));

  menuToggle.setAttribute("aria-label", isOpen ? "Åbn menu" : "Luk menu");

  navigation.classList.toggle("is-open", !isOpen);
});

// Luk menuen, når et link vælges

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Åbn menu");
    navigation.classList.remove("is-open");
  });
});
