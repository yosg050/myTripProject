import React, { useEffect, useState } from "react";
import {
  Button,
  ListGroup,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Send, Share } from "react-bootstrap-icons";
import { useAuth } from "../connections/AuthContext";
import { useUserProfile } from "../connections/GetUserDate";
import searchUsers from "./searchUsers";

const Sharing = ({ location }) => {
  console.log("sharing: ", location);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const { user } = useAuth();
  const { userData: userProfileData } = useUserProfile();

  const usersSend = [];
  const sharingStart = () => {
    let sharingUserName = " ";
    if (userProfileData.firstName && userProfileData.lastName) {
      sharingUserName = `${userProfileData.firstName} ${userProfileData.lastName}`;
    } else if (userProfileData.firstName) {
      sharingUserName = userProfileData.firstName;
    } else if (userProfileData.lastName) {
      sharingUserName = userProfileData.lastName;
    } else {
      sharingUserName = user.email;
    }

    console.log(sharingUserName);
  };

  const handleDelete = () => {
    // console.log(location);
    sharingStart();
    handleShow();
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim()) {
      const users = await searchUsers(value);
      setResults(users);
      console.log(users);
    } else {
      setResults([]);
    }
  };

  const userSharing = (user, usersSend) => {
    usersSend.push(user);
    console.log(usersSend[0].firstName);
    setResults([]);

    // console.log(selectedUser, location );
    // return <div style={{backgroundColor: '#F5F5F5' }}>
    //   {selectedUser. firstName } {selectedUser.lastName} <br />
    //   {selectedUser.email}
    // </div>
  };

  return (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>שתף</Tooltip>}>
        <Button variant="outline-warning" onClick={handleDelete}>
          <Share />
        </Button>
      </OverlayTrigger>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ direction: "rtl", textAlign: "center" }}>
            את מי לשתף בטיול שלי?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="שתף עם..."
            style={{
              width: "250px",
              padding: "8px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              textAlign: "right",
              direction: "rtl",
              borderColor: "#0d6efd",
              marginLeft: "20%",
            }}
          />
          {usersSend.length > 0 && (
            <div>
              {usersSend.map((user, index) => (
                <div key={index}>
                  {" "}
                  {user.firstName} {user.lastName}{" "}
                </div>
              ))}
            </div>
          )}
          {results.length > 0 && (
            <ListGroup
              style={{
                position: "absolute",
                zIndex: 1000,
                width: "250px",
                backgroundColor: "white",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                marginLeft: "19%",
              }}
            >
              {results.map((user, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => userSharing(user, usersSend)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    textAlign: "right",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#38a169")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  {user.firstName} {user.lastName} <br /> {user.email}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            <Send />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Sharing;

// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   ListGroup,
//   Modal,
//   OverlayTrigger,
//   Tooltip,
// } from "react-bootstrap";
// import { Send, Share } from "react-bootstrap-icons";
// import { useAuth } from "../connections/AuthContext";
// import { useUserProfile } from "../connections/GetUserDate";
// import searchUsers from "./searchUsers";

// const Sharing = ({ location }) => {
//   // console.log("sharing: ", location);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [searchValue, setSearchValue] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const { user } = useAuth();
//   const { userData: userProfileData } = useUserProfile();

//   const sharingStart = () => {
//     let sharingUserName = " ";
//     if (userProfileData.firstName && userProfileData.lastName) {
//       sharingUserName = `${userProfileData.firstName} ${userProfileData.lastName}`;
//     } else if (userProfileData.firstName) {
//       sharingUserName = userProfileData.firstName;
//     } else if (userProfileData.lastName) {
//       sharingUserName = userProfileData.lastName;
//     } else {
//       sharingUserName = user.email;
//     }

//     // console.log(sharingUserName);
//   };

//   const handleDelete = () => {
//     console.log(location);
//     sharingStart();
//     handleShow();
//   };

//   const handleSearch = async (event) => {
//     const value = event.target.value;
//     setSearchValue(value);

//     if (value.trim()) {
//       const users = await searchUsers(value);
//       setResults(users);
//       console.log(users);
//     } else {
//       setResults([]);
//     }
//   };

//   const userSharing = (selectUser) => {
//     setSelectedUser(user);
//     setResults([]);

//     // console.log(selectUser, location );
//     // return <div style={{backgroundColor: '#F5F5F5' }}>
//     //   {selectUser. firstName } {selectUser.lastName} <br />
//     //   {selectUser.email}
//     // </div>
//   };

//   return (
//     <>
//       <OverlayTrigger placement="bottom" overlay={<Tooltip>שתף</Tooltip>}>
//         <Button variant="outline-warning" onClick={handleDelete}>
//           <Share />
//         </Button>
//       </OverlayTrigger>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title style={{ direction: "rtl", textAlign: "center" }}>
//             את מי לשתף בטיול שלי?
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div
//             style={{
//               marginLeft: "20%",
//               position: "relative",
//             }}
//           >
//             <div
//               style={{
//                 position: "relative",
//                 display: "inline-block",
//                 width: "100%",
//                 direction: "rtl",
//                 textAlign: "right",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder={!selectedUser ? "שתף עם..." : ""}
//                 value={selectedUser ? "" : searchValue}
//                 onChange={handleSearch}
//                 style={{
//                   width: "250px",
//                   padding: selectedUser ? "8px 100px 8px 8px" : "8px",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "8px",
//                   textAlign: "right",
//                   direction: "rtl",
//                   // borderColor: "#0d6efd",
//                   // marginLeft: "20%",
//                 }}
//                 readOnly={!!selectedUser}
//               />
//               {selectedUser && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     right: "10px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     display: "flex",
//                     alignItems: "center",
//                     backgroundColor: "#f8f9fa",
//                     border: "1px solid #ddd",
//                     borderRadius: "16px",
//                     padding: "4px 8px",
//                     gap: "4px",
//                   }}
//                 >
//                   {" "}
//                   <span style={{ fontWeight: "bold", clear: "#e74c3c" }}>
//                     {selectedUser.firstName} {searchUsers.lastName}
//                   </span>
//                   <button
//                     onClick={() => setSelectedUser(null)}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     ✖
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {results.length > 0 && (
//             <ListGroup
//               style={{
//                 position: "absolute",
//                 zIndex: 1000,
//                 width: "250px",
//                 backgroundColor: "white",
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                 marginLeft: "19%",
//               }}
//             >
//               {results.map((user, index) => (
//                 <ListGroup.Item
//                   key={index}
//                   onClick={() => userSharing(user)}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                     textAlign: "right",
//                     transition: "background-color 0.3s ease",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.backgroundColor = "#38a169")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.backgroundColor = "white")
//                   }
//                 >
//                   {user.firstName} {user.lastName} <br /> {user.email}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleClose}>
//             <Send />
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };
// export default Sharing;
