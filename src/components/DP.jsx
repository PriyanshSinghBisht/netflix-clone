import { createContext , useContext, useState } from "react";

const DetailContext = createContext(null);

export const DetailProvider = ({children}) =>{
     const [detail, setDetail] = useState([]);
    
     const setdetail = (id , cat)=>{
        setDetail([id, cat]);
     }
     return <DetailContext.Provider value={{ detail, setdetail }}> {children} </DetailContext.Provider>
}

export const useDetail = ()=>{
    return useContext(DetailContext);
}