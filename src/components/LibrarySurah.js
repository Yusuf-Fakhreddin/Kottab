import React from "react";

const LibrarySurah = ({ arabicName, EnglishName, number, click, start }) => {
	return (
		<div className="library-element" onClick={() => click(start)}>
			<div className="name">
				<h2>{EnglishName}</h2>
				<h1>{arabicName}</h1>
			</div>
			<h2>{number}</h2>
		</div>
	);
};

export default LibrarySurah;
