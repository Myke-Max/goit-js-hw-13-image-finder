        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '22387532-0967f6e2e55f286a38e8c1dae';

export default class pixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1
    }
    fetchImg() {
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(r => r.json())
            .then(({ hits}) => {
                this.incrementPage()
            return hits
            }
            
            )
            
    }

    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        return this.searchQuery = newQuery
    }
}