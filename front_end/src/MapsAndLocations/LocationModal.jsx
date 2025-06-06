import React, { useState, useCallback } from "react";
import {
  Modal,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import { Pin, Star, StarFill, StarHalf, Trash3 } from "react-bootstrap-icons";
import LocationImage from "./LocationImage";
import Navigation from "./Navigation";
import Sharing from "../sharing/Sharing";
import { useUser } from "../connections/UserProfile";
import UserLocations from "../services/userLocations";

function LocationModal({ show, handleClose, location }) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { userSettingsSelectedPlaces, setUserLocations } = useUser();

  const handleDelete = async (location) => {
    console.log("location", location);

    setDeleting(true);
    const response = await UserLocations("DELETE", location);
    if (response.success) {
      setUserLocations((locations) =>
        locations.filter((loc) => loc.id !== location.id)
      );
      handleClose();
      setDeleting(false);
    } else {
      console.log(response.message);
      setDeleting(false);
    }
  };


  if (!location) return null;
  const visitedStatus = async () => {
    setUpdating(true);
    if (!location.visit) {

      const data = { locationID: location.id, updatedFields: { visit: true } };
      const response = await UserLocations("PATCH", data);
      if (response.success) {
        setUserLocations((locations) =>
          locations.map((loc) =>
            loc.id === location.id ? { ...loc, visit: true } : loc
          )
        );
        location.visit = true;
        setUpdating(false);
      }
    } else {
      const data = { locationID: location.id, updatedFields: { visit: false } };
      const response = await UserLocations("PATCH", data);
      if (response.success) {
        setUserLocations((locations) =>
          locations.map((loc) =>
            loc.id === location.id ? { ...loc, visit: false } : loc
          )
        );
        location.visit = false;
        setUpdating(false);
      }
    }
    console.log(location.visit);
  };

  const englishToHebrew = (type) => {
    if (userSettingsSelectedPlaces) {
      const place = userSettingsSelectedPlaces.find(
        (place) => place.english === type
      );
      if (place) {
        return place.hebrew;
      }
    }
    return type;
  };


  return (

    <Modal
      show={show}
      onHide={handleClose}
      centered
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Modal.Header
        style={{
          backgroundColor: location.visit ? "#e6ffe6" : "#ffe6e6",
          padding: "4px 15px",
        }}
        closeButton
      >
        <span
          style={{
            color: location.visit ? "green" : "red",
            padding: "2px 6px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          {location.visit ? "ביקרתי" : "לא ביקרתי"}
        </span>
      </Modal.Header>

      <Modal.Body style={{ direction: "rtl", alignItems: "center" }}>
        <Col>
          <Modal.Title
            style={{
              fontSize: "1em",
              fontWeight: "bold",
              marginBottom: "3%",
            }}
          >
            {location.name}
          </Modal.Title>
          {(location.durationText || location.distanceText) && (
            <Row
              style={{
                fontSize: "0.8em",
                backgroundColor: "#ffefef",
                padding: "2px 6px",
                justifyContent: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {location.transportMode
                ? location.transportMode
                  .replace("bicycling", "רכיבה באופניים: ")
                  .replace("transit", "תחבורה ציבורית: ")
                  .replace("walking", "הליכה: ")
                  .replace("driving", "נהיגה: ")
                : location.transportMode}
              {location.durationText
                ? location.durationText
                  .replace("mins", "דק'")
                  .replace("min", "דק'")
                  .replace("hours", "שע' ו-")
                  .replace("hour", "שע' ו-")
                : location.durationText}
              {location.durationText && location.distanceText && " • "}
              {location.distanceText &&
                `מרחק: ${location.distanceText.replace("km", 'ק"מ')}`}
            </Row>
          )}
        </Col>

        <Row>
          <Col style={{ textAlign: "right", lineHeight: "1" }}>
            <Row>
              <p>
                <strong>כתובת:</strong> {location.address}
              </p>
            </Row>
            <Row>
              <p>
                <strong>הערות:</strong> {location.notes || "אין הערות"}
              </p>
            </Row>
            <Row>
              <p>
                <strong>קטגוריה:</strong>{" "}
                {location.tripTypes && location.tripTypes.length > 0
                  ? location.tripTypes.join(", ")
                  : "כללי"}
              </p>
            </Row>
            {location.placesAround && (
              <Row
              // style={{ border: "2px solid #ffe0ef", borderRadius: '5px'}}
              >
                <Modal.Title
                  style={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    backgroundColor: "#ffefef",
                    textAlign: "center",
                  }}
                >
                  מקומות עניין בסביבה:
                </Modal.Title>
                {Object.keys(location.placesAround).map((placeType) => (
                  <Row
                    key={placeType}
                    style={{
                      maxHeight: "30vh",
                      overflow: "auto",
                      scrollbarWidth: "none",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ul>
                      {location.placesAround[placeType].map(
                        (place, index) => (
                          <Card
                            key={index}
                            style={{ marginTop: "3px", marginRight: "3%" }}
                          >
                            <Modal.Title
                              style={{
                                fontSize: "0.8em",
                                lineHeight: "1",
                                margin: "1px",
                                padding: "1px",
                                marginRight: "3%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <strong
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1em",
                                }}
                              >
                                {place.name}
                              </strong>
                              <strong
                                style={{
                                  fontSize: "1em",
                                  color: "#4D4931",
                                  backgroundColor: "#ffefef",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  marginLeft: "1px",
                                }}
                              >
                                {englishToHebrew(place.type)}
                              </strong>
                            </Modal.Title>
                            {place.rating && (
                              <Modal.Title
                                style={{
                                  fontSize: "0.8em",
                                  lineHeight: "1",
                                  margin: "1px",
                                  padding: "1px",
                                  direction: "rtl",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "1em",
                                  marginRight: "3%",
                                }}
                              >
                                <strong>דירוג: </strong>
                                {place.rating}{" "}
                                {[...Array(5)].map((_, index) => {
                                  const starIndex = 4 - index;
                                  if (starIndex < Math.floor(place.rating)) {
                                    return (
                                      <StarFill
                                        key={starIndex}
                                        size="1em"
                                        color="#F6A965"
                                        style={{ verticalAlign: "top" }}
                                      />
                                    );
                                  } else if (
                                    place.rating % 1 !== 0 &&
                                    starIndex < Math.ceil(place.rating)
                                  ) {
                                    return (
                                      <StarHalf
                                        key={starIndex}
                                        size="1em"
                                        color="#F6A965"
                                        style={{ verticalAlign: "top" }}
                                      />
                                    );
                                  } else {
                                    return (
                                      <Star
                                        key={starIndex}
                                        size="1em"
                                        color="#F6A965"
                                        style={{ verticalAlign: "top" }}
                                      />
                                    );
                                  }
                                })}
                              </Modal.Title>
                            )}

                            <Modal.Title
                              style={{
                                fontSize: "0.8em",
                                lineHeight: "1",
                                margin: "1px",
                                padding: "1px",
                                marginRight: "3%",
                              }}
                            >
                              {place.openNow ? "פתוח" : "סגור"} עכשיו
                            </Modal.Title>
                          </Card>
                        )
                      )}
                    </ul>
                  </Row>
                ))}
              </Row>
            )}
          </Col>

          <Col>
            <LocationImage
              location={location}
            // user={user}
            // onImageUpload={handleImageUpload}
            />
          </Col>
        </Row>
        {location.nearbyPlaces && location.nearbyPlaces.length > 0 && (
          <>
            <h5>מקומות קרובים:</h5>
            <ListGroup>
              {location.nearbyPlaces.map((place, index) => (
                <ListGroup.Item key={index}>
                  {place.name} - {place.type}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Modal.Body>

      <Modal.Footer style={{ justifyContent: "center" }}>
        <Navigation location={location} />
        <Sharing location={location} />
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>מחק מיקום</Tooltip>}
        >
          <Button
            variant="outline-danger"
            onClick={(e) => handleDelete(location)}
            disabled={deleting}
          >
            {deleting ? "מוחק..." : <Trash3 />}
          </Button>
        </OverlayTrigger>

        {!location.visit && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>ביקרתי פה</Tooltip>}
          >
            <Button
              variant="outline-success"
              onClick={visitedStatus}
            // disabled={updating}
            >
              {updating ? "מעדכן..." : <Pin />}
            </Button>
          </OverlayTrigger>
        )}

        {location.visit && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>עדיין לא ביקרתי פה </Tooltip>}
          >
            <Button
              variant="outline-danger"
              onClick={visitedStatus}
            // disabled={updating}
            >
              {updating ? "מעדכן..." : <Pin />}
            </Button>
          </OverlayTrigger>
        )}
      </Modal.Footer>
    </Modal>

  );
}

export default LocationModal;
