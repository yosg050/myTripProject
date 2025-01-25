import { useEffect, useState } from "react";
import { useUser } from "../connections/UserProfile";
import { Button, Card, Form, InputGroup, Modal } from "react-bootstrap";
// import { IoRemoveCircleOutline } from "react-icons/io5";
import { Trash3 } from "react-bootstrap-icons";
import UserSettings from "../services/userSettings";
import PopupMessage from "../modals/PopupMessage";

const TripTypes = () => {
  const { userSettingsTripTypes, setUserSettingsTripTypes } = useUser();
  const [newTripType, setNewTripType] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    id: 0,
    variant: "",
    message: "",
  });
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (newTripType) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [newTripType]);

  const addNewType = async () => {
    setButton(false);
    const isValue = userSettingsTripTypes.includes(newTripType);
    if (isValue) {
      setAlertMessage({
        id: Date.now(),
        variant: "danger",
        message: "ערך זה כבר קיים ברשימה",
      });
      setNewTripType("");
      return;
    }

    const result = await UserSettings( "PUT" , newTripType, "typesOfTrips");
    if (result.success) {
      setUserSettingsTripTypes((prevTypes) => [...prevTypes, newTripType]);
      setNewTripType("");
    }
  };

  const deleteTripType = async (tripType) => {
    setButton(false);
    const result = await UserSettings("DELETE" , tripType, "typesOfTrips" );
    if (result.success) {
      setUserSettingsTripTypes((prevTypes) =>
        prevTypes.filter((type) => type !== tripType)
      );
    } else {
      setAlertMessage({
        id: Date.now(),
        variant: "danger",
        message: "שגיאה",
      });
      setNewTripType("");
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "60vh",
        maxWidth: "100vw",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.5em",
            lineHeight: "1",
            maxHeight: "200px",
          }}
        >
          קטגוריות
        </p>
        <p style={{ fontSize: "1em", lineHeight: "1" }}>
          קטגוריות לסווג את הטיולים
          <br />
          (חברים, משפחה){" "}
        </p>
      </div>
      <div
        style={{
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Form style={{ width: "100%", maxWidth: "100px" }}></Form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // direction: "rtl",
          flexDirection: "column ",
          alignItems: "center",
        }}
      >
        {userSettingsTripTypes &&
          userSettingsTripTypes.length > 0 &&
          userSettingsTripTypes.map((tripType) => (
            <Card
              key={tripType}
              style={{
                width: "150px",
                margin: "5px",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingRight: "10px",
              }}
            >
              <span>{tripType}</span>
              <Button
                variant="link"
                style={{ color: "red" }}
                onClick={() => deleteTripType(tripType)}
              >
                <Trash3 />
              </Button>
            </Card>
          ))}
        <InputGroup style={{ width: "300px", margin: "5px", direction: "ltr" }}>
          <Button
            variant="outline-secondary"
            onClick={addNewType}
            disabled={!button}
          >
            הוסף
          </Button>
          <Form.Control
            placeholder="הוספת קטגוריה חדשה"
            value={newTripType}
            onChange={(e) => setNewTripType(e.target.value)}
          />
        </InputGroup>
        <PopupMessage
          key={alertMessage.id}
          variant={alertMessage.variant}
          message={alertMessage.message}
        />
      </div>
    </div>
  );
};

export default TripTypes;
