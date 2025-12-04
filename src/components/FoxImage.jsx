import { useState, useEffect } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true)

  function fetchNewImage() {
    setLoading(true)
    fetch(API_URL)
      .then(response => {
        if (!response.ok) { throw new Error("Failed to fetch image"); }
        return response.json();
      })
      .then(data => {
        setImage(data.image);
        setLoading(false);
      })
      .catch(error => console.log(error))
  }

  // function fetchNewImage() {
  //   setLoading(true);
  //   fetch(API_URL)
  //     .then(response => {
  //       if (!response.ok) { throw new Error("Failed to fetch image"); }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setImage(data.image);
  //       setLoading(false);
  //     })
  //     .catch(error => console.log(error));
  // }

  //using useEffect to caLL a function that will trigger a new fetch request when the component mounts
  useEffect(fetchNewImage, [])

  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? <p>Loading...</p> : ""}
      <button onClick={fetchNewImage}>Get new Fox</button>
      <img src={image} alt="fox logo" />
    </div>
  );
}

export default FoxImage