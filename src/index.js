import './sass/main.scss';
import pixabayAPIService from './js/apiService'
import imgCard from './templates/imgCard.hbs'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
import { notice, info, success, error } from '@pnotify/core';

defaults.delay = 3000;
defaults.remove = true;
defaults.mouseReset = false;


const API = new pixabayAPIService()

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    anchor: document.querySelector('.anchor'),
}

console.log(refs.anchor)
refs.searchForm.addEventListener('submit', onSearch)
// refs.loadMore.addEventListener('click',onLoadMore)


function onSearch(e) {
    e.preventDefault()

    API.query = e.currentTarget.elements.query.value.trim();
    API.resetPage()
    API.fetchImg().then(img => {
        clearPage()
        imgMarkup(img)
    })
    
}

function onLoadMore() { 
    API.fetchImg().then(imgMarkup)   
}

function imgMarkup(img) {
    // if (API.query === '') return;
    refs.galleryList.insertAdjacentHTML('beforeend',imgCard(img))
}

function clearPage() {
    refs.galleryList.innerHTML = ''
}

function infinityScroll([entry],observerRef) {
    if (!entry.isIntersecting) {
         API.fetchImg().then(imgMarkup)   
    }
    
}

const observer = new IntersectionObserver(infinityScroll, { threshold: 1, })

observer.observe(refs.anchor)


