import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useUser } from "../connections/UserProfile";
import UserDetails from "../services/userDetails";
import PopupMessage from "../modals/PopupMessage";
import UserSettings from "../services/userSettings";

function UserStatus() {
  const [children, setChildren] = useState([]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
  });

  const {
    userDetails,
    setUserDetails,
    userSettingsChildren,
    setUserSettingsChildren,
  } = useUser();
  const [alertMessage, setAlertMessage] = useState({
    id: 0,
    variant: "",
    message: "",
  });

  useEffect(() => {
    setUserData({
      firstName: userDetails.userData.firstName || "",
      lastName: userDetails.userData.lastName || "",
      birthDate: userDetails.userData.birthDate || "",
      gender: userDetails.userData.gender || "",
      maritalStatus: userDetails.userData.maritalStatus || "",
    });

    setChildren(userSettingsChildren || []);
  }, [userDetails, userSettingsChildren]);

  const addChild = () => {
    setChildren([...children, { name: "", birthDate: "" }]);
  };

  const updateChild = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const saveToDB = async () => {
    console.log(userData);
    console.log(userDetails.userData);

    const updatedFields = {};
    for (let key in userData) {
      if (
        userData[key] !== userDetails.userData[key] &&
        !(userData[key] === "" && userDetails.userData[key] === null)
      ) {
        updatedFields[key] = userData[key];
      }
    }

    // const updatedFieldsChild = [];

    let childChanged = false;
    if (children.length !== userSettingsChildren.length) {
      childChanged = true;
    } else {
      for (let key in children) {
        const child = children[key];
        const childUser = userSettingsChildren[key];
        if (child.name !== childUser.name) {
          childChanged = true;
          break;
        }
      }
    }//UserSettings( "POST" , newTripType, "typesOfTrips")

    if (childChanged) {
      
      const result = await UserSettings('PUT', children , "children");
      if (result.success == true){
        setUserSettingsChildren(() => [children])
      }
    }

    if (Object.keys(updatedFields).length > 0 ) {
      const result = await UserDetails("PUT", updatedFields);
      if (result.success == true) {
        console.log("result.success");

        const newUserDetails = {
          ...userDetails,
          userData: {
            ...userDetails.userData,
            ...updatedFields,
          },
        };

        setUserDetails(newUserDetails);

        setAlertMessage({
          id: Date.now(),
          variant: "success",
          message: "השינויים התעדכנו בהצלחה",
        });

        setUserData((prevUserData) => ({
          ...prevUserData,
          ...updatedFields,
        }));
      } else {
        setAlertMessage({
          id: Date.now(),
          variant: "danger",
          message: "העדכון נכשל",
        });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "65vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          flexGrow: 1,
          paddingBottom: "60px",
          paddingRight: "15px",
          paddingLeft: "15px",
          boxSizing: "border-box",
        }}
      >
        <Form>
          <Row>
            <Col lg={6} md={12} className="mb-3">
              <Form.Group controlId="formFirstName">
                <Form.Label>שם פרטי</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="שם פרטי"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6} md={12} className="mb-3">
              <Form.Group controlId="formLastName">
                <Form.Label>שם משפחה</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="שם משפחה"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={12} className="mb-3">
              <Form.Group controlId="formBirthDate">
                <Form.Label>תאריך לידה</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={userData.birthDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col lg={4} md={12} className="mb-3">
              <Form.Group controlId="formGender">
                <Form.Label>מין</Form.Label>
                <Form.Select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    בחר
                  </option>
                  <option value="male">זכר</option>
                  <option value="female">נקבה</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col lg={4} md={12} className="mb-3">
              <Form.Group controlId="formMaritalStatus">
                <Form.Label>סטטוס משפחתי</Form.Label>
                <Form.Select
                  name="maritalStatus"
                  value={userData.maritalStatus}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    בחר
                  </option>
                  <option value="single">רווק/ה</option>
                  <option value="married">נשוי/אה</option>
                  <option value="divorced">גרוש/ה</option>
                  <option value="widowed">אלמן/ה</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* <Form.Group className="mb-3">
            <div style={{ justifyContent: "center" }}>
              <Button variant="outline-info" onClick={addChild} className="m-2">
                הוסף ילד
                <Plus />
              </Button>
            </div>
            {children.map((child, index) => (
              <div key={index} className="mb-2">
                <Row>
                  <Col lg={6} md={12} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="שם הילד"
                      value={child.name}
                      onChange={(e) =>
                        updateChild(index, "name", e.target.value)
                      }
                      className="mb-1"
                    />
                  </Col>
                  <Col lg={6} md={12} className="mb-3">
                    <Form.Control
                      type="date"
                      value={child.birthDate}
                      onChange={(e) =>
                        updateChild(index, "birthDate", e.target.value)
                      }
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </Form.Group> */}
        </Form>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
          backgroundColor: "white",
          borderTop: "1px solid #dee2e6",
          textAlign: "center",
        }}
      >
        <Button onClick={saveToDB}>שמור שינויים</Button>
      </div>
      <PopupMessage
        key={alertMessage.id}
        variant={alertMessage.variant}
        message={alertMessage.message}
      />
    </div>
  );
}

export default UserStatus;
