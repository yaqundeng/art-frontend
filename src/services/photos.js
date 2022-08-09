import axios from "axios";

class PhotosDataService {

    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos`);
    }
}

export default new PhotosDataService();