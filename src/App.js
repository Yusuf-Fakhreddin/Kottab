import React, { useState, useRef, useEffect } from "react";
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Ayah from "./components/Ayah";
import httpService from "./httpService";

function App() {
	//Ref
	const audioRef = useRef(null);

	const [ayah, setAyah] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			const result = await httpService.get(
				"http://api.alquran.cloud/v1/ayah/9/ar.alafasy"
			);

			console.log(result.data);
			setAyah(result.data.data);
		};
		fetchData();
	}, []);

	return (
		<div className="App">
			<div className="container">
				<Ayah ayah={ayah.text} surah={ayah.surah} />
				<Player
					ayah={ayah}
					audioRef={audioRef}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
				<audio
					// onLoadedMetadata={timeUpdateHandler}
					// onTimeUpdate={timeUpdateHandler}
					ref={audioRef}
					src={ayah.audio}
					// onEnded={songEndHandler}
				></audio>
			</div>
		</div>
	);
}

export default App;
