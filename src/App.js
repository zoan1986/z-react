import React, {useState} from 'react';
import './App.css';
import Person from './components/Person/Person';
import Radium from 'radium';

function App() {
  const [showPerson, setShowPersons] = useState(true);
  const [persons, setPersons] = useState([
    {name: 'z1', age:5},
    {name: 'z2', age:3},
    {name: 'z5', age:4},
  ])

  const chanceNameHandler = (e) =>{
    setPersons([
      {name: 'z10', age:50},
      {name: 'z20', age:30},
      {name: 'z50', age:40},
    ]);
    console.log(e);
  };
  const styles = {
    backgroundColor: 'green',
    border: '1px solid blue',
    padding: '10px',
    color: 'white',
    ':hover': {
      backgroundColor: '#333',
      color: 'red'
    }
  };
  let classes = [];
  if (persons.length <= 2) classes.push('red');
  if (persons.length <= 1) classes.push('bold');
  const switchNameHandler=(event) => {
    setPersons([
      {name: event.target.value, age:50},
      {name: 'z20', age:30},
      {name: 'z50', age:40},
    ]);
  };
  const deletePerson = (personIndex)=>{
    let newPersons = [...persons];
    newPersons.splice(personIndex,1);
    setPersons(newPersons);
  };
  const togglePersons=() => {
    setShowPersons(!showPerson);
  };
  let personList = null;
  if(showPerson===true){
    personList = (
      <div>
      {persons.map((item,index) => {
          return (
            <Person key={index}
            click={() => deletePerson(index)} 
            changed={switchNameHandler} 
            name={item.name} 
            age={item.age}
            />
          );
        })}
      </div>
    );
    styles.backgroundColor = 'red';
    styles[':hover']={ backgroundColor: 'blue', color: 'black'};
  }

  return (
    <>
      <div className="App">
        <h1>z</h1>
        <p className={classes.join(' ')}>fasdfasdf</p>
        <button style={styles} onClick={(e)=>togglePersons()}>show</button>
        {personList}
      </div>
      
    </>
  );
}

export default Radium(App);
