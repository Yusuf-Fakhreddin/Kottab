import React from "react";

const Ayah = ({ ayah, surah }) => {
	return (
		<div className="surah">
			<h1>{surah ? surah.name : "سُورَةُ ٱلْفَاتِحَةِ"}</h1>
			<h3 className="ayah">
				{ayah ? ayah : "﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
			</h3>
		</div>
	);
};

export default Ayah;
