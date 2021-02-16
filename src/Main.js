import React, { useState, useRef, useEffect, useContext } from "react";
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Ayah from "./components/Ayah";
import httpService from "./httpService";
import Modal from "./components/Modal";
import { AyahContext } from "./contexts/AyahContext";

function Main() {
	const { currentAyah, changeAyah } = useContext(AyahContext);

	//Ref
	const audioRef = useRef(null);

	const [ayah, setAyah] = useState(null);
	// const [currentAyah, setCurrentAyah] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			const result = await httpService.get(
				`http://api.alquran.cloud/v1/ayah/${currentAyah}/ar.alafasy`
			);

			console.log(result.data);
			setAyah(result.data.data);
			if (isPlaying) audioRef.current.play();
		};
		fetchData();
	}, [currentAyah]);

	const nextAyahHandler = async () => {
		audioRef.current.pause();
		if (Number(currentAyah) < 6236) changeAyah(Number(currentAyah) + 1);
		else {
			changeAyah(1);
		}
		return;
	};

	return (
		<div className="App">
			<Modal />
			<div className="container">
				{ayah ? <Ayah ayah={ayah.text} surah={ayah.surah} /> : "loading"}
				<Player
					currentAyah={currentAyah}
					audioRef={audioRef}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					setCurrentAyah={changeAyah}
				/>
				{ayah && (
					<audio
						// onLoadedMetadata={timeUpdateHandler}
						// onTimeUpdate={timeUpdateHandler}
						ref={audioRef}
						src={ayah.audio}
						onEnded={nextAyahHandler}
					></audio>
				)}
			</div>
		</div>
	);
}

export default Main;
