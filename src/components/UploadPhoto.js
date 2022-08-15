import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import PhotosDataService from "../services/photos";

const UploadImages =({ user }) => {
    const navigate = useNavigate();
    let params = useParams();

    const[img, setImg] = useState("");

    const onChange = e => {
        const img = e.target.files[0];
        setImg(img);
    }

    const uploadHandle = () => {
        
        // var data = {
        //     user_name: user.name,
        //     user_id: user.googleId,
        //     photo_name: img.name,
        //     //ilePath: URL.createObjectURL(img)
        // }
        const formData = new FormData();
        formData.append("my img", img, img.name);
        console.log("!!!", img);
        // PhotosDataService.uploadPhoto(user.googleId, formData)
        // .then(res => {navigate("/photos/"+params.id)})
        // .catch(e => { console.log(e)});
    }

    return (
        <div>
            <input 
            //style={{display: 'none'}}
            type ="file" 
            onChange={onChange} 
            // ref={fileInput => this.fileInput = fileInput}/>
            />
            {/* <button onClick={() => this.fileInput.click()}>Pick a file</button> */}
            <button onClick={uploadHandle}>Upload</button>
        </div>
    )
}

export default UploadImages;