// import useState from React
// import React, { useState } from 'react'
import Table from './Table'
import Form from './Form';

// import useState and useEffect
import React, {useState, useEffect} from 'react';

// import axios
import axios from 'axios';

function MyApp() {
  
  // empty state form (will add to it)
  // when data changes useState updates the UI
  // default value of empty array
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated);
  }

  // // adds a new person (function called when submit button is clicked)
  // function updateList(person) {

  //   // spread operator (...) makes a copy of all items in array
  //   // and append another person object (not overwriting original array)
  //   setCharacters([...characters, person]);
  // }


  // return result data
  function updateList(person) { 
    makePostCall(person).then( result => {
    
      // check if result is valid and result status = 201
      if (result && result.status === 201)
       setCharacters([...characters, person] );
    });
  }

  // 
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5001/users');
       return response.data.users_list;     
    }
    catch (error){
       // We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5001/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
  }

  useEffect(() => {
    fetchAll().then( result => {
     if (result)
        setCharacters(result);
    });
  }, [] );  

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
      {/* <Form /> */}
    </div>
  )
}

export default MyApp;