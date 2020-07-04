import React, { useState, useEffect } from 'react';
import Dropdown from "./components/Dropdown";
import "./App.css";

const App = () => {

    const [items, updateItems] = useState([]);
    const [hasAddAccess, toggleAddAccess] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [maxLimit, setMaxLimit] = useState(0);

    useEffect(() => {
        fetch("https://run.mocky.io/v3/cda825a3-659f-47f2-ae4f-bd9a5e8ad97e")
            .then((res) => res.json())
            .then(({
                items: resItems,
                maxLimit: resMaxLimit
            })=> {
                updateItems(resItems);
                setMaxLimit(resMaxLimit);
            });
    }, []);

    const logSelectedValue = value => {
        console.log(value);
        setSelectedValue(value);
    }

    return (
        <div className="App">
            <button style={{width: "200px", margin:"20px auto", padding: "20px"}}
                onClick={() => toggleAddAccess(!hasAddAccess)}>Get Add Access</button>
            <Dropdown 
                items={items} 
                updateItems={updateItems} 
                maxLimit={maxLimit} 
                hasAddAccess={hasAddAccess}
                selectedValue={selectedValue}
                setSelectedValue={logSelectedValue}
            />
        </div>
    );
}

export default App;
