import React from "react";
import './Person.css';

const Persons = (props) => {
    const styles= {
        color:'red',
    }
    return (
        <div className="Person">
        <p style={styles} onClick={props.click}>{props.name} - {props.age}</p> 
        <p> {props.children}</p>
        <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
};

export default Persons;
