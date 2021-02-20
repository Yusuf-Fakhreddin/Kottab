import React, { useContext } from "react";
import { AyahContext } from "../contexts/AyahContext";

const Ayah = ({ ayah, surah }) => {
	const { sheikhName } = useContext(AyahContext);
	return (
		<div className="surah">
			<h1>{surah ? surah.name : "سُورَةُ ٱلْفَاتِحَةِ"}</h1>
			<h2 className="ayah">
				{ayah ? ayah : "﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
			</h2>
			<h3>{sheikhName ? sheikhName : "عبد الباسط عبد الصمد "}</h3>
		</div>
	);
};

export default Ayah;
