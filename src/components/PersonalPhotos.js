import React, { useState, useEffect, useCallback } from 'react';
import PhotosDataService from '../services/photos'
import PortfolioDataService from '../services/portfolio'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./PersonalPhotos.css";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const PersonalPhotos = ({user}) => {

    const[photos, setPhotos] = useState([]);
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

    // const retrivePhotoListByIds = useCallback((photoIds) => {
    //     const photoList = photoIds.map((id) => {
    //         PhotosDataService.getPhoto(id)
    //         .then(response => {
    //             return response.data;
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         }) 
    //     })

    //     setPhotos(photoList);
        
    // },[photoIds])

    // useEffect(() => {
    //     retrivePhotoListByIds(photoIds);
    //     console.log(photos);
    // }, [retrivePhotoListByIds])

    return (
        <div className='App'>
            <Button variant="dark" type="button">
                Add
            </Button>
            This is the PersonalPhotos page.
        </div>
    )
}

export default PersonalPhotos;