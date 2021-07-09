import './sass/main.scss'
import pixabayAPIService from './js/apiService'
import imgCard from './templates/imgCard.hbs'
import modal from './js/modal'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
import { notice, error } from '@pnotify/core';

defaults.delay = 3000;
defaults.remove = true;
defaults.mouseReset = false;

notice({
    text :"Welcome to our service"
})


const API = new pixabayAPIService()

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    anchor: document.querySelector('.anchor'),
}


refs.searchForm.addEventListener('submit', onSearch)
refs.galleryList.addEventListener('click',modal)
// refs.loadMore.addEventListener('click',onLoadMore)



function onSearch(e) {

    e.preventDefault()

    API.query = e.currentTarget.elements.query.value;

    if (API.query.trim() === '') {
         error({
         text: "Wow WoW something is wrong"
        });
        return;
     };
    API.resetPage()
    clearPage()
    fetchImages();
    e.currentTarget.elements.query.value = '';
    
}

function fetchImages() {
  API.fetchImg()
    .then(hits => {
      if (hits.length === 0) {
        error({
         text: "Wow WoW something is wrong"
        });
        return;
      }
      else if (hits.status === 404) {
          error({
            text: "Wow WoW something is wrong"
        })
      }
        
        
      imgMarkup(hits);
    })
    .catch(error => console.log(error));
}

function onLoadMore() { 
    API.fetchImg().then(imgMarkup)   
}

function imgMarkup(img) {
   
    refs.galleryList.insertAdjacentHTML('beforeend',imgCard(img))
}

function clearPage() {
    refs.galleryList.innerHTML = ''
}



const observer = new IntersectionObserver(infinityScroll, { threshold: 0, })

observer.observe(refs.anchor)

function infinityScroll([entry],observer) {
    if (entry.isIntersecting && API.query.trim() !== '') {
         fetchImages()
    }
    
}


