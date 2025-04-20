import { GOOGLE_MAPS_API_KEY } from "./keys";
export const g_fetchAddress = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const fullAddress = data.results[0].formatted_address;
      const addressParts = fullAddress.split(", ");
      const generalArea = addressParts.slice(1).join(", ");

      return {
        status: true,
        message: generalArea,
      };
    } else {
      return {
        status: false,
        message: data.status,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error Fetching Address",
    };
  }
};

export const g_fetchCoords = async (address) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        status: true,
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      return {
        status: false,
        message: data.status,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error Fetching Coordinates",
    };
  }
};
