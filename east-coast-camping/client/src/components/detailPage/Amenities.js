import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Amenities = () => {

    return (
        <Container className='mt-5'>
            <Row>
                <Col className='border-end mr-4'>
                    <h4 className='mb-4 pl-5'>Amenities</h4>

                    <Row>
                        <Col>
                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232451209-595962db-d967-4f1e-991e-e855fe36eb11.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Double-bed</p>

                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232452753-e2029afc-32d2-409b-be82-d9fe88677f70.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Picnic tables</p>
                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232453013-b68155c1-847f-46de-bf9e-eb983e303489.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Air conditioner</p>

                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232453323-6b50670e-d1bf-4b44-9b3e-bf8a2ce55005.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Fire pit</p>
                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232456727-f0721b53-9a25-47b0-861a-4c62159f8a57.jpg"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Bicycle on request</p>
                        </Col>
                        <Col>
                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232453629-676c5e63-2459-4b92-a16c-315d3b7e7179.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Fishing</p>

                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232453648-f26415d1-b86b-4e91-9fcf-43a8c198e09c.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Hiking</p>

                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232453663-77778c91-a124-4a1d-9016-d7270cb12cf0.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                playground</p>

                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232454142-21dd41c7-96cb-4d4f-83ea-931b2c7c64d6.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Camp store</p>

                            <p><img
                                src="https://user-images.githubusercontent.com/112873819/232454151-b06bb398-8e09-4540-bcc9-c521fd99044c.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top mr-2 mt-2"
                                alt="icon"
                            />
                                Toilets</p>
                        </Col>
                    </Row>

                </Col>

                <Col>
                    <h4>Campsite rules</h4>
                    <ul>
                        <li>Campsite is opened for vehicle and reception is opened always from 8:00 till 20:00.</li>
                        <li>The earliest check in time is 08:00 and latest check out time is 11:30.</li>
                        <li>All roads in the camp site must remain free.</li>
                        <li>Emptying chemical toilets is allowed only on designated place</li>
                        <li>Guests should keep their pitch area clear and tidy.</li>
                        <li>Quiet hours are from 14:00 till 16:t00 afternoon and from 22:00 till 7:00.</li>
                        <li>Use of electric stoves, and heating is not allowed and can result in power shut down.</li>
                        <li>Smoking inside caravan/rented tents/cabins is strictly forbidden ...</li>
                    </ul>
                </Col>

            </Row>
        </Container >

    )


}



export default Amenities;