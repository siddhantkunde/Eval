const express = require('express');
const router=require('./routes');
const bodyParser = require("body-parser");
const { json } = require('express/lib/response');
//const database=require('db/seeds/dev.js');
const Users=require('./db/models/users');
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const SECRET = "node1234"

const bcrypt = require ("bcrypt")
var corsOptions = {
    origin: "http://localhost:8081"
  };
  app.use(cors(corsOptions));
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

// save user data via request
  app.post("/users/post", (request, response, next) => {
    bcrypt.hash(request.body.password, 10)
    .then(hashedPassword => {
       return Users("users").insert({
          username: request.body.username,
          password_digest: hashedPassword
       })
       .returning(["id", "username"])
       .then(users => {
          response.json(users[0])
       })
       .catch(error => next(error))
    })
 })
// get the user data as a response
 app.get("/users", (request, response, next) => {
    Users("users")
    .then(users => {
       response.json(users)
    })
 })

// login with user data in database
 app.post("/login", async(request, response, next) => {
   new Users("users")
    .where({username: request.body.username})
    .first()
    .then(users => {
       if(!users){
          response.status(401).json({
             error: "No user by that name"
          })
       }else{
          return bcrypt
          .compare(request.body.password, users.password_digest)
          .then(isAuthenticated => {
             if(!isAuthenticated){
                response.status(401).json({
                   error: "Unauthorized Access!"
                })
             }else{
                return jwt.sign(users, SECRET, (error, token) => {
                   response.status(200).json({token})
                })
             }
          })
       }
    })
 })

 // verify 

 app.get("/verify", (request, response, next) => {
    const token = request.headers.authorization.split(" ")[1]
    jwt.verify(token, SECRET, (error, decodedToken) => {
       if(error){
          response.status(401).json({
             message: "Unauthorized Access!"
          })
       }else{
          response.status(200).json({
             id: decodedToken.id,
             username: decodedToken.username
          })
       }
    })
 })

app.use(express.json());

app.use(router);
app.listen(8080, () => console.log('server listening on port'))
