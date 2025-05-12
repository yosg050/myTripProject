import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import AutocompleteInput from "../MapsAndLocations/SearchBox";
import React, { useState } from "react";
import useMobile from "../components/UseMobile";
import PopupMessage from "./PopupMessage";
import NewLocation from "./NewLocation";
import { useUser } from "../connections/UserProfile";

const AddDestinationModal = ({ show, onHide }) => {
  const { userLocations, setUserLocations } = useUser();
  const isMobile = useMobile();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [alertMessage, setAlertMessage] = useState({
    id: 0,
    variant: "",
    message: "",
  });

  React.useEffect(() => {
    if (show) {
      setAlertMessage({ id: 0, variant: "", message: "" });
    }
  }, [show]);

  const handleClose = () => {
    setSelectedPlace(null);
    setAlertMessage({ id: 0, variant: "", message: "" });
    onHide();
  };

  console.log(userLocations);

  const placeCheck = (place) => {
    if (!place || !place.place_id) return;
    const check = userLocations.some(
      (location) => location.id === place.place_id
    );
    if (check) {
      setAlertMessage({
        id: Date.now(),
        variant: "danger",
        message: ` יש לך כבר את היעד ${place.name} `,
      });
    } else {
      setSelectedPlace(place);
    }
  };

  const handleInputChange = () => {
    setSelectedPlace(null);
  };

  const handleLocationAdded = (result) => {
    if (!result.success || !selectedPlace) return;
    const newPlace = result.updatedPlace
    try {
      const temporaryValue = {
        id: newPlace.place_id,
        address: newPlace.address || "",
        latitude: newPlace.latitude || 0,
        longitude: newPlace.longitude || 0,
        name: newPlace.name || "",
        notes: newPlace.notes || "",
        tripTypes: Array.isArray(newPlace.tripTypes)
          ? newPlace.tripTypes
          : [newPlace.tripTypes].filter(Boolean),
        visit: false,
        createdDate: Date.now(),
      };

      setAlertMessage({
        id: Date.now(),
        variant: "success",
        message: "היעד נוסף בהצלחה",
      });
      setUserLocations((prev) => [...prev, temporaryValue]);
      setSelectedPlace(null);
    } catch (error) {
      console.error("Error adding location:", error);
      setAlertMessage({
        id: Date.now(),
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
            {alertMessage.message && (
              <PopupMessage
                key={alertMessage.id}
                variant={alertMessage.variant}
                message={alertMessage.message}
              />
            )}
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
