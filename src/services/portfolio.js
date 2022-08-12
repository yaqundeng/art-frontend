import axios from "axios";

class PortfolioDataService {

    getPortfolio(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/photos/portfolio/${id}`);
    }
}

export default new PortfolioDataService();