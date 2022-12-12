import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./global.style.css";

import Main from "./Main";
import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppProvider>
				<Main />
			</AppProvider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals(console.info);
