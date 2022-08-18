import React, { useState, useEffect, useCallback } from 'react';
import PhotosDataService from '../services/photos'
import PortfolioDataService from '../services/portfolio'
import "./PersonalPhotos.css";
import Button from "react-bootstrap/Button";
import PhotosDisplay from './PhotosDisplay';
import {Link, useParams} from 'react-router-dom';

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
        // const photoList = [];
        
        // photoIds.forEach((id) => {
        //     PhotosDataService.getPhoto(id)
        //     .then(response => {
        //         photoList.push(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     }) 
        // })
        // setPersonalPhotos(photoList);
        PhotosDataService.getPersonalPhotoLists(photoIds)
        .then(response => {
            setPersonalPhotos(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[photoIds]);

    useEffect(() => {
        retrivePhotoListByIds(photoIds);
    }, [retrivePhotoListByIds])

    return (
        <div className='App'>
            <Link to ={"/photos/" + user.googleId + "/upload"}>
                <Button className="addPhotoBtn" variant="dark" type="button">
                    Add Photo
                </Button>
            </Link>
            
            <PhotosDisplay user={user} photos={personalPhotos} personal={true}>

            </PhotosDisplay>
        </div>
    )
}

export default PersonalPhotos;