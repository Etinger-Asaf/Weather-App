import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiKey } from "../../ApiKey";

import getLocalWeather from "../../Redux/slices/localLocationSlice";

const LocalWeather = () => {
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const getLatitude = position.coords.latitude;
        const getLongitude = position.coords.longitude;
        const latitudeFix = getLatitude.toFixed(1);
        const longitudeFix = getLongitude.toFixed(1);
        setLatitude(+latitudeFix);
        setLongitude(+longitudeFix);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      if (latitude && longitude) {
        dispatch(getLocalWeather(latitude, longitude, apiKey));
      }
    } catch (err) {
      console.log(err);
    }
  }, [latitude, longitude]);

  const { geoLocation } = useSelector((state) => state.localLocation);

  return <p>this is the LocalWeather</p>;
};
export default LocalWeather;
