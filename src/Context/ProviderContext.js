import { createContext, useState } from "react";

export const UserContext = createContext();

const ProviderContextProvider = (props) => {
    const [list, setLIST] = useState([]);

    const get = async () => {
        const response = await fetch("https://ms.stagingsdei.com:4011/property/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        // console.log(res.data.result[0].userId);
        setLIST(res.data.result);
    };
    return (
        <ProviderContext.Provider value={{ list, get }}>
            {props.children}
        </ProviderContext.Provider>
    );
};

export default ProviderContextProvider;
