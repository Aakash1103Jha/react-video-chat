import { type FC } from "react";

import { LoaderProps } from "../../interfaces/LoaderProps";
import { Portal } from "../Portal";

import styles from "./Loader.module.css";

const LoaderElement = () => {
	return (
		<div className={`${styles.loader}`}>
			<div className={`${styles.loader_element}`}></div>
			<div className={`${styles.loader_element}`}></div>
			<div className={`${styles.loader_element}`}></div>
		</div>
	);
};

export const Loader: FC<LoaderProps> = (props) => {
	const { overlay } = props;
	if (overlay)
		return (
			<Portal>
				<div className={`${styles.loader_overlay}`}>
					<LoaderElement />
				</div>
			</Portal>
		);

	return (
		<Portal>
			<LoaderElement />
		</Portal>
	);
};
