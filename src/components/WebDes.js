import "./WebDes.css";
import react, { useCallback, useEffect, useState } from "react";
import PhotoDataService from "../services/photos";
import Carousel from 'react-bootstrap/Carousel';


const WebDes = ({ }) => {

    const [photos, setPhotos] = useState([]);

    const retrivePhotos = useCallback(() => {

        PhotoDataService.getAll()
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
        <div>
            <Carousel className="display">
                {photos.map((photo) => {
                    return (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={photo.img}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>{photo.photo_name}</h3>
                                <p>{photo.user_name}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
            <div className="desContainer">
                {/* <h1 className="descriptionTitle">We are Hala Madrid</h1> */}
                <h5 className="desText">
                    Maybe you want to keep a blog of moments captured on their cameraphone,
                    or maybe you want to show off your best pictures to the whole world in a bid for web celebrity.
                    Or maybe you want to securely and privately share photos of your kids with your family across the country.
                    We make all these things possible and more!
                </h5>
            </div>

            <div className="copyrightContainer">
                <p className="foot">© 2022 Hala Madrid. </p>
            </div>
        </div>
    )
}

export default WebDes;