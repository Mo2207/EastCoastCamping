import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import Tab from 'react-bootstrap/Tab';

import "../styles/Upcoming.css";

export default function Upcoming() {
  return (
    <>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center mb-0">
          <MDBCol md="12" xl="10">
            <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    >
                      <MDBCardImage
                        src="https://images.unsplash.com/photo-1627664819818-e147d6221422?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1988&q=80"
                        fluid
                        className="w-100"
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        ></div>
                      </a>
                    </MDBRipple>
                  </MDBCol>
                  <MDBCol md="6">
                    <h5>Camper</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                      <span>310</span>
                    </div>
                    <div className="mt-1 mb-0 text-muted small">
                      <span>Electricity</span>
                      <span className="text-primary"> • </span>
                      <span>Camp Fire</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Portable Water
                        <br />
                      </span>
                    </div>
                    <div className="mb-2 text-muted small">
                      <span>Near Water</span>
                      <span className="text-primary"> • </span>
                      <span>For Family</span>
                      <span className="text-primary"> • </span>
                      <span>
                        No Wifi
                        <br />
                      </span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in some
                      form, by injected humour, or randomised words which don't
                      look even slightly believable.
                    </p>
                  </MDBCol>
                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">$500</h4>                              
                    </div>
                    <h6 className="text-success">5 Nights</h6>
                    <div className="d-flex flex-column mt-4">
                      <MDBBtn color="primary" size="sm">
                        Details
                      </MDBBtn>
                      <MDBBtn outline color="primary" size="sm" className="mt-2">
                        Review
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>       
    </>
  );
}
