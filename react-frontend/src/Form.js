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

  // - function will run every time input is changed
  // - function above will be called every time one of the fields 
  // (name or job) changes its value 
  function handleChange(event) {

    // one event at a time
    const { name, value } = event.target;

    // name equals job
    if (name === "job")

      // set the name of person
      setPerson(
         {name: person['name'], job: value}
      );
    else     

       // set the job of the person
       setPerson(
         {name: value, job: person['job']}   
       );
  }


  // function called when submit button is clicked
  function submitForm() {
    
    // props handleSubmit function
    props.handleSubmit(person);

    // clear the form after submit (button)
    setPerson({name: '', job: ''});
  }

  // - form to submit name and job of a person
  // - render return call
  return (

    // - form = section containing interactive 
    // controls for submitting information
    <form>

      {/* represents a caption for an item in a user interface */}
      <label htmlFor="name">Name</label>
      <input

        // render a plaintext input field
        type="text"

        // name for input control
        name="name"

        // defines unique id
        id="name"

        // input control's value
        value={person.name}

        onChange={handleChange} />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange} />

        {/* - input = used to create interactive controls for 
        web-based forms in order to accept data from the user */}
        <input type="button" value="Submit" onClick={submitForm} />
    </form>

);

}
export default Form;