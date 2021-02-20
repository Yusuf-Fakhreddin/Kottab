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
	const modalRef = useRef(null);

	//states
	const [ayah, setAyah] = useState(null);
	const [error, setError] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [modal, setModal] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			let result;
			try {
				result = await httpService.get(
					`http://api.alquran.cloud/v1/ayah/${currentAyah}/${sheikh}`
				);
			} catch (error) {
				setError(
					"Something went wrong we will try to fix it as soon as possible"
				);
			}
			console.log(result.data);
			setAyah(result.data.data);
			setError(null);

			if (isPlaying) audioRef.current.play();
		};
		fetchData();
	}, [currentAyah, sheikh]);

	const nextAyahHandler = async () => {
		if (Number(currentAyah) < 6236) changeAyah(Number(currentAyah) + 1);
		else {
			changeAyah(1);
		}
		return;
	};
	const handleClick = (e) => {
		// console.log(e.target);
		// console.log(modalRef);
		if (modalRef.current.contains(e.target) || e.target.nodeName === "I")
			return;
		else if (e.target.className !== "App" && e.target.nodeName !== "BUTTON") {
			setModal("");
		}
	};
	return (
		<div className="App" onClick={handleClick}>
			{error ? (
				<h1>{error}</h1>
			) : (
				<>
					<div className="modal" ref={modalRef}>
						{modal === "Surahs" ? (
							<Modal surah />
						) : (
							modal === "Sheikhs" && <Modal />
						)}
					</div>
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
								src={ayah.audio + "/low"}
								onEnded={nextAyahHandler}
							></audio>
						)}
						<div className="btns">
							<button className="btn" onClick={() => setModal("Sheikhs")}>
								Sheikhs
							</button>
							<button className="btn" onClick={() => setModal("Surahs")}>
								Surahs
							</button>
						</div>
					</div>{" "}
				</>
			)}
		</div>
	);
}

export default Main;
