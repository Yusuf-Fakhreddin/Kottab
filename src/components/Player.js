import React from "react";

const Player = ({
	currentAyah,
	audioRef,
	isPlaying,
	setIsPlaying,
	setCurrentAyah,
}) => {
	// Event Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};
	const nextAyahHandler = async (direction) => {
		audioRef.current.pause();
		if (direction === "right") {
			if (Number(currentAyah) < 6236) setCurrentAyah(Number(currentAyah) + 1);
			else {
				setCurrentAyah(1);
			}
		} else if (direction === "left") {
			if (Number(currentAyah) > 1) setCurrentAyah(Number(currentAyah) - 1);
			else {
				setCurrentAyah(6236);
			}
		}
		return;
	};
	return (
		<div className="player">
			<div className="play-control">
				<i
					className="fas fa-angle-left"
					onClick={() => nextAyahHandler("left")}
				></i>
				{isPlaying ? (
					<i className="fas fa-pause" onClick={playSongHandler}></i>
				) : (
					<i className="fas fa-play" onClick={playSongHandler}></i>
				)}

				<i
					className="fas fa-angle-right"
					onClick={() => nextAyahHandler("right")}
				></i>
				{/* <i onClick={() => setActiveVolume(!activeVolume)} icon={faVolumeDown} />
				{activeVolume && (
					<input
						onChange={changeVolume}
						value={songInfo.volume}
						max="1"
						min="0"
						step="0.01"
						type="range"
					/>
				)} */}
			</div>
		</div>
	);
};

export default Player;
