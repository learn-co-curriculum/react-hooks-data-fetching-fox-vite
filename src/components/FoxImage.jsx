import { useState, useEffect } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo);
  const [loading, setLoading] = useState(true);

  //Fetch a Fox image on Load
  useEffect(()=>{
    fetch(API_URL)
    .then(response => {
      if (!response.ok){throw new Error ("Error fetching data", Error)}
      return response.json();
    })
    .then (FoxImageData => {
      setImage(FoxImageData.image);
      setLoading(false);
    })
    .catch(error => console.log(error));
  },[])
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? <p>Loading...</p> :""}
      <img src={image} alt="fox logo" />
    </div>
  );
}

export default FoxImage