// impoprt express module
const express = require('express');

// create an instance of express
const app = express();
const port = 5001;

// process incoming data in JSON format (Middleware)
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

// -- HTTP Methods --

// query (get) users by name
app.get('/users', (req, res) => {

    const name = req.query.name;
    const job = req.query.job;

    // if name and job have been assigned with a value
    if ((name != undefined) && (job != undefined)){
        
        // store found name in userName 
        let userNameJob = findUserByNameJob(name, job);

        // find names and jobs found in user's list
        userNameJob = {users_list: userNameJob}
       
        // send back names and jobs specified 
        res.send(userNameJob)
        
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

// query (get) users by id
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

// add user with POST command
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

// remove user by id
app.delete('/users/:id', (req, res) => {
    
    // assign id 
    const id = req.params['id'];

    // user to be deleted
    let removeUser = findUserById(id);
    
    // error checking 
    if (removeUser === undefined || removeUser.length == 0)
        res.status(404).send('Resource not found.');

    else {
        
        // need index of where to remove user 1st argument
        const userIndex = users['users_list'].indexOf(removeUser);

        // remove user
        users['users_list'].splice(userIndex, 1)

        // return ok code
        res.status(200).end();
    }

});

// -- Functions --

// find a particular name in the user's list
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

// find a particular name and job in the user's list
const findUserByNameJob = (name, job) => {
    return users['users_list'].filter( (user) => (user['name'] === name) || (user['job'] === job));
}

// find a particular id in the user's list
function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// add user
function addUser(user){
    users['users_list'].push(user);
}