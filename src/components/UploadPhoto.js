import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import PhotosDataService from "../services/photos";
import PortfolioDataService from "../services/portfolio.js";







const UploadImages = ({ user }) => {
    console.log(user);
    const [photo_id, setPhotoId] = useState("");
    const [myPortfolio, setPortfolio] = useState([]);

    const getMyPortfolio = useCallback((id) => {
        console.log(id);
        PortfolioDataService.getPortfolio(id)
            .then(response => {
                console.log(response.data);
                setPortfolio(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    })
    
    useEffect(() => {
        getMyPortfolio(user.googleId);
    }, [user])

    console.log(myPortfolio);

    const handleImageUpload = (event) => {
        event.preventDefault();
        const photo_name = event.target[0].value;
        const photo = event.target[1].files[0];
        const formData = new FormData();
        formData.append("user_id", user.googleId);
        formData.append("user_name", user.name);
        formData.append("photo_name", photo_name);
        formData.append("photo", photo);
        const response = PhotosDataService.uploadPhoto(user.googleId, formData)
            .then(
                (photo_id) => {
                    setPhotoId(photo_id.data);
                    myPortfolio.push(photo_id.data);
                    console.log(myPortfolio);
                    PortfolioDataService.updatePortfolio(user.googleId, myPortfolio);
                }
            ).catch((e) => { console.log(e) })
    };

    return (
        <div>
            <form onSubmit={handleImageUpload}>
                <input id="photo_name" type="text" />
                <input id="fileInput" type="file" />
                <input type="submit" />
            </form>
        </div>
    );
}
export default UploadImages;