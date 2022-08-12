import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import PhotoDataService from '../services/photos';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import moment from 'moment';


const EditPhoto = ({user}) => {
    let params = useParams();

    const [photo, setPhoto] = useState({
        id: null,
        photo_name: "",
        img: null,
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
                    reviews: photo.data.reviews
                })
            }).catch(e => {
            console.log(e+"!!!!!!");
        });
        }
        getPhoto(params.id)
    }, [params.id]);

    useEffect(()=>{
        console.log("11111", photo.photo_name);
    },[photo])
    
    return(
        <div>
            <Container>
                
                <Card className='moviesListCard'>
                    <Card.Img
                    className='smallPoster'
                    src={photo.img} 
                    />
                    <Card.Body>
                        <Card.Title>Photo Descriptions</Card.Title>
                        <Card.Text>
                            {photo.description}
                        </Card.Text>
                        
                        {/* {user && user.googleId === review.user_id}
                        <Link to={"/movies/"+photo._id}>
                            Delete
                        </Link> */}
                    </Card.Body>
                </Card>
                <Row>
                    <Button>Delete Photo</Button>
                </Row>
                <h2>Reviews</h2>
                <Col>
                {user &&
                    <Link to ={"/photos/" + params.id + "/review"}>
                        Add review
                    </Link>}
                </Col>
                <br></br>
                {photo.reviews.map((review, index) => {
                    return(
                        <div key={index}>
                            <h5>{review.name + " reviewed on " }{ moment(review.date).format("Do MMMM YYYY")}</h5>
                            <p className='review'>{review.review}</p>
                            { user && user.googleId === review.user_id &&
                            <Row>
                                
                                <Col>
                                    <Link to={{
                                        pathname: "/photos/"+params.id+"/review"
                                    }}
                                    state = {{
                                        currentReview: review
                                    }}>
                                        Edit
                                    </Link>
                                </Col>
                                <Col>
                                <Button variant='link' onClick={ () => {
                                    //TODO: IMPLEMENT DELETE BEHAVIOR
                                    if(index){
                                        var reviewData = {
                                            review: review,
                                            user_id: review.user_id,
                                            review_id: review._id
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
                                    }
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