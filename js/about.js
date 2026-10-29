/* ========================================
   MAIL POPUP
======================================== */

const emailTrigger = document.getElementById("email-trigger");
const emailModal = document.getElementById("email-modal");
const emailConfirm = document.getElementById("email-modal-confirm");
const emailCloseButtons = document.querySelectorAll("[data-close-modal]");

function openEmailModal() {
  if (!emailModal) return;

  emailModal.classList.add("is-open");
  emailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (emailConfirm) {
    emailConfirm.focus();
  }
}

function closeEmailModal() {
  if (!emailModal) return;

  emailModal.classList.remove("is-open");
  emailModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (emailTrigger) {
    emailTrigger.focus();
  }
}

if (emailTrigger && emailModal && emailConfirm) {
  emailTrigger.addEventListener("click", openEmailModal);

  emailCloseButtons.forEach((button) => {
    button.addEventListener("click", closeEmailModal);
  });

  emailConfirm.addEventListener("click", () => {
    closeEmailModal();
    window.location.href = "mailto:luaskovrud@hotmail.com";
  });
}

/* ========================================
   TELEFON POPUP
======================================== */

const phoneTrigger = document.getElementById("phone-trigger");
const phoneModal = document.getElementById("phone-modal");
const phoneCopy = document.getElementById("phone-copy");
const phoneMessage = document.getElementById("phone-message");
const phoneCopyStatus = document.getElementById("phone-copy-status");

const desktopQuery = window.matchMedia("(min-width: 1024px)");

function openPhoneModal() {
  if (!phoneModal) return;

  phoneModal.classList.add("is-open");
  phoneModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (phoneCopy) {
    phoneCopy.focus();
  }
}

function closePhoneModal() {
  if (!phoneModal) return;

  phoneModal.classList.remove("is-open");
  phoneModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (phoneTrigger) {
    phoneTrigger.focus();
  }
}

if (phoneTrigger && phoneModal) {
  phoneTrigger.addEventListener("click", (event) => {
    // På computer åbnes popup'en.
    // På mobil fortsætter tel-linket som normalt.
    if (desktopQuery.matches) {
      event.preventDefault();
      openPhoneModal();
    }
  });

  document.querySelectorAll("[data-close-phone-modal]").forEach((button) => {
    button.addEventListener("click", closePhoneModal);
  });

  // Kopiér nummer
  if (phoneCopy) {
    phoneCopy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("+4541413432");

        if (phoneCopyStatus) {
          phoneCopyStatus.textContent = "Nummeret er kopieret!";
        }
      } catch {
        if (phoneCopyStatus) {
          phoneCopyStatus.textContent =
            "Kopiering mislykkedes. Markér nummeret ovenfor, og kopiér det manuelt.";
        }
      }
    });
  }

  // Forsøg at åbne en beskedapp
  if (phoneMessage) {
    phoneMessage.addEventListener("click", () => {
      closePhoneModal();
      window.location.href = "sms:+4541413432";
    });
  }
}

/* ========================================
   LUK POPUPS MED ESCAPE
======================================== */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (emailModal && emailModal.classList.contains("is-open")) {
    closeEmailModal();
  }

  if (phoneModal && phoneModal.classList.contains("is-open")) {
    closePhoneModal();
  }
});
