import PhotosDataService from '../services/photos'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import React from "react";
import Card from "react-bootstrap/Card";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import {Link} from "react-router-dom";
import "./PhotosDisplay.css";
import Button from "react-bootstrap/Button";

const PhotosDisplay = ({photos, user, personal}) => {
    return (
    <Container className="main-container">
        <Form>
            <Row className="photoRow">
                {photos.map((photo) => {
                    
                    const set = new Set(photo.like);

                    return (
                        <Col key={photo._id}>
                            <Card className="photosListCard">
                            <Card.ImgOverlay className="card-image-overlay">
                                {(photo.like.length !== 0 ?
                                    <div>
                                        <BsFillHeartFill className="heart heartFill" onClick={() => {
                                            if(personal) {
                                                return;
                                            }
                                            
                                            if(!set.has(user.user.googleId)) {
                                                const data = {
                                                    photo_id: photo._id,
                                                    like: [...photo.like, (user.user.googleId ? user.user.googleId : "unkonwn user")]
                                                }
                                                PhotosDataService.updatePhotoLike(data)
                                                .then(response => {
                                                    console.log("Update Likes of Photo Successfully")
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                })
                                            }
                                            else {
                                                set.delete(user.user.googleId);
                                                const likeArray = Array.from(set);

                                                const data = {
                                                    photo_id: photo._id,
                                                    like: likeArray
                                                }
                                                PhotosDataService.updatePhotoLike(data)
                                                .then(response => {
                                                    console.log("Update Likes of Photo Successfully")
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                })

                                            }
                                            
                                        }}/>
                                        <div className="likeCounts">
                                            {photo.like.length}
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <BsHeart className="heart heartEmpty" onClick={() => {
                                            if(personal || set.has(user.user.googleId)) {
                                                return;
                                            }
                                            const data = {
                                                photo_id: photo._id,
                                                like: [...photo.like, (user.user.googleId ? user.user.googleId : "unkonwn user")]
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
                                        <Button variant="dark" type="button">
                                            {personal ? "Edit or Delete": "Operations and Details" }
                                        </Button>
                                        
                                    </Link>
                                
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Form>
    </Container>
    )
}

export default PhotosDisplay;