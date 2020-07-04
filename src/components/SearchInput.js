import React, { useState } from 'react';
import Proptypes from 'prop-types';

const SearchInput = ({onUserInputChange}) => {
    let timerId = null;
    
    const [userInput, setUserInput] = useState("");

    const debounce = value => {
        clearTimeout(timerId);
        setUserInput(value);
        timerId = setTimeout(() => onUserInputChange(value), 1000);
    }

    return <input 
        className="search-input" 
        placeholder="Search.."
        value={userInput} 
        onChange={(e)=> {debounce(e.target.value)}}
    />
}

SearchInput.propTypes = {
    onUserInputChange: Proptypes.func.isRequired
}


export default SearchInput;