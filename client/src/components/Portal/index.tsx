import { ComponentPropsWithRef, type FC } from "react";
import { createPortal } from "react-dom";

export const Portal: FC<ComponentPropsWithRef<"div">> = ({ children }) =>
	createPortal(children, document.getElementById("popup") as HTMLElement);
