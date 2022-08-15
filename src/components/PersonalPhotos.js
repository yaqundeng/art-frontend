import React, { useState, useEffect, useCallback } from 'react';
import PhotosDataService from '../services/photos'
import PortfolioDataService from '../services/portfolio'
import "./PersonalPhotos.css";
import Button from "react-bootstrap/Button";
import PhotosDisplay from './PhotosDisplay';

const PersonalPhotos = ({user}) => {

    const[personalPhotos, setPersonalPhotos] = useState([]);

    const[photoIds, setPhotoIds] = useState([]);

    const retrivePhotoIds = useCallback(() => {
        
        PortfolioDataService.getPortfolio(user.googleId)
            .then(response => {
                setPhotoIds(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [user]);

    useEffect(() => {
        retrivePhotoIds();
    }, [retrivePhotoIds])
    
    const retrivePhotoListByIds = useCallback((photoIds) => {
        const photoList = [];
        
        photoIds.forEach((id) => {
            PhotosDataService.getPhoto(id)
            .then(response => {
                photoList.push(response.data);
            })
            .catch(error => {
                console.log(error)
            }) 
        })
        setPersonalPhotos(photoList);
    },[photoIds]);

    useEffect(() => {
        retrivePhotoListByIds(photoIds);
    }, [retrivePhotoListByIds])

    console.log(personalPhotos);

    return (
        <div className='App'>
            <Button variant="dark" type="button">
                Add
            </Button>
            
            <PhotosDisplay user={user} photos={personalPhotos}>

            </PhotosDisplay>
        </div>
    )
}

export default PersonalPhotos;