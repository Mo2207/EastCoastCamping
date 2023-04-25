import React, { useState } from "react";
import { 
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button
} from 'react-bootstrap';
import "../styles/Upcoming.css";
import Footer from '../components/Footer';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CAMP_REVIEWS } from "../utils/queries";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CREATE_REVIEW } from "../utils/mutations";
import StarRating from "../components/StarRating";
import { validate } from "graphql";




function Review(){
  //Function to store current location and back again after login
    // const navigate = useNavigate();
    // function storeCurrentUrl(){
    //   const currentUrl = window.location.href;
    //   sessionStorage.setItem('currentUrl', currentUrl);
    // }
    // function handleLoginRedirect(){
    //   storeCurrentUrl();
    //   navigate('/login')
    // }
    let id;
    if (Auth.loggedIn()) {
        id = Auth.getToken()
    };
    const location = useLocation();
    const [ formData, setFormData ] = useState({ message:'', rating:''});

    const campgroundId = location.pathname.split('/').pop();
    const [ createReview] = useMutation(CREATE_REVIEW);


  
    const handleChange = (event) => {     
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
  };



    const Start =(j)=>{
        return <StarRating rating={j}/>;
    }
    // query individual camp reviews
    const { loading, error, data } = useQuery(GET_CAMP_REVIEWS, {
        variables: { campId: campgroundId }
    });
    if (loading) {
      return <p>Loading...</p>;
  }
  if (error) {
      return <p>Error: {error.message}</p>;
  }

    const handleReviewSubmit = async (event) => {
      // event.preventDefault();
      console.log(formData)
      console.log(parseFloat(formData.rating))
        console.log(id, campgroundId, formData.message, formData.rating )
        const {createData} = createReview({
            variables: { userId: id, campId: campgroundId, rating: parseFloat(formData.rating), text: formData.message
            }            
           })
           console.log(createData)
      }
    
    const campInfo = data?.campReviews || {};
    // console.log(data.campReviews)
    // const userNames = data.data.campReviews.foreach((review)=>{
    //     return `${review.user.firstName} ${review.user.lastName}`;
    // })
    var users=[];
    for(let i=0; i<campInfo.length; i++){
        users.push(campInfo[i].user);
    }
    // console.log(campInfo)
    // console.log(campInfo[0].rating)
    // console.log(campInfo[0].text)

    var fullRating=[];
    var fullText=[];    
    var fullName=[];    

    for(let i=0; i< users.length; i++){
    fullName.push((users[i].firstName+' '+users[i].lastName))    
    fullRating.push(campInfo[i].rating)
    fullText.push(campInfo[i].text)
    }
    // console.log(fullName)

    return(
        <>    
                <Container fluid>
                    <Row className="justify-content-center mb-0">
                      <Col key={'idx'} md="10" xl="8">
                        <Card className="shadow-0 border rounded-3 mt-5 mb-1">
                          <Card.Body>
                            <Row>
                              <Col md="12" lg="6" className="mb-4 mb-lg-0">
                                <Image
                                src={campInfo[0].camp.image}
                                fluid
                                className="w-100"
                              />                    
                              </Col>                                
                              <Col md="6" >
                                <Card.Title>{campInfo[0].camp.name}</Card.Title>
                                <hr/>
                                <Card.Subtitle><strong>Location: </strong>{campInfo[0].camp.location}</Card.Subtitle>
                                <br/>
                                <Card.Subtitle><strong>Features: </strong></Card.Subtitle>{campInfo[0].camp.features}
                                <br/><br/>
                                <Card.Subtitle><strong>Price: </strong>CAD$ {campInfo[0].camp.price} per night</Card.Subtitle>
                              </Col>                
                            </Row>
                            <Row>
                            <Col className="justify-content-end mt-4">
                              <Button  href={`/campground/${campgroundId}`} variant="primary" size="sm">View Details</Button>                       
                              </Col>
                            </Row>
                            
                          </Card.Body>
                          <hr/>
                          <Card.Title className="text-center">Customer Reviews</Card.Title>
                          <Card.Body>
                            <Row  >
                            {fullName.map((fullName, idx)=> (
                                <Col md='12' key={idx} className='mt-3 ml-3'>
                                    <Card.Subtitle>
                                        {fullName} {Start(fullRating[idx])} {fullRating[idx]}/5</Card.Subtitle><Card.Text>{fullText[idx]}</Card.Text>
                                </Col>
                                ))}
                            </Row>
                          </Card.Body>
                          <Card.Body>
                                <Row className="m-2">                            
                                  <Form onSubmit={handleReviewSubmit}>
                                    <Form.Group controlId="formRating">
                                      <Form.Label>Rating:</Form.Label>
                                      <Form.Control type="number" name="rating" min="1" max="5" onChange={handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="formMessage">
                                      <Form.Label>Review:</Form.Label>
                                      <Form.Control as="textarea" rows={3} name="message" onChange={handleChange} required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                      Submit
                                    </Button>
                                  </Form>
                                </Row>
                              </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Footer/>
                </Container>   
            </>
    )
}

export default Review;