import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
	const [account, setAccount] = useState("");
	return (
		<div>
			<LoginContext.Provider value={{ account, setAccount }}>{children}</LoginContext.Provider>
		</div>
	);
};

export default ContextProvider;
