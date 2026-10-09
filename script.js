// Filter the portfolio cards by their category.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.hidden = !matchesCategory;
    });
  });
});

// Open the selected MP4 in an accessible native video dialog.
const videoDialog = document.querySelector(".video-dialog");
const modalVideo = document.querySelector(".modal-video");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const closeVideoButton = document.querySelector(".dialog-close");

document.querySelectorAll(".project-preview").forEach((preview) => {
  preview.addEventListener("click", () => {
    modalVideo.src = preview.dataset.video;
    modalTitle.textContent = preview.dataset.title;
    modalDescription.textContent = preview.dataset.description;
    document.body.classList.add("dialog-open");
    videoDialog.showModal();
    modalVideo.play().catch(() => {
      // The browser may require the viewer to press play manually.
    });
  });
});

function closeVideoDialog() {
  videoDialog.close();
}

closeVideoButton.addEventListener("click", closeVideoDialog);
videoDialog.addEventListener("click", (event) => {
  if (event.target === videoDialog) closeVideoDialog();
});
videoDialog.addEventListener("close", () => {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  document.body.classList.remove("dialog-open");
});

// Keep the small-screen navigation easy to use and close it after a selection.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("open");
  });
});

// Keep the copyright year current without editing the HTML each year.
document.querySelector("#year").textContent = new Date().getFullYear();