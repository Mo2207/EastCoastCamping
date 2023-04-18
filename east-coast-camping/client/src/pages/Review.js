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
    const [ validated, setValidated] = useState(false);
    const [ formData, setFormData ] = useState({ message:'', rating:''});

    const campgroundId = location.pathname.split('/').pop();
    const [ createReview, { error1 , data1}] = useMutation(CREATE_REVIEW);


  const handleReviewSubmit = async (event) => {
      event.preventDefault();
      // console.log(formData)
      
           console.log(id, campgroundId, formData.message, formData.rating )
          const {createData} = createReview({
            variables: {
              userId: id,
              campId: campgroundId,
              rating: formData.rating,
              text: formData.message
            }            
           })
  }

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
        return <p>Loading...</p>;
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
                              <Form onSubmit={handleReviewSubmit} >
                              {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                                                Please add proper information
                                            </Alert> */}
                              {!Auth.loggedIn()?( 
                                <Form.Group controlId="formBasicEmail">                                  
                                    <Row>                                    
                                      <Col>                                        
                                        <Form.Text className="text-muted">
                                        <p className="mb-5 pb-lg-2 text-center" style={{ color: '#393f81' }}>Inorder to share your experience, youw will need to <Link to={{pathname: '/login'}} style={{ color: '#393f81' }}>sign in</Link> to continue.Don't have an account? <Link href="/register" style={{ color: '#393f81' }}>Register here</Link></p>
                                        </Form.Text>                                 
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                      ):(
                                      <>
                                        <Form.Group>
                                          <Row>
                                            <Col md='9'>
                                            <Form.Label>Please share your experience</Form.Label>
                                              <Form.Control 
                                                type="message" 
                                                placeholder="Write your review here" 
                                                name='message'
                                                onChange={handleChange}
                                                value={formData.message}
                                                required
                                                />
                                            </Col>
                                            <Col md='3'>
                                              <Form.Label>Please rate us</Form.Label>
                                                <Form.Control 
                                                type='number'
                                                min ='1'
                                                max = '5'
                                                step = '0.1'
                                                name='rating'
                                                onChange={handleChange}
                                                value={formData.rating}
                                                required
                                                />
                                            </Col>  
                                          </Row>
                                        </Form.Group>
                                        <Form.Control.Feedback type='invalid'>Please key in the value from 1 to 5</Form.Control.Feedback>
                                        <Form.Group className="mt-1">                                          
                                          <Button variant="primary" type="submit" >
                                            Submit
                                          </Button>
                                        </Form.Group>
                                      </>
                                      )}
                                      {error1 && (
                                            <div className="my-3 p-3 bg-danger text-white">
                                                {error.message}
                                            </div>
                                        )}
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