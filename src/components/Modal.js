import React from "react";
import Library from "./Library";

const Modal = ({ surah }) => {
	return (
		<div className="library">
			<Library surah={surah} />
		</div>
	);
};

export default Modal;
