import React, { useState, useRef, useEffect, useContext } from "react";
//style
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Ayah from "./components/Ayah";
import httpService from "./httpService";
import Modal from "./components/Modal";
import { AyahContext } from "./contexts/AyahContext";

function Main() {
	const { currentAyah, changeAyah, sheikh } = useContext(AyahContext);

	//Ref
	const audioRef = useRef(null);

	//states
	const [ayah, setAyah] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [modal, setModal] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const result = await httpService.get(
				`http://api.alquran.cloud/v1/ayah/${currentAyah}/${sheikh}`
			);

			console.log(result.data);
			setAyah(result.data.data);
			if (isPlaying) audioRef.current.play();
		};
		fetchData();
	}, [currentAyah, sheikh]);

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
				{ayah ? (
					<Ayah ayah={ayah.text} sheikh={sheikh} surah={ayah.surah} />
				) : (
					"loading"
				)}
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
