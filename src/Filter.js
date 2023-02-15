import React from "react";

const Filter = (props) => {
    return (
        <div className='filter'>
            <h4>{props.string}</h4>
            <input  className='filterCheckbox'
                    type='checkbox'
                    onChange={() => props.filter(props.string)} >
            </input>
        </div>
    )
}

export default Filter