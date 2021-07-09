import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

export default function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
    }
     else if (e.code === "Escape") {
 return
}
  basicLightbox
    .create(`<img class="lightbox__image" src=${e.target.dataset.source} alt="">`)
    .show();
}