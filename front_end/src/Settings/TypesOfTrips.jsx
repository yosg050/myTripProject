import { useEffect, useState } from "react";
import { useUser } from "../connections/UserProfile";
import { Button, Card, Form, InputGroup, Modal } from "react-bootstrap";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { Trash3 } from "react-bootstrap-icons";
import postUserSettings from "../services/postUserSettings";

const TripTypes = () => {
  const [customTripTypes, setCustomTripTypes] = useState([]);
  const { userSettings, setUserSettings } = useUser();
  const [newTripType, setNewTripType] = useState("");
  console.log(userSettings);

  useEffect(() => {
    if (
      userSettings?.userSettings?.typesOfTrips &&
      Array.isArray(userSettings.userSettings.typesOfTrips) &&
      userSettings.userSettings.typesOfTrips.length > 0
    ) {
      console.log(userSettings.userSettings.typesOfTrips);
      setCustomTripTypes(userSettings.userSettings.typesOfTrips);
    }
  }, [userSettings]);

  const addNewType = async() => {
    const result = await postUserSettings(newTripType, "typesOfTrips");
    if (result.success){
      setUserSettings((prevSettings) => ({
        ...prevSettings,
        typesOfTrips: [
          ...prevSettings.userSettings.typesOfTrips,
          newTripType   //.trim(),
        ],
      }));
      setCustomTripTypes((prevTypes) => [...prevTypes, newTripType]);
      setNewTripType("")

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
        <p style={{ fontWeight: "bold", fontSize: "1.5em", lineHeight: "1" }}>
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
          direction: "rtl",
          flexDirection: "column ",
          alignItems: "center",
        }}
      >
        {customTripTypes.map((tripType) => (
          <Card
            key={tripType}
            style={{
              width: "150px",
              margin: "5px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <span>{tripType}</span>
            <Button
              variant="link"
              // onClick={removeType(tripType)}
              style={{ color: "red" }}
            >
              <Trash3 />
            </Button>
          </Card>
        ))}
        <InputGroup style={{ width: "300px", margin: "5px" }}>
          <Form.Control
            placeholder="הוספת קטגוריה חדשה"
            value={newTripType}
            onChange={(e) => setNewTripType(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            onClick={addNewType}
            disabled={!newTripType.trim()} // כפתור נלחץ רק אם יש ערך
          >
            הוסף
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default TripTypes;
