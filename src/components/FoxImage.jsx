import { useState, useEffect } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true); // Track whether the image is still loading

  function fetchNewImage() {
    setLoading(true); // Set loading state to true while fetching new image
    fetch(API_URL)
      .then(response => {
        if (!response.ok) { throw new Error("Failed to fetch image"); } // Ensure response is valid
        return response.json();
      })
      .then(data => {
        setImage(data.image); // Set new image URL from response
        setLoading(false); // Image has loaded, stop loading state
      })
      .catch(error => console.log(error)); // Handle fetch errors
  }

  useEffect(fetchNewImage, []); // Fetch a new image when component mounts
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? <p>Loading...</p> : null}
      <img src={image} alt="A Random Fox" />
      <button onClick={fetchNewImage}>Get New Fox</button>
    </div>
  );
}

export default FoxImage