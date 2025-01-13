import { useUser } from "../connections/UserProfile";


const useHandlePlaceSelect = () => {
  const { userLocations } = useUser();

  const handlePlaceSelect = (place) => {
    console.log(userLocations);
    console.log(place);

    const isPlaceAlreadyInLocations = userLocations.some(
      (location) => location.id === place.place_id
    );
    // if (isPlaceAlreadyInLocations){
    //   console.log("yes");
      
    // }
    // if (!isPlaceAlreadyInLocations){
    //   console.log("No");
      
    // }
    return isPlaceAlreadyInLocations ? false : true;
  };

  return handlePlaceSelect;
};

export default useHandlePlaceSelect;
