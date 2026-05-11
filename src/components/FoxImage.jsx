import { useEffect, useState } from "react";
import foxLogo from "../assets/fox-logo.png";

const API_URL = "https://randomfox.ca/floof/";
function FoxImage() {
	const [image, setImage] = useState(foxLogo);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
    getImage()
  }, []);

	function getImage() {
    setLoading(true)
		fetch(API_URL)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch image");
				return res.json();
			})
			.then((data) => {
				setImage(data.image);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<div>
			<p>Learn more about us!</p>
			{loading ? <p>Loading...</p> : ""}
			<img src={image} alt="fox logo" width='100px'/>
      <button onClick={getImage}>Get new Image</button>
		</div>
	);
}

export default FoxImage;
