import { useState, useEffect } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then( r => {
        if (!r.ok) { throw new Error("Failed to fetch image") }
        return r.json()
      })
      .then(data => {
        setImage(data.image)
        setLoading(false)
      })
      .catch(err => console.error(err) )
  }, [])

  function fetchNewImage() {
    setLoading(true)
    fetch(API_URL)
      .then( r => {
        if (!r.ok) { throw new Error("Failed to fetch image") }
        return r.json()
      })
      .then(data => {
        setImage(data.image)
        setLoading(false)
      })
      .catch(err => console.error(err) )
  }

  return (
    <div>
      <p>Learn more about us!</p>
      { loading ? <p>Loading...</p> : ""}
      <img src={image} alt="fox logo" />
      <button onClick={fetchNewImage}>Get New Fox</button>
    </div>
  );
}

export default FoxImage