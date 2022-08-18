import React, { useState} from 'react';
import PhotoDataService from '../services/photos';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";

const Review = ({ user }) => {
    const navigate = useNavigate()
    let params = useParams();
    let location = useLocation();
    let initialReviewState = "";
    let editing = false;

    // initialReviewState will have a different value
    // if we're editing an existing review
    if(location.state !== null){
        editing= true;
        initialReviewState = location.state.currentReview;
    }

    const [review, setReview] = useState(initialReviewState);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            photo_id: params.id // get photo id from url
        }

        if(editing) {
            //TODO: handle case where are existing
            // review is being updated
            var editData = {
                review: review,
                name: user.name,
                user_id: user.googleId,
                photo_id: params.id,
                review_id: initialReviewState._id
            }
            PhotoDataService.updateReview(editData)
            .then(response => {
                navigate("/photos/" + params.id);
            }).catch(e => {
                console.log(e);
            });
        } else{
            PhotoDataService.createReview(data)
            .then(response => {
                navigate("/photos/"+params.id)
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <Container className='main-Container'>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>{ editing ? "Edit" : "Create" } Review</Form.Label>
                    <Form.Control
                    as="textarea"
                    type="text"
                    required
                    review={ review }
                    onChange={ onChangeReview }
                    defaultValue={ editing ? null : "" }
                    />
                </Form.Group>
                <Button variant="dark" onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Review;