// impoprt express module
const express = require('express');

// import cors
const cors = require('cors');

// create an instance of express
const app = express();
const port = 5001;

// enable cors requests
app.use(cors());

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

// users object with users_list array of objects
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

// query (get) users by name or by name and job
app.get('/users', (req, res) => {

    // get the name of the person
    const name = req.query.name;

    // get the job of the person
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
    
    // create unique id
    randomID = generateRandomID();
    console.log(randomID)

    // assign unique id
    req.body.id = randomID

    // user to add 
    const userToAdd = req.body;

    console.log(userToAdd);
    console.log(typeof(userToAdd))

    // call add user function
    addUser(userToAdd);

    // send status code 201 and user to be added (with ID)
    res.status(201).send(userToAdd).end();
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

        // remove user by index 
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

// add user to user's list
function addUser(user){
    users['users_list'].push(user);
}

// generate random ID
function generateRandomID() {
    
    // initialize array
    numArray = [];

    // counter = 0
    counter = 0;
    
    // generate three random number
    while(counter < 3){

        // generate random number between 0-9
        randomNum = Math.floor(Math.random() * 10);

        // add random number to array
        numArray.push(randomNum);

        // increment counter
        counter = counter + 1;
    }

    // convert array to string
    numString = numArray.join("");
    //console.log("Number", numString)

    // generate 3 random characters 
    randomChars = Math.random().toString(36).substring(2,5);
    //console.log("Char", randomChars);

    // concat the two strings together
    randomId = numString.concat(randomChars);
    //console.log(randomId);

    return randomId;
}