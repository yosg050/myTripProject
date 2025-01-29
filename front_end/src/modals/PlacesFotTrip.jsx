import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { PlacesTypes } from "../services/placesTypes";


const PlacesFotTrip = ({ onMyPlacesChange }) => {
  const [filterText, setFilterText] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);

  const [myPlaces, setMyPlaces] = useState([]);

  const handleFilter = async (text) => {
    setFilterText(text);

    const filtered = await PlacesTypes(text);
    setFilteredValues(filtered);
  };

  const addPlace = (index) => {
    if (myPlaces.some((obj) => obj._id === index._id)) {
      setFilterText("");
      setFilteredValues([]);
      // console.log("updatedPlaces", myPlaces);
      return;
    } else {
      const updatedPlaces = [...myPlaces, index];
      setMyPlaces(updatedPlaces);
      onMyPlacesChange(updatedPlaces)
      // console.log("updatedPlaces", myPlaces);
      console.log("updatedPlaces", updatedPlaces);
    }
    setFilterText("");
    setFilteredValues([]);

  };

  useEffect(() => {}, [myPlaces]);

  const deletePlace = (place) => {
    const updatedPlaces = myPlaces.filter((item) => item !== place);
    setMyPlaces(updatedPlaces);
    onMyPlacesChange(updatedPlaces);
  };

  return (
    <div>
      <input
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          textAlign: "right",
          // direction: "rtl",
          borderColor: "#0d6efd",
        }}
        type="text"
        placeholder="הוסף מקומות עניין"
        value={filterText}
        onChange={(e) => handleFilter(e.target.value)}
      />
      {filteredValues.length > 0 && filterText.length > 0 && (
        <ListGroup
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "73%",
            maxWidth: "400px",
            backgroundColor: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {filteredValues.map((place, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => addPlace(place)}
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
              {place.hebrew}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          direction: "rtl",
        }}
      >
        {myPlaces.length > 0 &&
          myPlaces.map((places) => (
            <Card
              key={places._id}
              style={{
                margin: "5px",
                flexDirection: "row",
                paddingRight: "5px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "15px" }}>{places.hebrew}</span>
              <Button
                variant="outline-light"
                style={{
                  color: "red",
                  padding: "0px",
                  width: "20px",
                }}
                onClick={() => deletePlace(places)}
              >
                X
              </Button>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default PlacesFotTrip;
