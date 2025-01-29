import axios from 'axios';
import placesAround from './placesAround.js';
import placesAroundResults from './placesAround.js';

const LocationsAirDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const P = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * P) / 2
    + Math.cos(lat1 * P) * Math.cos(lat2 * P)
    * (1 - Math.cos((lon2 - lon1) * P)) / 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}
const validModes = ['driving', 'walking', 'bicycling', 'transit'];

const validModesTime = {
  'driving': 1.5,
  'walking': 0.8333,
  'bicycling': 0.25,
  'transit': 1,
}


async function filterLocations({ locations, searchParams, apiKey }) {

  const {
    center,
    totalTravelMinutes,
    transportMode,
    selectedPlacesForTrip
  } = searchParams;

  if (!locations || locations.length === 0) {
    return [];
  }

  if (!center || !center.latitude || !center.longitude) {
    return locations;
  }
  // console.log("searchParams: " , searchParams);
  
  // console.log(" center: ", center, "totalTravelMinutes: ", totalTravelMinutes, "transportMode; ", transportMode);

  const filteredLocations = locations;
  const hasTimeLimit = totalTravelMinutes > 0;
  let finalFilteredLocations = [];


  const mode = validModes.includes(transportMode) ? transportMode : 'driving';

  const drivingMode = validModesTime[transportMode]


  for (const location of filteredLocations) {
    if (!location.latitude || !location.longitude) {
      // console.log(`Skipping location ${location.name} due to missing coordinates`);
      continue;
    }

    if (hasTimeLimit) {
      const distance = LocationsAirDistance(center.latitude, center.longitude, location.latitude, location.longitude);

      if (distance / drivingMode > totalTravelMinutes) {
        continue;
      }

    }

    try {
      const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${center.latitude},${center.longitude}&destinations=${location.latitude},${location.longitude}&mode=${mode}&key=${apiKey}`;
      const response = await axios.get(distanceMatrixUrl);


      if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
        const distanceText = response.data.rows[0].elements[0].distance.text;
        const durationText = response.data.rows[0].elements[0].duration.text;
        const durationInMinutes = Math.round(response.data.rows[0].elements[0].duration.value / 60);


        if (!hasTimeLimit || durationInMinutes <= totalTravelMinutes) {
          finalFilteredLocations.push({
            ...location,
            distanceText,
            durationText,
            durationInMinutes,
            transportMode: mode
          });
        }
      }
    } catch (error) {
      console.error(`Error calculating distance for ${location.name}:`, error.message);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  }

  if (selectedPlacesForTrip.length > 0) {
    const placesForTrip = searchParams.selectedPlacesForTrip;
    console.log("placesForTrip: ", placesForTrip);

    finalFilteredLocations = await placesAroundResults(placesForTrip, finalFilteredLocations, apiKey);
    console.log("finalFilteredLocations: ", finalFilteredLocations);

  }

  if (Array.isArray(finalFilteredLocations)) {
    finalFilteredLocations.sort((a, b) => a.durationInMinutes - b.durationInMinutes);
  } else {
    console.error('finalFilteredLocations is not an array:', finalFilteredLocations);
  }
  finalFilteredLocations.forEach((location, index) => {
    console.log(`${index + 1}, ${location.name} ${location.distanceText}, ${location.durationText}, ${location.transportMode} ${location.placesAround} ${location.type}`)
  });


  return finalFilteredLocations;
}

export default filterLocations;

