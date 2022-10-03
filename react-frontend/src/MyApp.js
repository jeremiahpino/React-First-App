// import useState from React
// import React, { useState } from 'react'
import Table from './Table'
import Form from './Form';

// import useState and useEffect
import React, {useState, useEffect} from 'react';

// import axios
import axios from 'axios';

function MyApp() {
  
  // - empty state form (will add to it)
  // - when data changes useState updates the UI
  // - default value of empty array

  // refer to characters to retrieve stat
  // setCharacters to update the state
  const [characters, setCharacters] = useState([]);

  // added row id to remove character id
  function removeOneCharacter (index, rowID) {
    
    // async function for delete
    deleteUser(rowID);

    // - filter creates new array and applies filter
    // - testing an index vs. all the indices in the array, and 
    // returning all but the one that is passed through
    const updated = characters.filter((character, i) => {
        return i !== index
      });

      // re-render child components inside setCharacters
      setCharacters(updated);
  }

  // delete async function 
  async function deleteUser(id) {
    try {

      // delete a user by id
      const response = await axios.delete('http://localhost:5001/users/' + id);

      // return response to caller
      return response;

    }
    catch(error) {

      // report error
      console.log(error);

      // fail
      return false;

    }
  }

  // return result data
  function updateList(person) {
    
    // 
    makePostCall(person).then( result => {
    
      // check if result is valid and result status = 201
      if (result && result.status === 201)
  
        // assign person with result.data (holds new ID generated)
        person = result.data;

        // set the characters and display in table
       setCharacters([...characters, person] );
    });
  }

  // - async functions -
  // - return value = A Promise which will be resolved with the 
  //value returned by the async function, or rejected with an 
  // exception thrown from, or uncaught within, the async function

  // return list of users in the backend
  async function fetchAll(){
    try {

      // - await call (non-blocking operation) allows frontend to 
      // run other threads if needed
      // await only valid in async functions 
       const response = await axios.get('http://localhost:5001/users');

       // return list of users from backend
       return response.data.users_list;     
    }
    catch (error){

       // We're not handling errors. Just logging into the console.
       console.log(error); 

       // return false if error arises
       return false;         
    }
  }

  // function that waits for a post to be made
  async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5001/users', person);

     // pass response to caller
     return response;
  }
  catch (error) {

    // console log error
     console.log(error);

     // return false if error arises
     return false;
  }
  }

  // fetch all users in backend at start of app (on mount)
  useEffect(() => {
    fetchAll().then( result => {
     if (result)
        setCharacters(result);
    });
  }, [] );  

  return (
    <div className="container">
      {/* - pass removeOneCharacter function as a prop to Table */}
      {/* - added prop is removeCharacter and value is return removeOneCharacter */}
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;