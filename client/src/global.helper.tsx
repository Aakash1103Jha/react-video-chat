import { Dispatch, SetStateAction } from "react";

import { Loader } from "./components/Loader";
import { LoaderProps } from "./interfaces/LoaderProps";

class GlobalHelper {
	/* This is a function that returns a random number used as component key when using map. */
	componentKey = () => Math.trunc(Math.random() * 100000000);

	/* A function that is used to clear the state of a component. */
	clearState = (val: any, setterFunc: Dispatch<SetStateAction<any>>[]) => {
		setterFunc.forEach((func) => func(val));
	};

	/* A function that returns a loader component, used to show progress. */
	showLoader = (props?: LoaderProps) => <Loader {...props} />;
}

export default GlobalHelper;
