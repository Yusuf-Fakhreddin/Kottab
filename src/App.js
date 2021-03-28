import React from "react";
import AyahContextProvider from "./contexts/AyahContext";
import Main from "./Main";

function App() {
	return (
		<div>
			<AyahContextProvider>
				<Main />
			</AyahContextProvider>
		</div>
	);
}

export default App;
