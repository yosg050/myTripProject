import { Button, Col, Form, Row } from "react-bootstrap";
import { useUser } from "../connections/UserProfile";
import { useEffect, useState } from "react";
import addLocationToUser from "../services/postUserLocation";

const NewLocation = ({ newPlace, onLocationAdded }) => {
  const [arrayDbTypes, setArrayDbTypes] = useState([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState([]);
  const [notes, setNotes] = useState("");
  // const { userSettings, setUserLocations} = useUser();
  const { userSettingsTripTypes, setUserSettingsTripTypes } = useUser();

  // useEffect(() => {
  //   if (
  //     userSettings?.userSettings?.typesOfTrips &&
  //     Array.isArray(userSettings.userSettings.typesOfTrips) &&
  //     userSettings.userSettings.typesOfTrips.length > 0
  //   ) {
  //     console.log(userSettings.userSettings.typesOfTrips);
  //     setArrayDbTypes(userSettings.userSettings.typesOfTrips);
  //   }
  // }, [userSettings]);

  const handleTripTypeChange = (tripType, isChecked) => {
    if (isChecked) {
      setSelectedTripTypes((prev) => [...prev, tripType]);
    }
    // else {
    //   setSelectedTripTypes((prev) => prev.filter((type) => type !== tripType));
    // }
  };

  const handleAddLocation = async () => {
    const updatedPlace = {
      ...newPlace,
      tripTypes: selectedTripTypes,
      notes: notes,
    };
    console.log(updatedPlace);
    const result = await addLocationToUser(updatedPlace);
    if (result.success) {
      onLocationAdded?.({ success: true });
      setUserSettingsTripTypes((prevLocations) => [
        ...prevLocations,
        updatedPlace,
      ]);
    } else {
      onLocationAdded?.({ success: false });
    }
  };

  return (
    <Row className="mt-3">
      <Col>
        <Form>
          <div
            style={{
              padding: "3px",
              borderRadius: "10px",
              backgroundColor: "#05FFD7",
            }}
          >
            <p style={{ fontWeight: "bold", textAlign: "center" }}>יעד נבחר</p>
            <p
              style={{
                lineHeight: "1",
                marginRight: "10%",
                textAlign: "right",
              }}
            >
              {" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                שם:{" "}
              </span>{" "}
              {newPlace.name}
            </p>
            <p
              style={{
                lineHeight: "1",
                marginRight: "10%",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                כתובת:{" "}
              </span>{" "}
              {newPlace.address}
            </p>
          </div>
          <p
            style={{
              fontWeight: "bold",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            סיווג הטיול
            <br /> (התאם את הטיול אישית)
          </p>
          <Row className="justify-content-center mb-3">
            <Col
              xs={10}
              style={{
                maxHeight: "30vh",
                overflowY: "auto",
                width: "40%",
              }}
            >
              {
                userSettingsTripTypes.length > 0 &&
                userSettingsTripTypes.map((tripType) => (
                  <Form.Check
                    key={tripType}
                    type="switch"
                    id={`trip-type-${tripType}`}
                    label={tripType}
                    checked={selectedTripTypes.includes(tripType)}
                    onChange={(e) =>
                      handleTripTypeChange(tripType, e.target.checked)
                    }
                  />
                ))}
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="input"
              rows={3}
              placeholder="הערות"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ direction: "rtl", marginTop: "20px" }}
            />
          </Form.Group>
        </Form>
        <Row>
          <Col xs={6} style={{ marginTop: "15px" }}>
            <Button variant="primary" onClick={handleAddLocation}>
              הוסף יעד
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default NewLocation;
