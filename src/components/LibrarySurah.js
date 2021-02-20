import React, { useContext } from "react";
import { AyahContext } from "../contexts/AyahContext";

const LibrarySurah = ({ arabicName, EnglishName, number, click, start }) => {
	const { changeAyah } = useContext(AyahContext);
	return (
		<div className="library-element" onClick={() => changeAyah(start)}>
			<div className="name">
				<h2>{EnglishName}</h2>
				<h1>{arabicName}</h1>
			</div>
			<h2>{number}</h2>
		</div>
	);
};

export default LibrarySurah;
