
import { React, useState, useMutation } from "react";
import { 
    Container,
    Row,
    Col,
    Card,
    Image,
    Button 
  } from 'react-bootstrap';
import "../styles/Review.css";
import { Form } from 'react-bootstrap';
import { CREATE_REVIEW } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Review() {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');

  function handleRating(e) {
    setRating(e.target.value);
  };

  function handleText(e) {
    setText(e.target.value);
  };

  const [ createReview ] = useMutation(CREATE_REVIEW);

  function handleSubmitReview(e) {
    e.preventDefault();

    // get the users id to hand createReview
    const userId = Auth.getToken();
    console.log(`userId is: ${userId}`);

    // hardcoded campid for testing
    const campId = "643aa5e3cbd59266a734387a";

    const { leaveReview } = createReview({
      variables: {
          user: userId,
          camp: campId,
          rating: rating,
          text: text
      }
    })
  }


  return (
    <>
      <Container fluid>
      <Form onSubmit={handleSubmitReview}>
      <Form.Group controlId="formRating">
        <Form.Label>Rating (0-5)</Form.Label>
        <Form.Control type="float" min="0" max="5" value={rating} onChange={handleRating} required />
      </Form.Group>

      <Form.Group controlId="formText">
        <Form.Label>Review</Form.Label>
        <Form.Control as="textarea" rows={3} value={text} onChange={handleText} required />
      </Form.Group>

      <button type="submit">Submit Review</button>
      </Form>
      </Container>    
    </>
  );
}