import React, { useContext } from "react";
import { AyahContext } from "../contexts/AyahContext";

const LibrarySurah = ({ name, englishName, identifier }) => {
	const { changeSheikh } = useContext(AyahContext);
	return (
		<div
			className="library-element"
			onClick={() => changeSheikh(identifier, name)}
		>
			<h1>{name}</h1>
			<h2>{englishName}</h2>
		</div>
	);
};

export default LibrarySurah;
