import api from '../api'

class NewsService {
    getAll() {
        return api.get('/news')
    }

    create(data) {
        return api.post('/news', data)
    }

    delete(id) {
        return api.delete(`/news/${id}`)
    }
}

export default new NewsService()
