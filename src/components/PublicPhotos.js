import PhotosDataService from '../services/photos'
import React, {useState, useEffect, useCallback} from "react";
import PhotosDisplay from "./PhotosDisplay"

const PublicPhotos = (user) => {

    const[photos, setPhotos] = useState([]);

    const retrivePhotos = useCallback(() => {
        PhotosDataService.getAll()
            .then(response => {
                
                setPhotos(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [photos]);

    useEffect(() => {
        retrivePhotos();
    }, [retrivePhotos])

return (
    <div className='App'>
        <PhotosDisplay photos={photos} user={user}>
            
        </PhotosDisplay>
    </div>
)}

export default PublicPhotos;