require('dotenv').config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

app.use(express.json());
app.listen(3001,() => console.log("Server Started"));

mongoose.connect( "mongodb://localhost:27017/" + "chatting-app" , 
    { useNewUrlParser:true , useUnifiedTopology: true} );

const collectionSchema = new mongoose.Schema ({
    username : { type : String , required: [ true , " No name specified...!"     ] },
    password : { type : String , required: [ true , " No password specified...!" ] },
    refreshToken : { type : String }
});
const users = mongoose.model( "Users" , collectionSchema );

app.get("/", ( req , res ) => {
    res.send("Hello world");
});

app.post("/sign-up", async ( req , res ) => {
    try{
        const userlist = await users.findOne({ username : req.body.username });
        if (userlist === null){
            const hashedPass = await bcrypt.hash( req.body.password , 10 );
            const userdata   = { username : req.body.username , password : hashedPass };
            await users(userdata).save();
            res.send("ACCOUNT CREATED...!");
        } else { res.send("USERNAME ALREADY EXIST"); }
    } catch (e){ res.send("ERROR : \n" + e ); }
});


app.post("/log-in", async ( req , res ) => {
    try {
        const user = await users.findOne({ username : req.body.username });
        if( user === null ){
            res.send("NO SUCH USERS");
        } else if( await bcrypt.compare( req.body.password , user.password ) ){
            const accessToken   = jwt.sign({username:user.username} , process.env.ACCESS_TOKEN_SECRET , { expiresIn : 40 } );
            const refreshToken = jwt.sign({username:user.username} , process.env.REFRESH_TOKEN_SECRET );
            await users.updateOne( {username:req.body.username} , {refreshToken:refreshToken} );
            res.json({ accessToken : accessToken , refreshToken : refreshToken });
            // res.send("LOGGED IN...!");
        } else {
            res.send("WRONG PASSWORD");   
        }
    } catch (e){ res.send("ERROR : \n" + e ) }
}); 

 /*=================================================================================================*/

const authenticateToken = async ( req , res , next ) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null){
        return res.send("NO AUTHORIZATION HEADER IS AVAILABLE");
    }
    else {
        try{
            const payload = await jwt.verify( token , process.env.ACCESS_TOKEN_SECRET);
            req.username = payload.username;
        } catch (e) { return res.send("WRONG TOKEN \n" + e ); }
    }
    next();
}

app.get("/my-name" , authenticateToken ,  ( req , res ) => {
    req.username && res.send("Your name is " + req.username );
});

/*==================================================================================================*/

app.post("/revoke-access-token" , async (req,res) => {
    if ( req.body.refreshToken === null ){
        return res.send("RESPONSE TOKEN NOT FOUND");
    }
    try{
        const payload = await jwt.verify(req.body.refreshToken , process.env.REFRESH_TOKEN_SECRET);
        const accessToken  = jwt.sign({ username : payload.username } , process.env.ACCESS_TOKEN_SECRET , { expiresIn : 40 });
        const refreshToken = jwt.sign({ username : payload.username } , process.env.REFRESH_TOKEN_SECRET );
        res.json({ accessToken : accessToken , refreshToken : refreshToken });
    } catch (e) { res.send( "ERROR : \n" + e ); }
});