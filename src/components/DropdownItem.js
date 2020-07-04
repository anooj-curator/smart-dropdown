import React from 'react';
import PropTypes from "prop-types";

const DropdownItem = ({value, onItemClick}) => {

    return <li onClick={() => onItemClick(value)}>{value}</li>
}

DropdownItem.propTypes = {
    value: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default DropdownItem;