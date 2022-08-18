import items from "./gallery-items.js";

function createHtml(items) {
  return items.map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
    })
    .join("");
}

const gallery = document.querySelector('.js-gallery');
const galleryMarkup = createHtml(items);
gallery.insertAdjacentHTML('beforeend', galleryMarkup);

const bodyEl = document.body;
const modal = document.querySelector('.js-lightbox');
const image = document.querySelector('.lightbox__image');



gallery.addEventListener('click', openModalOnClick);
bodyEl.addEventListener('click', closeModalOnClick);
bodyEl.addEventListener("keydown", closeModalOnClick);


function openModalOnClick(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  modal.classList.add('is-open');
  bodyEl.classList.add('is-hidden');

  importOriginalImage(e);
  e.preventDefault();
}

function closeModalOnClick(e) {
  if (
    !(
      e.target.classList.contains("lightbox__button") ||
      e.target.classList.contains("lightbox__overlay") ||
      e.key == "Escape"
    )
  ) {
    return;
  }
  modal.classList.remove('is-open');
    bodyEl.classList.remove('is-hidden');
  clearSourceOnClose();
}

function importOriginalImage(e) {
  const newImage = e.target;
  image.setAttribute('src', newImage.dataset.source);
  image.setAttribute('alt', newImage.alt)
}

function clearSourceOnClose() {
  image.setAttribute('src', '');
  image.setAttribute('alt', '')
}