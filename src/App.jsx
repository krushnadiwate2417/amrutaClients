import React from "react";
import {createRoot} from 'react-dom/client'
import User from "./components/User";




const App = ()=>{
    return (
    <>
        <User/>
    </>
    )
}
createRoot(document.getElementById('root')).render(<App/>);