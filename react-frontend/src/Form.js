import React, {useState} from 'react';


// 
function Form(props) {

  // initialize object with empty properties
  const [person, setPerson] = useState(
     {
        name: "",
        job: "",
        // added id variable
        id: ""
     }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson(
         {name: person['name'], job: value}
      );
    else     
       setPerson(
         {name: value, job: person['job']}   
       );
  }

  function submitForm() {
    
    props.handleSubmit(person);

    setPerson({name: '', job: ''});
  }

  // form to submit name and job of a person
  return (
    <form>
    <input type="button" value="Submit" onClick={submitForm} />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange} />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange} />
    </form>
);


}
export default Form;