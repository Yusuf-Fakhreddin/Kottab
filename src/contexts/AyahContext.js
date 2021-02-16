import React, { createContext, Component } from "react";

export const AyahContext = createContext();

class AyahContextProvider extends Component {
	state = {
		//shared data we want to supply to different component
		currentAyah: 1,
	};

	changeAyah = (ayah) => {
		this.setState({ currentAyah: ayah });
	};

	render() {
		return (
			<AyahContext.Provider
				value={{
					...this.state,
					changeAyah: this.changeAyah,
				}}
			>
				{/* value is the data we want to provide to what the themecontext.provider wraps */}
				{this.props.children}
				{/* children to output what it's wrapping */}
			</AyahContext.Provider>
		);
	}
}

export default AyahContextProvider;
