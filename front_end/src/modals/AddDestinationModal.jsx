import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import AutocompleteInput from "../MapsAndLocations/SearchBox";
import React, { useState } from "react";
import useMobile from "../components/UseMobile";
import PopupMessage from "./PopupMessage";
import NewLocation from "./NeuLocation";
import useHandlePlaceSelect from "./useHandlePlaceSelect";

const AddDestinationModal = ({ show, onHide }) => {
  const isMobile = useMobile();
 

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [alertMessage, setAlertMessage] = useState({
    variant: "",
    message: "",
  });
  const handlePlaceSelect = useHandlePlaceSelect();

  const handleClose = () => {
    setSelectedPlace(null);
    setAlertMessage({ variant: "", message: "" });
    onHide();
  };

  const placeCheck = (place) => {
    
    setTimeout(() => {
      const check = handlePlaceSelect(place);
      if (!check) {
        setAlertMessage({
          variant: "danger",
          message: ` יש לך כבר את היעד ${place.name} `,
        });
      } else {
        setSelectedPlace(place);
      }
    }, 0);
  };

  const handleInputChange = () => {
    setSelectedPlace(null);
    setAlertMessage({ variant: "", message: "" });
  };

  const handleLocationAdded = (result) => {
    if (result.success) {
      setAlertMessage({
        variant: "success",
        message: "היעד נוסף בהצלחה",
      });
      // refreshUserData()
      
      setSelectedPlace(null);
    } else {
      setAlertMessage({
        variant: "danger",
        message: "הוספת היעד נכשלה",
      });
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement={isMobile ? "bottom" : "end"}
      style={{
        textAlign: "end",
        height: isMobile ? "90%" : "100%",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>הוסף יעד</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container fluid>
          <Row>
            <Col>
              <AutocompleteInput
                onPlaceSelect={placeCheck}
                onInputChange={handleInputChange}
                text=" חפש יעד"
              />
            </Col>
          </Row>
          <Row>
            <PopupMessage
           
              variant={alertMessage.variant}
              message={alertMessage.message}
            />
          </Row>
          {selectedPlace && (
            <NewLocation
              newPlace={selectedPlace}
              onLocationAdded={handleLocationAdded}
            />
          )}
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddDestinationModal;
