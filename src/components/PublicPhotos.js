import PhotosDataService from '../services/photos'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import React, {useState, useEffect, useCallback} from "react";
import Card from "react-bootstrap/Card";
import "./PublicPhotos.css";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import {Link} from "react-router-dom";

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
        <Container className="main-container">
            <Form>
                <Row className="photoRow">
                    {photos.map((photo) => {
                        return (
                            <Col key={photo._id}>
                                <Card className="photosListCard">
                                <Card.ImgOverlay className="card-image-overlay">
                                    {(photo.like.length !== 0 ?
                                        <div>
                                            <BsFillHeartFill className="heart heartFill" onClick={() => {
                                                const data = {
                                                    photo_id: photo._id,
                                                    like: [...photo.like, (user.googleId ? user.googleId : "unkonwn user")]
                                                }

                                                PhotosDataService.updatePhotoLike(data)
                                                .then(response => {
                                                    console.log("Update Likes of Photo Successfully")
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                })

                                            }}/>
                                            <div className="likeCounts">
                                                {photo.like.length}
                                            </div>
                                        </div>
                                        
                                        :
                                        <div>
                                            <BsHeart className="heart heartEmpty" onClick={() => {
                                                const data = {
                                                    photo_id: photo._id,
                                                    like: [...photo.like, (user.googleId ? user.googleId : "unkonwn user")]
                                                }

                                                PhotosDataService.updatePhotoLike(data)
                                                .then(response => {
                                                    console.log("Update Likes of Photo Successfully")
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                })
                                                
                                            }}/>
                                            <div className="likeCounts">
                                                
                                            </div>
                                        </div>
                                    )}
                                </Card.ImgOverlay>

                                    <Card.Img className="smallPoster" src={photo.img} />
                                    <Card.Body>
                                        <Card.Title>{photo.name}</Card.Title>
                                        
                                        <Card.Text>
                                            Photo by {photo.user_name}
                                        </Card.Text>
                                        <Link className="reviewLink" to={"/photos/"+photo._id}>
                                            View Reviews
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Form>
        </Container>
    </div>
)}

export default PublicPhotos;