import React, { createContext, Component } from "react";

export const AyahContext = createContext();

class AyahContextProvider extends Component {
	state = {
		//shared data we want to supply to different component
		currentAyah: 1,
		sheikh: "ar.abdulbasitmurattal",
		sheikhName: "عبد الباسط عبد الصمد ",
		quality: "",
	};

	changeAyah = (ayah) => {
		this.setState({ currentAyah: ayah });
	};
	changeSheikh = (sheikh, sheikhName) => {
		this.setState({ sheikh: sheikh, sheikhName: sheikhName });
	};
	changeQuality = (quality) => {
		this.setState({ quality: quality });
	};

	render() {
		return (
			<AyahContext.Provider
				value={{
					...this.state,
					changeAyah: this.changeAyah,
					changeSheikh: this.changeSheikh,
					changeQuality: this.changeQuality,
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
