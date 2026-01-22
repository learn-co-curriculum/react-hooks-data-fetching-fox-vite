import { useState,useEffect } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] =useState(true);

  useEffect(()=>{
    
  fetch(API_URL)
    .then(response=>{
      if(!response.ok){
        throw new Error("Failed to fetch image");
      }
      return response.json();
    })
    .then((data=>{
      setImage(data.image)
      setLoading(false);
    }))
    .catch(error=>{
      console.log(error);
      
    })
},[]);//pass empty dependency array to ensure fetch request is only triggerd once
  
  return (
    <div>
      <p>Learn more about us!</p>
      {loading?<p>Loading...</p>:""}
      <img src={image} alt="fox logo" />
    </div>
  );
}

export default FoxImage