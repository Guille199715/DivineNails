const galleries = {
  softgel: {
    label: "Soft Gel",
    title: "Dise\u00f1os Soft Gel",
    start: 2,
    count: 19,
    base: "images/catalogo/softgel",
  },
  kapping: {
    label: "Kapping",
    title: "Dise\u00f1os Kapping",
    start: 2,
    count: 4,
    base: "images/catalogo/kapping",
  },
  semipermanente: {
    label: "Semipermanente",
    title: "Dise\u00f1os Semipermanentes",
    start: 2,
    count: 3,
    base: "images/catalogo/semipermanente",
  },
  acrilico: {
    label: "Acr\u00edlico",
    title: "Esculpidas en Acr\u00edlico",
    start: 2,
    count: 7,
    base: "images/catalogo/acrilico",
  },
};

let activeGallery = null;
let activeIndex = 0;

const modal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalCounter = document.getElementById("modalCounter");
const thumbnailRow = document.getElementById("thumbnailRow");

function getImages(gallery) {
  const start = gallery.start || 1;
  const total = gallery.count - start + 1;
  return Array.from({ length: total }, (_, index) => `${gallery.base}/img${index + start}.jpg`);
}

function setModalImage(index) {
  if (!activeGallery) return;

  const images = getImages(activeGallery);
  activeIndex = (index + images.length) % images.length;
  const currentSrc = images[activeIndex];

  modalImage.src = currentSrc;
  modalImage.alt = `${activeGallery.label} ${activeIndex + 1}`;
  modalTitle.textContent = activeGallery.title;
  modalCategory.textContent = activeGallery.label;
  modalCounter.textContent = `${activeIndex + 1} / ${images.length}`;

  thumbnailRow.querySelectorAll(".thumbnail-button").forEach((button, buttonIndex) => {
    const isActive = buttonIndex === activeIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function buildThumbnails() {
  if (!activeGallery) return;

  thumbnailRow.innerHTML = "";
  getImages(activeGallery).forEach((src, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.className = "thumbnail-button";
    button.setAttribute("aria-label", `Ver imagen ${index + 1}`);
    button.addEventListener("click", () => setModalImage(index));

    image.src = src;
    image.alt = "";

    button.appendChild(image);
    thumbnailRow.appendChild(button);
  });
}

function openGallery(galleryKey, index = 0) {
  activeGallery = galleries[galleryKey];
  if (!activeGallery) return;

  buildThumbnails();
  setModalImage(index);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-gallery]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const galleryKey = trigger.dataset.gallery;
    const index = Number(trigger.dataset.index || 0);
    openGallery(galleryKey, index);
  });
});

document.querySelectorAll("[data-close-modal]").forEach((trigger) => {
  trigger.addEventListener("click", closeGallery);
});

document.querySelectorAll("[data-direction]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const direction = Number(trigger.dataset.direction);
    setModalImage(activeIndex + direction);
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter-button").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    document.querySelectorAll(".portfolio-item").forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") setModalImage(activeIndex - 1);
  if (event.key === "ArrowRight") setModalImage(activeIndex + 1);
});
