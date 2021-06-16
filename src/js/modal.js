import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  const instance = basicLightbox.create(`<img src= ${event.target.dataset.source}>`);
  instance.show();
}

export { onOpenModal };
