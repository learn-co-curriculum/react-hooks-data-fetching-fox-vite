import { useEffect, useState } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoxImage() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setImage(data.image )
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading ?"": <p>Loading...</p>}
      <img src={image} alt="fox logo" />
      <button onClick={fetchFoxImage}>Get New Fox</button>
    </div>
  );
}

export default FoxImage