import React, { useState, useEffect, useCallback } from "react";
import MyMap from "../MapsAndLocations/MyMap";
import Button from "react-bootstrap/Button";
import {
  ArrowClockwise,
  CardList,
  Compass,
  Map,
  PinMap,
  PlusLg,
} from "react-bootstrap-icons";
import { ButtonGroup, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import LocationList from "../MapsAndLocations/LocationList";

import {
  filterLocationsUI,
  filterLocationsTarget,
} from "../modals/filterLocationsComponent";

import logoImage from "../assets/logo3.png";
import CenterManagement from "../MapsAndLocations/NewCenter";
import ProfileButton from "../Settings/ImegeButton";
import FilterUI from "../modals/FilterUI";
import { useCenter } from "../MapsAndLocations/useCenter";
import TargetSearch from "../modals/TargetSearch";
import { useUser } from "../connections/UserProfile";
import useMobile from "../components/UseMobile";
import AddDestinationModal from "../modals/AddDestinationModal";

const Home = () => {
  const isMobile = useMobile();
  const overlayTrigger = () => (isMobile ? "top" : "left");
  const [transportMode, setTransportMode] = useState(1);
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [showTargetSearch, setShowTargetSearch] = useState(false);
  const [showFilterUI, setShowFilterUI] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const [locationsFiltered, setLocationsFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const listLocations = "היעדים שלי";
  const choiceLocations = "בחירת יעד מתאים";
  const [title, setTitle] = useState(listLocations);

  const {
    userLocations,
    setUserLocations,
    loading: userDataLoading,
    error: userDataError,
  } = useUser();

  const {
    center,
    loading: centerLoading,
    error: centerError,
    getCurrentCenter,
    updateCenter,
  } = useCenter();

  const handleCenterChange = useCallback(
    (newCenter) => {
      console.log("New center:", newCenter);
      updateCenter(newCenter);
    },
    [updateCenter]
  );

  useEffect(() => {
    if (Array.isArray(userLocations) && userLocations.length > 0) {
      if (activeFilter === "Target") {
        setLoading(true);
        filterLocationsTarget(userLocations, { ...filterParams, center })
          .then((filteredResult) => {
            setLocationsFiltered(filteredResult);
          })
          .catch((error) => {
            console.error("Error in filterLocationsTarget:", error);
            setLocationsFiltered([]);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        const filteredResult = filterLocationsUI(userLocations, filterParams);
        setLocationsFiltered(filteredResult);
      }
    }
  }, [userLocations, activeFilter, filterParams, center]);

  useEffect(() => {}, [userLocations, locationsFiltered]);

  const reset = () => {
    setActiveFilter(null);
    setFilterParams({});
    setLocationsFiltered(userLocations);
    setTitle(listLocations);
  };

  const handleFilterUIChange = (params) => {
    setActiveFilter("UI");
    setFilterParams(params);
    setTitle(listLocations);
    const filteredResult = filterLocationsUI(userLocations, params);
    setLocationsFiltered(filteredResult);
  };

  const handleTargetSearchChange = (params) => {
    setActiveFilter("Target");
    setFilterParams(params);
    setTitle(choiceLocations);
  };

  const handleShowAddDestination = () => setShowAddDestination(true);
  const handleCloseAddDestination = () => setShowAddDestination(false);
  const handleShowTargetSearch = () => setShowTargetSearch(true);
  const handleCloseTargetSearch = () => setShowTargetSearch(false);
  const handleShowFilterUI = () => setShowFilterUI(true);
  const handleCloseFilterUI = () => setShowFilterUI(false);

  if (userDataLoading || centerLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner variant="primary" />
      </div>
    );
  if (userDataError) return <p>שגיאה בטעינת המידע: {userDataError.message}</p>;
  if (centerError) return <p>{centerError}</p>;

  const refreshButton = () => {
    window.location.reload();
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "3%",
            marginRight: "1%",
            marginBottom: "1px",
          }}
        >
          <ProfileButton />
          {!isMobile && (
            <CenterManagement
              onCenterChange={handleCenterChange}
              style={{
                textAlign: "center",
                alignSelf: "end",
              }}
            />
          )}

          <h2
            style={{
              fontWeight: "bold",
              fontSize: "clamp(12px, 5vw, 38px)",
              textAlign: "center",
              marginLeft: "5%",
            }}
          >
            {title}
          </h2>

          <div>
            <Button variant="link" onClick={refreshButton}>
              <img
                src={logoImage}
                width={isMobile ? "75" : " 165"}
                height={isMobile ? "30" : " 66"}
                alt="MyTrip Logo"
              />
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            overflow: "hidden",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {isMobile && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <CenterManagement onCenterChange={handleCenterChange} />
              <ButtonGroup style={{ margin: "10px" }}>
                <Button
                  variant={transportMode === 1 ? "primary" : "outline-primary"}
                  onClick={() => setTransportMode(1)}
                >
                  <CardList />
                </Button>
                <Button
                  variant={transportMode === 2 ? "primary" : "outline-primary"}
                  onClick={() => setTransportMode(2)}
                >
                  <Map />
                </Button>
              </ButtonGroup>
            </div>
          )}
          {!isMobile ? (
            <>
              <div
                style={{
                  width: "58%",
                  height: "100%",
                  marginRight: "7px",
                  marginLeft: "2px",
                }}
              >
                <MyMap
                  filteredLocations={locationsFiltered}
                  onCenterChange={handleCenterChange}
                  center={center}
                  onRefreshCenter={getCurrentCenter}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "35%",
                  height: "100%",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <LocationList locations={locationsFiltered} />
                )}
              </div>
            </>
          ) : transportMode === 1 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "500vh",
                overflowY: "auto",
                marginLeft: "5px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <Spinner />
              ) : (
                <LocationList locations={locationsFiltered} />
              )}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "500vh",
                overflowY: "hidden",
              }}
            >
              <MyMap
                filteredLocations={locationsFiltered}
                onCenterChange={handleCenterChange}
                center={center}
                onRefreshCenter={getCurrentCenter}
              />
            </div>
          )}

          <div
            style={{
              width: isMobile ? "100%" : "auto",
              height: isMobile ? "auto" : "100vh",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              justifyContent: isMobile ? "center" : "flex-start",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <OverlayTrigger
              placement={overlayTrigger()}
              overlay={<Tooltip>הצגת היעדים שלי</Tooltip>}
            >
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleShowFilterUI}
                style={{ margin: "10px" }}
              >
                <PinMap strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement={overlayTrigger()}
              overlay={<Tooltip>הוספת יעד</Tooltip>}
            >
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleShowAddDestination}
                style={{ margin: "10px" }}
              >
                <PlusLg strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement={overlayTrigger()}
              overlay={
                <Tooltip>
                  חיפוש יעד <br />
                  מתאים לטיול
                </Tooltip>
              }
            >
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleShowTargetSearch}
                style={{ margin: "10px" }}
              >
                <Compass strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement={overlayTrigger()}
              overlay={<Tooltip>איפוס סינונים </Tooltip>}
            >
              <Button
                variant="outline-primary"
                size="lg"
                onClick={reset}
                style={{ margin: "10px" }}
              >
                <ArrowClockwise strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
          </div>
        </div>

        <AddDestinationModal
          show={showAddDestination}
          onHide={handleCloseAddDestination}
        />
        <TargetSearch
          show={showTargetSearch}
          onHide={handleCloseTargetSearch}
          onFilterChange={handleTargetSearchChange}
        />
        <FilterUI
          show={showFilterUI}
          onHide={handleCloseFilterUI}
          onFilterChange={handleFilterUIChange}
        />
      </div>
    </>
  );
};

export default Home;
