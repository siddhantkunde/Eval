const express = require('express');
const dbSetup = require('./db/db_setup');
const router=require('./routes');

const { json } = require('express/lib/response');
const Users=require('./db/models/users');

dbSetup();

const app = express();
app.use(express.json());
app.use(bodyParser.json());


// get the user data as a response
 app.get("/users", async(request, response, next) => {
    Users.query().then(users=>{
      response.json(users)
    })
    
    })
    

//Get users data as a response using Id
 app.get('/users/:id', async(req,res,next)=>{
    try{
      const{ id }=req.params;
      const users = await Users.query().findById(id);
      res.json(users);

    }catch(err){
       console.error(err);
       res.status(500).json(err);
    }

 });
//Deleting data using id
 app.delete('/users/:id', async(req,res,next)=>{
   try{
     const{ id }=req.params;
     const users = await Users.query().deleteById(id);
     res.json(users);

   }catch(err){
      console.error(err);
      res.status(500).json(err);
   }

});

//Inserting data into db

 app.post('/users/post',async(req,res)=>{
   try{      
      const users = await Users.query().insert({
         username: "John Doe",
         password:"om12"
       });
      res.json(users);
 
   }
   catch(err) {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
   };
 });



app.use(express.json());

app.use(router);
app.listen(8080, () => console.log('server listening on port'));
