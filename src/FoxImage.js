import { useState, useEffect } from 'react';
import { getFoxImage } from './api';

function FoxImage() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  function fetchNewImage() {
    setLoading(true);
    getFoxImage()
      .then((data) => {
        setImage(data.image);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getFoxImage()
      .then((data) => {
        setImage(data.image);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? <p>Loading...</p> : null}
      <img src={image} alt="fox logo" />
        <button onClick={fetchNewImage}>Get New Fox Image</button>
    </div>
  );
}

export default FoxImage;
