import React, { useState, useRef, useEffect, useContext } from "react";
//style
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Ayah from "./components/Ayah";
import httpService from "./httpService";
import Modal from "./components/Modal";
import { AyahContext } from "./contexts/AyahContext";
import Quality from "./components/Quality";

function Main() {
	const { currentAyah, changeAyah, sheikh, quality } = useContext(AyahContext);

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
	}, [currentAyah, sheikh, quality]);

	const nextAyahHandler = async () => {
		if (Number(currentAyah) < 6236) changeAyah(Number(currentAyah) + 1);
		else {
			changeAyah(1);
		}
		return;
	};
	const handleClick = (e) => {
		if (modalRef.current.contains(e.target) || e.target.nodeName === "I")
			return;
		else if (e.target.className !== "App" && e.target.nodeName !== "BUTTON") {
			setModal("");
		}
	};
	return (
		<div onClick={handleClick}>
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
					<div className="body">
						<div className="container">
							{ayah ? (
								<Ayah ayah={ayah.text} sheikh={sheikh} surah={ayah.surah} />
							) : (
								<div className="loader"></div>
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
									ref={audioRef}
									src={ayah.audio + quality}
									onEnded={nextAyahHandler}
								></audio>
							)}
							<Quality />
							<div className="btns">
								<button
									className={`btn ${modal === "Sheikhs" ? "active" : null}`}
									onClick={() => setModal("Sheikhs")}
								>
									Sheikhs
								</button>
								<button
									className={`btn ${modal === "Surahs" ? "active" : null}`}
									onClick={() => setModal("Surahs")}
								>
									Surahs
								</button>
							</div>
						</div>{" "}
					</div>
				</>
			)}
		</div>
	);
}

export default Main;
