// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useSearchParams } from "react-router-dom";
// import useUrlPosition from "./hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BAse_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [isLoadingGeoloading, setIsLoadingGeoloading] = useState(false);
  console.log(isLoadingGeoloading);
  // const { lat, lng } = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(setSearchParams);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const lng = searchParams.get("lat");
  const lat = searchParams.get("lng");
  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeoloading(true);
          const res = await fetch(
            `${BAse_Url}??latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCountry(data.country);
          setCityName(data.cityName);
          console.log(data);

          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoadingGeoloading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {country}
          {emoji}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
