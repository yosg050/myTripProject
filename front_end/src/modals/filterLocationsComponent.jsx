import { LOCAL_SERVER_URL } from "../../config";

export function filterLocationsUI(
  locations,
  { visited, notVisited, searchTerm } = {}
) {
  if (!Array.isArray(locations)) {
    console.error("Locations is not an array:", locations);
    return [];
  }

  let filtered = locations;

  if (
    visited !== undefined &&
    notVisited !== undefined &&
    visited !== notVisited
  ) {
    filtered = filtered.filter((location) => {
      if (visited) return location.visit === true;
      if (notVisited) return location.visit === false;
      return true;
    });
  }

  if (searchTerm) {
    filtered = filtered.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
}

export async function filterLocationsTarget(
  locations,
  {
    selectedTypes = {},
    totalTravelMinutes = 0,
    selectedPlacesForTrip = [],
    center = null,
    includeVisited = false,
    transportMode = "driving",
  } = {}
) {
  console.log("filterLocationsTarget called with:", {
    locationsCount: locations.length,
    selectedTypes,
    totalTravelMinutes,
    selectedPlacesForTrip,
    center,
    includeVisited,
    transportMode,
  });

 

  if (!Array.isArray(locations)) {
    console.error("Locations is not an array:", locations);
    return [];
  }

  let filteredLocations = includeVisited
    ? locations
    : locations.filter((location) => !location.visit);

  filteredLocations = filteredLocations.filter((location) => {
    if (!location.tripTypes || !Array.isArray(location.tripTypes)) {
      return false;
    }

    const hasSelectedTypes =
      Object.keys(selectedTypes).length === 0 ||
      Object.entries(selectedTypes).some(
        ([type, isSelected]) => isSelected && location.tripTypes.includes(type)
      );

    return hasSelectedTypes;
  });

  // const selectedPlacesForTripObject = Object.keys(selectedPlacesForTrip);
  const searchParams = {
    selectedTypes,
    totalTravelMinutes,
    selectedPlacesForTrip,
    // selectedPlacesForTripObject,
    center,
    includeVisited,
    transportMode,
  };

  console.log("Search params being sent to server:", searchParams);

  try {
    const response = await fetch(
      `http://${LOCAL_SERVER_URL}/locations/filterLocations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          locations: filteredLocations,
          searchParams: searchParams,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      filteredLocations = data;
      console.log(
        "Filtered locations after server response:",
        filteredLocations.map((loc) => loc.name)
      );
    }
  } catch (error) {
    console.error("Error in server request:", error);
    console.warn("Using client-side filtered results due to server error");
  }

  if (!includeVisited) {
    filteredLocations = filteredLocations.filter((location) => !location.visit);
  }
  return filteredLocations;
}
