const galleries = {
  softgel: {
    label: "Soft Gel",
    title: "Dise\u00f1os Soft Gel",
    base: "images/catalogo/softgel",
  },
  kapping: {
    label: "Kapping",
    title: "Dise\u00f1os Kapping",
    base: "images/catalogo/kapping",
  },
  semipermanente: {
    label: "Semipermanente",
    title: "Dise\u00f1os Semipermanentes",
    base: "images/catalogo/semipermanente",
  },
  acrilico: {
    label: "Esculpidas en Acr\u00edlico",
    title: "Esculpidas en Acr\u00edlico",
    base: "images/catalogo/acrilico",
  },
};

const MAX_SCAN_ATTEMPTS = 999;

let activeGallery = null;
let activeIndex = 0;
let activeImages = [];
const galleryCache = new Map();

const modal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalCounter = document.getElementById("modalCounter");
const thumbnailRow = document.getElementById("thumbnailRow");

function imageExists(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

async function getImages(galleryKey) {
  if (galleryCache.has(galleryKey)) {
    return galleryCache.get(galleryKey);
  }

  const gallery = galleries[galleryKey];
  const images = [];

  for (let number = 1; number <= MAX_SCAN_ATTEMPTS; number += 1) {
    const src = `${gallery.base}/${number}.jpg`;
    const exists = await imageExists(src);

    if (!exists) break;
    images.push(src);
  }

  galleryCache.set(galleryKey, images);
  return images;
}

function setModalImage(index) {
  if (!activeGallery || activeImages.length === 0) return;

  activeIndex = (index + activeImages.length) % activeImages.length;
  const currentSrc = activeImages[activeIndex];

  modalImage.src = currentSrc;
  modalImage.alt = `${activeGallery.label} ${activeIndex + 1}`;
  modalTitle.textContent = activeGallery.title;
  modalCategory.textContent = activeGallery.label;
  modalCounter.textContent = `${activeIndex + 1} / ${activeImages.length}`;

  thumbnailRow.querySelectorAll(".thumbnail-button").forEach((button, buttonIndex) => {
    const isActive = buttonIndex === activeIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function buildThumbnails() {
  if (!activeGallery) return;

  thumbnailRow.innerHTML = "";
  activeImages.forEach((src, index) => {
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

async function openGallery(galleryKey, index = 0) {
  activeGallery = galleries[galleryKey];
  if (!activeGallery) return;

  activeImages = [];
  thumbnailRow.innerHTML = "";
  modalImage.removeAttribute("src");
  modalTitle.textContent = activeGallery.title;
  modalCategory.textContent = activeGallery.label;
  modalCounter.textContent = "Cargando...";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  activeImages = await getImages(galleryKey);

  if (activeImages.length === 0) {
    modalCounter.textContent = "Sin im\u00e1genes";
    return;
  }

  buildThumbnails();
  setModalImage(index);
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
