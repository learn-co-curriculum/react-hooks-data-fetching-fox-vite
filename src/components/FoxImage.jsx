import { useCallback, useEffect, useState } from 'react';
import foxLogo from '../assets/fox-logo.png';
import { getFoxImage } from '../FoxImage.js';

function FoxImage() {
  const [image, setImage] = useState(foxLogo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNewImage = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      setImage(await getFoxImage());
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewImage();
  }, [fetchNewImage]);

  return (
    <div>
      <p>Learn more about us!</p>
      {loading && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}
      <img src={image} alt="Fox" />
      <button onClick={fetchNewImage} disabled={loading}>
        Get New Fox
      </button>
    </div>
  );
}

export default FoxImage;
