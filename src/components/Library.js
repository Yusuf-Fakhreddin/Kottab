import React from "react";
import LibrarySurah from "./LibrarySurah";
import LibrarySheikh from "./LibrarySheikh";
import { listOfSurahs, englishSurahs, audioEdition } from "./data";

const Library = ({ surah }) => {
	return (
		<div>
			{surah ? (
				<h1 className="title">Surahs</h1>
			) : (
				<h1 className="title">Sheikhs</h1>
			)}
			{surah
				? listOfSurahs.map((item, index) => (
						<LibrarySurah
							key={index}
							start={item.start}
							arabicName={item.name}
							number={item.surah}
							EnglishName={englishSurahs[index].name}
						/>
				  ))
				: audioEdition.map((item, index) => (
						<LibrarySheikh
							key={index}
							name={item.name}
							identifier={item.identifier}
							englishName={item.englishName}
						/>
				  ))}
		</div>
	);
};

export default Library;
