import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import PhotosDataService from "../services/photos";

const UploadImages =({ user }) => {
    const [photo_id, setPhotoId] = useState("");
    const handleImageUpload = (event) => {
        event.preventDefault();
        const photo_name = event.target[0].value;
        const photo = event.target[1].files[0];
        const formData = new FormData();
        formData.append("user_id", user.id);
        formData.append("user_name", user.name);
        formData.append("photo_name", photo_name);
        formData.append("photo", photo);

        const response = PhotosDataService.uploadPhoto(user.id, formData)
            .then(
                (photo_id) => { setPhotoId(photo_id) }
            ).catch((e) => { console.log(e) })
    };
    console.log(photo_id.data);
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