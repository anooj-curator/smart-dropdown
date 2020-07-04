import React, {useState} from 'react';
import PropTypes from 'prop-types';

import DropdownItem from "./DropdownItem";
import SearchItem from "./SearchInput";
import "./Dropdown.css";

const Dropdown = ({ 
    hasAddAccess, 
    maxLimit, 
    items, 
    updateItems, 
    selectedValue, 
    setSelectedValue
}) => {
    const [userInput, setUserInput] = useState("");
    const [expanded, toggleExpand] = useState(false);
    const [showAll, toggleShowAll] = useState(false);
    const chevronIcon = `icon ${expanded ? "icon-chevron-up" : "icon-chevron-down"}`;
    let timeId = null;

    const onItemClick = value => {
        setSelectedValue(value);
        toggleExpand(!expanded);
        setUserInput("");
    }

    const onUserInputChange = value => {
        clearTimeout(timeId);
        timeId = setTimeout(() =>setUserInput(value), 3000);
    }

    const addItem = () => {
        updateItems([...items, userInput]);
        onItemClick(userInput);
    }

    const getDropdownItems = () => {
        let dropdownItemList = [];

        for(let i=0; i < items.length; i++) {
            const value= items[i];
            const hasItem = !userInput 
                || value
                    .toLowerCase()
                    .trim()
                    .indexOf(userInput.toLowerCase().trim()) !== -1;
            hasItem && dropdownItemList.push(
                <DropdownItem value={value}
                    key={value} 
                    onItemClick={onItemClick}
                />
            );
        }
        
        const showMoreButton  = maxLimit <= dropdownItemList.length && !showAll ? (
            <button className="button-show-more" 
                onClick={() =>toggleShowAll(!showAll)}
            >{dropdownItemList.length - maxLimit} more...</button>
        ) : null;

        dropdownItemList = showAll ? dropdownItemList : dropdownItemList.slice(0,maxLimit);

        if(dropdownItemList.length === 0 && userInput) {
            return (<div className="add-item">
                <span className="add-item-text">"{userInput}" not found</span>
                {hasAddAccess && <button className="button-add-item" 
                    onClick={addItem}
                >Add and Select</button>}
            </div>);
        }

        return (<>
            <ul className="dropdown-list">
                {dropdownItemList}
            </ul>
            {showMoreButton}
        </>);
    }

    return (<>
        <div className="dropdown-header" onClick={() => toggleExpand(!expanded)}>
            <button className="dropdown-button">
                {selectedValue || "Select a location"}
            </button>
            <i className={chevronIcon} />
        </div>
        {expanded && (
            <div className="dropdown-body">
                <SearchItem
                    onUserInputChange={onUserInputChange}
                />
                {getDropdownItems()}
            </div>
        )}
    </>);
}

Dropdown.propTypes = {
    hasAddAccess: PropTypes.bool.isRequired, 
    maxLimit: PropTypes.number.isRequired, 
    items: PropTypes.array.isRequired, 
    updateItems: PropTypes.func.isRequired, 
    selectedValue: PropTypes.string, 
    setSelectedValue: PropTypes.func.isRequired
}

export default Dropdown;