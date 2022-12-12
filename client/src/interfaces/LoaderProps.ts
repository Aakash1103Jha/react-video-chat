import { ComponentPropsWithRef } from "react";

export interface LoaderProps extends ComponentPropsWithRef<"div"> {
	overlay?: boolean;
}
