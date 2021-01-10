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

const historySchema = new mongoose.Schema({
    username: { type : String ,  required: [ true , " No name specified...!"  ] },
    lastSendBy : { type : String ,  required: [ true , " No sendBy specified...!"  ] } ,
    lastMsg : { type : String ,  required: [ true , " No msg specified...!"   ] },
    lastMsgTime : { type : Date ,required: [ true , " No date specified...!"  ] },
    unRead  : { type : Number , default:0 }
});

const collectionSchema = new mongoose.Schema ({
    username : { type : String , required: [ true , " No name specified...!"     ] },
    password : { type : String , required: [ true , " No password specified...!" ] },
    refreshToken : { type : String } ,
    history  : { type : [historySchema] } ,
});

const chatSchema = new mongoose.Schema({
    sendBy : { type : String ,  required: [ true , " No sendBy specified...!"  ] } ,
    msg    : { type : String ,  required: [ true , " No msg specified...!"  ] } ,
    msgTime: { type : Date ,  required: [ true , " No Date specified...!"  ] } ,
    read   : { type : Boolean , default: false },
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

            const accessToken  = jwt.sign({username:req.body.username} , process.env.ACCESS_TOKEN_SECRET , {expiresIn:"15m"} );
            const refreshToken = jwt.sign({username:req.body.username} , process.env.REFRESH_TOKEN_SECRET );
            await users.updateOne( {username:req.body.username} , {refreshToken:refreshToken} );
            res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000  } );
            res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );

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

app.get( "/log-out" , async (req,res) => {
    try{
        const payload = await jwt.verify( req.cookies['accessToken'] , process.env.ACCESS_TOKEN_SECRET);
        await users.updateOne( { username : payload.username } , { refreshToken : null } );
        res.clearCookie( "accessToken");
        res.clearCookie( "refreshToken");
        res.status(201).send("LOGGED OUT...!");
    } catch {
        try{
            const payload = await jwt.verify( req.cookies['refreshToken'] , process.env.REFRESH_TOKEN_SECRET);
            const user = await users.findOne({ username : payload.username });
            if ( user.refreshToken !== req.cookies['refreshToken'] ) throw ("TOKEN NOT MATCHING TOKEN IN DATABASE") ;
            await users.updateOne( { username : payload.username } , { refreshToken : null } );
            res.clearCookie( "accessToken");
            res.clearCookie( "refreshToken");
            res.status(201).send("LOGGED OUT...!");
        } catch (e) { return res.status(401).send( e ); }
    }
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

app.get("/history-list" , authenticateToken , async (req,res) => {
    try {
        const user = await users.findOne( {'username' : req.username } );
        res.status(201).json( { 'historyList' : [...user.history] });
    } catch (e){
        res.status(401).send(e);
    }
});

app.post("/search-user" , authenticateToken ,  async ( req , res ) => {
    try{
        const userList = await users.find( { 'username' : new RegExp(req.body.searchText,"i") } 
            , [ "username" ] , {limit:25} );
        res.status(201).json( { 'userList' : userList } );
    }catch(e){
        res.send(e).status(401);
    }
});

app.post("/chat-with" , authenticateToken , async (req,res) => {
    try{
        const sortedName = [req.username,req.body.chatingWith].sort();
        const chatDB = await new mongoose.model( sortedName[0]+"CHATS"+sortedName[1] , 
            chatSchema , sortedName[0]+"CHATS"+sortedName[1] );
        await chatDB.updateMany( {'sendBy':req.body.chatingWith,'read':false} , {'read':true} );
        await users.updateOne({'username':req.username , 'history.username':req.body.chatingWith} , 
            { $set : { 'history.$.unRead': 0 }} );
        const allChat = await chatDB.find();
        res.status(200).json({allChat:allChat});
    } catch (e) {
        res.status(401).send(e);
    }
});
app.post("/send-msg" , authenticateToken , async (req,res) => {
    try{
        const sortedName = [req.username,req.body.chatingWith].sort();
        const chatDB = await new mongoose.model( sortedName[0]+"-chats-"+sortedName[1] , 
            chatSchema , sortedName[0]+"CHATS"+sortedName[1] );
        await chatDB({sendBy : req.username , msg : req.body.msg , msgTime: new Date() }).save();

        const sender = await users.findOne({ username : req.username });
        if (!(sender.history.some( item => item.username === req.body.chatingWith) )) {
            console.log("reached2...");
            await users.updateOne( {username:req.username} , 
                { $push : {  history : { username:req.body.chatingWith , lastMsg:req.body.msg , 
                    lastMsgTime:new Date() , lastSendBy : req.username } } } );
            await users.updateOne( {username:req.body.chatingWith} , 
                { $push : {  history : { username:req.username , lastMsg:req.body.msg , 
                    lastMsgTime:new Date() , lastSendBy : req.body.chatingWith , unRead : 1  } } } );
        } else {
            await users.updateOne( {'username':req.username , 'history.username':req.body.chatingWith} , 
                { $set : { 'history.$.lastMsg':req.body.msg , 'history.$.lastMsgTime':new Date() , 'history.$.lastSendBy':req.username  } } );
            const user = await users.findOne( {'username':req.body.chatingWith , 'history.username':req.username } );
            const prevUnRead = user.history.find( item => item.username === req.username ).unRead;
            await users.updateOne( {'username':req.body.chatingWith , 'history.username':req.username } , 
                { $set : { 'history.$.lastMsg':req.body.msg , 'history.$.lastMsgTime':new Date() , 'history.$.lastSendBy':req.username , 'history.$.unRead':prevUnRead + 1 } } );
        }

        res.status(200).send("message-sended");
    } catch (e){
        res.status(401).send(e);
    }
});