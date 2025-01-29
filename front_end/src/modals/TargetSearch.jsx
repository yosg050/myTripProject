import React, { useState } from "react";
import {
  Offcanvas,
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import {
  Bicycle,
  BusFront,
  CarFront,
  PersonWalking,
} from "react-bootstrap-icons";
import useMobile from "../components/UseMobile";
import PlacesFotTrip from "./PlacesFotTrip";
import { useUser } from "../connections/UserProfile";

const TargetSearch = ({ show, onHide, onFilterChange }) => {
  const [selectedTripTypes, setSelectedTripTypes] = useState({});
  // const [availableTripTypes, setAvailableTripTypes] = useState([]);
  const [travelHours, setTravelHours] = useState(0);
  const [travelMinutes, setTravelMinutes] = useState(0);
  const [includeVisited, setIncludeVisited] = useState(false);
  const [transportMode, setTransportMode] = useState("driving");
  const [placesObjet, setPlacesObjet] = useState([]);
  const isMobile = useMobile();
  const {
    userSettingsTripTypes,
    loading,
    error,
    setUserSettingsSelectedPlaces,
  } = useUser();

  const handleTripTypeCheckboxChange = (tripType, isChecked) => {
    setSelectedTripTypes((prev) => ({ ...prev, [tripType]: isChecked }));
  };

  const handleMyPlacesChange = (updatedPlaces) => {
    setPlacesObjet(updatedPlaces);
    console.log("places 1: ", placesObjet);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedTypes = Object.entries(selectedTripTypes)
      .filter(([_, value]) => value === true)
      .reduce((acc, [key, _]) => ({ ...acc, [key]: true }), {});

    const totalTravelMinutes = travelHours * 60 + travelMinutes;

    const selectedPlacesForTrip = placesObjet.map((place) => place.english);
    // console.log("places 1: ", placesObjet);
    // console.log("places 2: ", selectedPlacesForTrip);

    setUserSettingsSelectedPlaces(placesObjet);
    const filterParams = {
      selectedPlacesForTrip,
      selectedTypes,
      totalTravelMinutes,
      includeVisited,
      transportMode,
    };

    console.log("TargetSearch: Submitting filter params:", filterParams);

    if (typeof onFilterChange === "function") {
      onFilterChange(filterParams);
    } else {
      console.error("onFilterChange is not a function");
    }

    handleClose();
  };

  const resetSettings = () => {
    setSelectedTripTypes({});
    setTravelHours(0);
    setTravelMinutes(0);
    setIncludeVisited(false);
    setTransportMode("driving");
    setPlacesObjet([]);
  };

  const handleClose = () => {
    resetSettings();
    onHide();
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת הנתונים</div>;

  const transportModes = [
    { value: "driving", label: <CarFront color="block" /> },
    { value: "walking", label: <PersonWalking color="block" /> },
    { value: "bicycling", label: <Bicycle color="block" /> },
    { value: "transit", label: <BusFront color="block" /> },
  ];

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
        <Offcanvas.Title>חיפוש יעד מתאים</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col xs={10}>
                <Form.Group controlId="formTravelTime">
                  <Form.Label style={{ direction: "rtl" }}>
                    זמן נסיעה מקסימלי:
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      value={travelHours}
                      onChange={(e) => setTravelHours(Number(e.target.value))}
                      min="0"
                      max="24"
                      color="bold"
                      style={{ borderColor: "#0d6efd" }}
                    />
                    <InputGroup.Text style={{ borderColor: "#0d6efd" }}>
                      :שעות
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      style={{ borderColor: "#0d6efd" }}
                      value={travelMinutes}
                      onChange={(e) => setTravelMinutes(Number(e.target.value))}
                      min="0"
                      max="59"
                    />
                    <InputGroup.Text style={{ borderColor: "#0d6efd" }}>
                      :דקות
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={10}>
                <Form.Group controlId="formTransportMode">
                  <Form.Label style={{ direction: "rtl" }}>
                    בחר סוג תחבורה:
                  </Form.Label>
                  <ButtonGroup className="d-flex">
                    {transportModes.map((mode) => (
                      <Button
                        key={mode.value}
                        variant={
                          transportMode === mode.value
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() => setTransportMode(mode.value)}
                      >
                        {mode.label}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col
                xs={10}
                style={{
                  fontWeight: "bold",
                  maxHeight: "30vh",
                  overflowY: "auto",
                  marginTop: "15px",
                }}
              >
                <Form.Check
                  type="switch"
                  id="include-visited-switch"
                  label="כלול יעדים שביקרתי בהם"
                  checked={includeVisited}
                  onChange={(e) => setIncludeVisited(e.target.checked)}
                />
              </Col>
            </Row>

            <Row style={{ marginTop: "20px", marginBottom: "40px" }}>
              <Col xs={10} style={{ maxHeight: "30vh", overflowY: "auto" }}>
                <PlacesFotTrip onMyPlacesChange={handleMyPlacesChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={10}>
                <p
                  style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  קטגוריה{" "}
                </p>
              </Col>

              <Col
                xs={10}
                style={{
                  maxHeight: "30vh",
                  overflowY: "auto",
                }}
              >
                {userSettingsTripTypes.map((tripType) => (
                  <Form.Check
                    key={tripType}
                    type="switch"
                    id={`trip-type-${tripType}`}
                    label={tripType}
                    checked={selectedTripTypes[tripType] || false}
                    onChange={(e) =>
                      handleTripTypeCheckboxChange(tripType, e.target.checked)
                    }
                  />
                ))}
                {userSettingsTripTypes.length === 0 && (
                  <p
                    style={{ backgroundColor: "#FFE6E6", borderRadius: "10px" }}
                  >
                    אין סוגי טיול זמינים. ניתן להוסיף העדפות בהגדרות.
                  </p>
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={6} style={{ marginTop: "15px" }}>
                <Button type="submit" variant="primary" className="w-100">
                  חפש
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TargetSearch;
