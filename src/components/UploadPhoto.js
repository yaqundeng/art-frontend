import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import PhotosDataService from "../services/photos";
import PortfolioDataService from "../services/portfolio.js";
import "./UploadPhoto.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UploadImages = ({ user }) => {

    let params = useParams();
    const navigate = useNavigate();
    const [photo_id, setPhotoId] = useState("");
    const [myPortfolio, setPortfolio] = useState([]);

    const getMyPortfolio = useCallback((id) => {
        PortfolioDataService.getPortfolio(id)
            .then(response => {
                setPortfolio(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    })

    useEffect(() => {
        getMyPortfolio(params.id);
    }, [params.id])

    const handleImageUpload = (event) => {
        event.preventDefault();
        const user_name = event.target[0].value;
        const photo_name = event.target[1].value;
        const photo = event.target[2].files[0];
        const formData = new FormData();
        formData.append("user_id", params.id);
        formData.append("user_name", user_name);
        formData.append("photo_name", photo_name);
        formData.append("photo", photo);
        const response = PhotosDataService.uploadPhoto(params.id, formData)
            .then(
                (photo_id) => {
                    setPhotoId(photo_id.data);
                    myPortfolio.push(photo_id.data);
                    PortfolioDataService.updatePortfolio(params.id, myPortfolio);
                    navigate('/mypage');
                }
            ).catch((e) => { console.log(e) })
    };

    return (
        <div className="m-3">
            <Form onSubmit={handleImageUpload}>
                <Form.Group className="mb-3">
                    <Form.Label className="mb-3">Author Name</Form.Label>
                    <Form.Control className="control" id="user_name" type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="mx-3">Photo Name</Form.Label>
                    <Form.Control className="control" id="photo_name" type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="mx-3">Upload Photo</Form.Label>
                    <Form.Control className="control" id="fileInput" type="file" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
export default UploadImages;