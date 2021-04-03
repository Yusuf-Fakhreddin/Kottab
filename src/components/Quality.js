import React, { useState, useContext } from "react";
import { AyahContext } from "../contexts/AyahContext";

const Quality = () => {
	const { changeQuality } = useContext(AyahContext);

	const [active, setActive] = useState("Med");

	return (
		<div className="quality-btns">
			<button
				className={`btn ${active === "High" ? "active" : null}`}
				onClick={() => {
					setActive("High");
					changeQuality("/high");
				}}
			>
				High
			</button>
			<button
				className={`btn ${active === "Med" ? "active" : null}`}
				onClick={() => {
					setActive("Med");
					changeQuality("");
				}}
			>
				Med
			</button>
			<button
				className={`btn ${active === "Low" ? "active" : null}`}
				onClick={() => {
					setActive("Low");
					changeQuality("/low");
				}}
			>
				Low
			</button>
		</div>
	);
};

export default Quality;
