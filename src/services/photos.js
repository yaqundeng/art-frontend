import axios from "axios";

class PhotosDataService {

    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos`);
    }

    getPhoto(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/photo/${id}`)
    }

    getPersonalPhotoLists(ids) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/personalphotos`, { params: { ids: ids } })
    }

    uploadPhoto(id, data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/portfolio/${id}`, data);
    }

    updatePhotoLike(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/`, data);
    }

    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/review`, data);
    }

    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/review`, data);
    }

    deleteReview(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/review`, { data })
    }
}

export default new PhotosDataService();