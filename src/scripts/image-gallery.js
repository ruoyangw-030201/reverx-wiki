const galleryState = window.__imageGalleryState ?? {
  activeGallery: null,
  activeTrigger: null,
  scrollY: 0,
  htmlScrollBehavior: "",
  keyboardBound: false,
};

window.__imageGalleryState = galleryState;

function parseGalleryImages(gallery) {
  try {
    const images = JSON.parse(gallery.dataset.galleryImages ?? "[]");
    return Array.isArray(images) ? images.filter((image) => image?.src) : [];
  } catch {
    return [];
  }
}

function updateGalleryImage(gallery, index) {
  const images = parseGalleryImages(gallery);
  if (images.length === 0) return;

  const normalizedIndex = ((index % images.length) + images.length) % images.length;
  gallery.dataset.galleryIndex = String(normalizedIndex);

  const imageData = images[normalizedIndex];
  const image = gallery.querySelector("[data-gallery-image]");
  const caption = gallery.querySelector("[data-gallery-caption]");
  const captionPanel = caption?.closest(".image-gallery-caption");
  const counter = gallery.querySelector("[data-gallery-counter]");

  if (image instanceof HTMLImageElement) {
    image.src = imageData.src;
    image.alt = imageData.alt ?? "";
    image.draggable = false;
  }

  if (caption) {
    const captionText = imageData.caption ?? "";
    caption.textContent = captionText;
    if (captionPanel) {
      captionPanel.hidden = captionText.length === 0;
    }
  }

  if (counter) {
    counter.textContent = `${normalizedIndex + 1} / ${images.length}`;
  }
}

function lockPageScroll() {
  galleryState.scrollY =
    window.scrollY
    || window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0;
  galleryState.htmlScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  document.documentElement.classList.add("gallery-is-open");
  document.body.classList.add("gallery-is-open");
  document.body.style.position = "fixed";
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.top = `-${galleryState.scrollY}px`;
  document.body.style.width = "100%";
}

function unlockPageScroll() {
  const restoredScrollY = galleryState.scrollY;

  document.documentElement.classList.remove("gallery-is-open");
  document.body.classList.remove("gallery-is-open");
  document.body.style.position = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.top = "";
  document.body.style.width = "";

  try {
    window.scrollTo({
      top: restoredScrollY,
      left: 0,
      behavior: "instant",
    });
  } catch {
    window.scrollTo(0, restoredScrollY);
  }

  document.documentElement.scrollTop = restoredScrollY;
  document.body.scrollTop = restoredScrollY;
  document.documentElement.style.scrollBehavior = galleryState.htmlScrollBehavior;
}

function focusWithoutScroll(element) {
  if (!element?.focus) return;

  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
}

function getGalleryInitialFocus(gallery) {
  return (
    gallery.querySelector("[data-gallery-close-button]")
    ?? gallery
  );
}

function closeGallery() {
  const gallery = galleryState.activeGallery;
  if (!(gallery instanceof HTMLDialogElement)) return;

  if (gallery.open) {
    gallery.close();
  }
  unlockPageScroll();

  const trigger = galleryState.activeTrigger;
  galleryState.activeGallery = null;
  galleryState.activeTrigger = null;
  focusWithoutScroll(trigger);
}

function openGallery(gallery, trigger) {
  if (!(gallery instanceof HTMLDialogElement)) return;

  if (galleryState.activeGallery && galleryState.activeGallery !== gallery) {
    closeGallery();
  }

  galleryState.activeGallery = gallery;
  galleryState.activeTrigger = trigger;

  updateGalleryImage(gallery, 0);
  lockPageScroll();
  if (!gallery.open) {
    gallery.showModal();
  }
  focusWithoutScroll(getGalleryInitialFocus(gallery));
}

function moveGallery(step) {
  const gallery = galleryState.activeGallery;
  if (!gallery) return;

  const currentIndex = Number(gallery.dataset.galleryIndex) || 0;
  updateGalleryImage(gallery, currentIndex + step);
}

function bindGalleryTriggers() {
  document.querySelectorAll("[data-gallery-open]").forEach((trigger) => {
    if (!(trigger instanceof HTMLElement)) return;
    if (trigger.dataset.galleryTriggerBound === "true") return;
    trigger.dataset.galleryTriggerBound = "true";

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const galleryId = trigger.dataset.galleryOpen;
      const gallery = galleryId ? document.getElementById(galleryId) : null;
      openGallery(gallery, trigger);
    });
  });
}

function bindGalleryControls() {
  document.querySelectorAll("[data-image-gallery]").forEach((gallery) => {
    if (!(gallery instanceof HTMLDialogElement)) return;
    if (gallery.dataset.galleryBound === "true") return;
    gallery.dataset.galleryBound = "true";

    gallery.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeGallery();
    });

    gallery.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    gallery.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });

    gallery.querySelectorAll("[data-gallery-close]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        closeGallery();
      });
    });

    gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", (event) => {
      event.preventDefault();
      moveGallery(-1);
    });

    gallery.querySelector("[data-gallery-next]")?.addEventListener("click", (event) => {
      event.preventDefault();
      moveGallery(1);
    });
  });
}

function bindImageGalleries() {
  bindGalleryTriggers();
  bindGalleryControls();
}

if (!galleryState.keyboardBound) {
  galleryState.keyboardBound = true;
  document.addEventListener("keydown", (event) => {
    if (!galleryState.activeGallery) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveGallery(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveGallery(-1);
    }
  });
}

bindImageGalleries();
document.addEventListener("astro:page-load", bindImageGalleries);
