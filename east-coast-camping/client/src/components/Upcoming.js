import React from "react";
import { 
  Container,
  Row,
  Col,
  Card,
  Image,
  Button 
} from 'react-bootstrap';
import "../styles/Upcoming.css";

export default function Upcoming() {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center mb-0">
          <Col md="12" xl="10">
            <Card className="shadow-0 border rounded-3 mt-5 mb-3">
              <Card.Body>
                <Row>
                  <Col md="12" lg="3" className="mb-4 mb-lg-0">
                      <Image
                        src="https://images.unsplash.com/photo-1627664819818-e147d6221422?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1988&q=80"
                        fluid
                        className="w-100"
                      />
                  </Col>
                  <Col md="6">
                    <Card.Title>Camper</Card.Title>                    
                    <Card.Text >
                      There are many variations of passages of Lorem Ipsum 
                      available, but the majority have suffered alteration in some
                      form, by injected humour, or randomised words which don't
                      look even slightly believable.
                    </Card.Text>
                  </Col>
                  <Col
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">$500</h4>                              
                    </div>
                    <h6 className="text-success">5 Nights</h6>
                    <div className="d-flex flex-column mt-4">
                      <Button color="primary" size="sm">
                        Details
                      </Button>
                      <Button outline color="primary" size="sm" className="mt-2">
                        Review
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>       
    </>
  );
}
