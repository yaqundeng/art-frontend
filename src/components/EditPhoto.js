import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import PhotoDataService from '../services/photos';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import StyledDemo from './Crop';
import "./EditPhoto.css";
import { BsInfo } from 'react-icons/bs';

const EditPhoto = ({ user }) => {
    let params = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [photo, setPhoto] = useState({
        id: null,
        photo_name: "",
        img: null,
        user_id: "",
        user_name: "",
        reviews: []
    });

    useEffect(() => {
        const getPhoto = id => {
            PhotoDataService.getPhoto(id)
                .then(photo => {
                    setPhoto({
                        id: photo.data._id,
                        photo_name: photo.data.photo_name,
                        img: photo.data.img,
                        reviews: photo.data.reviews,
                        user_id: photo.data.user_id,
                        user_name: photo.data.user_name
                    })
                }).catch(e => {
                    console.log(e);
                });
        }
        getPhoto(params.id)
    }, [params.id]);

    useEffect(() => {
        console.log(photo.photo_name, "received");
        if (user) {
            setUserId(user.googleId);
        }
    }, [photo])


    return (
        <div>
            <Container>
                <Card className='moviesListCard'>
                    <Card.Img
                        className='smallPoster'
                        src={photo.img}
                    />
                    <Card.Body>
                        <Card.Title>{photo.photo_name}</Card.Title>
                        <Card.Text>
                            {photo.user_name}
                        </Card.Text>

                        {/* {user && user.googleId === review.user_id}
                        <Link to={"/movies/"+photo._id}>
                            Delete
                        </Link> */}
                    </Card.Body>
                </Card>
                <Row>
                    {userId === photo.user_id && <div className="mb-2" >
                        <Button variant="warning" size="lg" onClick={() => {
                            for (let i = 0; i < photo.reviews.length; i++) {
                                let review = photo.reviews[i];
                                let reviewData = {
                                    review: review,
                                    user_id: review.user_id,
                                    review_id: review._id,
                                    photo_id: params.id
                                }
                                PhotoDataService.deleteReview(reviewData)
                                    .catch(e => {
                                        console.log(e);
                                    });
                            }
                            const info = { photo_id: photo.id, user_id: user.googleId };
                            PhotoDataService.deletePhoto(user.googleId, info);
                            navigate('/mypage');
                        }}>Delete Photo</Button>
                    </div>}
                </Row>
                <Col>
                    <StyledDemo img={photo.img} />
                    {/* {user &&
                    <Link to ={"/photos/" + params.id + "/upload"}>
                        Upload Photo
                    </Link>} */}
                </Col>
                <h2>Reviews</h2>
                <Col>
                    {user &&
                        <Link to={"/photos/" + params.id + "/review"}>
                            <Button variant="dark" type="button">
                                Add Review
                            </Button>
                        </Link>}
                </Col>
                <br></br>
                {photo.reviews.map((review, index) => {
                    return (
                        <div key={index}>
                            <h5>{review.name + " reviewed on "}{moment(review.date).format("Do MMMM YYYY")}</h5>
                            <p className='review'>{review.review}</p>
                            {user && user.googleId === review.user_id &&
                                <Row>
                                    <Col>
                                        <Link to={{
                                            pathname: "/photos/" + params.id + "/review"
                                        }}
                                            state={{
                                                currentReview: review
                                            }}>
                                            <Button variant="dark" type="button">
                                                Edit
                                            </Button>

                                        </Link>
                                    </Col>
                                    <Col>
                                        <Button variant='dark' onClick={() => {
                                            let reviewData = {
                                                review: review,
                                                user_id: review.user_id,
                                                review_id: review._id,
                                                photo_id: params.id
                                            }
                                            PhotoDataService.deleteReview(reviewData)
                                                .then(
                                                    setPhoto((prevState) => {
                                                        prevState.reviews.splice(index, 1);
                                                        return ({
                                                            ...prevState
                                                        })
                                                    })
                                                ).catch(e => {
                                                    console.log(e);
                                                });
                                        }}>
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            }
                        </div>
                    )
                })}
            </Container>
        </div>
    )
}

export default EditPhoto;