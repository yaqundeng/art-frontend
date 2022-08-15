import axios from "axios";

class PhotosDataService {

    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos`);
    }

    getPhoto(id){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/photo/${id}`)
    }

    uploadPhoto(id, data){
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/portfolio/${id}`, data)
        .catch(e => {
            if (e.response){
                console.log("response", e)
            } else if (e.request){
                console.log("never receive response")
            } else{
                console.log("else")
            }
        })
    }

    updatePhotoLike(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/`, data)
    }

    createReview(data){
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/review`, data);
    }

    updateReview(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/review`, data);
    }

    deleteReview(data){
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/review`, {data})
    }
}

export default new PhotosDataService();