// impoprt express module
const express = require('express');

// create an instance of express
const app = express();
const port = 5001;

// process incoming data in JSON format
app.use(express.json());

// see a '/', return Hello World!
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// backend server listening to incoming http requests on specified port number
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


// list of users 
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

// retrieving all users 
//  app.get('/users', (req, res) => {
//     res.send(users);
// });


// query a certain user by name
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

// find a particular name in the user's list
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

// finished step 4 COMMIT CHANGES to backendBranch