import { type FC, ComponentPropsWithRef, useContext, createContext } from "react";
import { AppContextType } from "../interfaces/AppContextType";

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: FC<ComponentPropsWithRef<"main">> = ({ children }) => {
	return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
