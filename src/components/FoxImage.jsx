import { useState, useEffect } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true); // Track whether the image is still loading

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) { throw new Error("Failed to fetch image"); } // Error handling: "(!r.ok)" appeared to be a typo   
        return response.json();
      })
      .then(data => {
        setImage(data.image); // Set new image from API response
        setLoading(false); // Set loading to false once image is loaded
      })
      .catch(error => console.log(error));
  }, []);
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? <p>Loading...</p> : null} {/* Show loading message while image is loading */}
      <img src={image} alt="A Random Fox" /> {/* Update alt text for accessibility */}
    </div>
  );
}

export default FoxImage