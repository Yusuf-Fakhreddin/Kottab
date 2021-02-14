import React from "react";

const Player = ({ ayah, audioRef, isPlaying, setIsPlaying }) => {
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
	return (
		<div className="player">
			<div className="play-control">
				<i className="fas fa-angle-left"></i>
				{isPlaying ? (
					<i className="fas fa-pause" onClick={playSongHandler}></i>
				) : (
					<i className="fas fa-play" onClick={playSongHandler}></i>
				)}

				<i className="fas fa-angle-right"></i>
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
