import React from 'react'

// function displays the table columns (Name, Job, ID, and Remove)
function TableHeader()  {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>ID</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
}

// added row.id 
function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.name}</td>
           <td>{row.job}</td>
           <td>{row.id}</td>
          <td>
            {/* - pass index through as a parameter, so the removeOneCharacter 
            function knows which item to remove  */}
            {/* added row.id to know which user to delete*/}
            <button onClick={() => props.removeCharacter(index, row.id)}>Delete</button>
          </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
}

function Table (props) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
    </table>
  );
}

export default Table;