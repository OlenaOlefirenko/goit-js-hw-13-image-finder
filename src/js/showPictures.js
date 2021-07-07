import cardMarkup from '../templates/photoCard.hbs';
import ImageApiService from './apiService.js';
import LoadMoreBtn from './load-more-btn.js';
import { onOpenModal } from './modal.js';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.galleryContainer.addEventListener('click', onOpenModal);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();
  clearImageContainer();

  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    loadMoreBtn.disable();
    return noResult();
  }

  loadMoreBtn.show();
  imageApiService.resetPage();

  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  imageApiService.fetchImages().then(hits => {
    appendImageMarkup(hits);
    scrollingPage();
    loadMoreBtn.enable();

    if (hits.length === 0) {
      loadMoreBtn.hide();
      noMatches();
    }
  });
}

function appendImageMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

function clearImageContainer() {
  refs.galleryContainer.innerHTML = '';
}

function noResult() {
  error({
    text: 'please, enter the name of the picture!',
    delay: 2500,
    width: '400px',
    minHeight: '50px',
  });
}

function noMatches() {
  error({
    text: 'No matches found!',
    delay: 2500,
    width: '400px',
    minHeight: '50px',
  });
}

function scrollingPage() {
  refs.galleryContainer.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  });
}
