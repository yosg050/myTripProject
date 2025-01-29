import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import TripTypes from "./TypesOfTrips";
import UserStatus from "./userStatus";
import ContactInformation from "./ContactInformation";
import Info from "./Info";

function Settings({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          הגדרות
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ height: "80vh", overflowY: "auto", direction: "rtl" }}
      >
        <Tabs
          defaultActiveKey="משתמש"
          id="fill-tab-example"
          className="mb-3"
          fill
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Tab eventKey="משתמש" title="משתמש">
            <UserStatus />
          </Tab>
          <Tab eventKey="התאמה" title="התאמה">
            <TripTypes />
          </Tab>
          <Tab eventKey="הסבר" title="הסבר">
            <Info />
          </Tab>
          <Tab eventKey="יצירת קשר" title="יצירת קשר">
            <ContactInformation />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default Settings;
