require('dotenv').config();
const express      = require("express"); const app = express();
const cors         = require('cors');
const cookieParser = require("cookie-parser");
const bcrypt       = require("bcrypt");
const jwt          = require("jsonwebtoken");
const mongoose     = require("mongoose");

app.use(cors( { origin : "http://localhost:3000" , credentials : true } )); 
app.use(cookieParser());
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
            res.status(201).send("ACCOUNT CREATED...!");
        } else { res.status(401).send("USERNAME ALREADY EXIST"); }
    } catch (e){ res.status(500).send(e); }
});


app.post("/log-in", async ( req , res ) => {
    try { 
        const user = await users.findOne({ username : req.body.username });
        if( user === null ){
            res.status(401).send("NO SUCH USERS");
        } else if( await bcrypt.compare( req.body.password , user.password ) ){
            const accessToken  = jwt.sign({username:user.username} , process.env.ACCESS_TOKEN_SECRET , {expiresIn:"15m"} );
            const refreshToken = jwt.sign({username:user.username} , process.env.REFRESH_TOKEN_SECRET );
            await users.updateOne( {username:req.body.username} , {refreshToken:refreshToken} );
            res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000  } );
            res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );            
            res.send("LOGGED IN...!");
        } else {
            res.status(401).send("WRONG PASSWORD");   
        }
    } catch (e){ res.status(500).send(e) }
}); 

 /*=================================================================================================*/

const authenticateToken = async ( req , res , next ) => {
    try{
        const payload = await jwt.verify( req.cookies['accessToken'] , process.env.ACCESS_TOKEN_SECRET);
        req.username = payload.username;
    } catch {
        try{
            const payload = await jwt.verify( req.cookies['refreshToken'] , process.env.REFRESH_TOKEN_SECRET);
            const user = await users.findOne({ username : payload.username });
            if ( user.refreshToken !== req.cookies['refreshToken'] ) throw ("TOKEN NOT MATCHING TOKEN IN DATABASE") ;
            const accessToken  = jwt.sign({ username : payload.username } , process.env.ACCESS_TOKEN_SECRET , { expiresIn : "15m" });
            const refreshToken = jwt.sign({ username : payload.username } , process.env.REFRESH_TOKEN_SECRET );
            await users.updateOne( { username : payload.username } , { refreshToken : refreshToken } );
            res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000 } );
            res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );            
            req.username = payload.username;
        } catch (e) { return res.status(401).send( e ); }
    }
    next();
}

app.get("/my-name" , authenticateToken ,  ( req , res ) => {
    req.username && res.json({ username : req.username });
});
