const express=require('express');
const path=require('path');
const {print,removeItem}=require('./utils');
const PORT=3000;

app=express();
const publicViews=path.join(__dirname,'public_views')
app.use(express.static(path.join(__dirname,'public')));
const server=app.listen(3000,"127.0.0.1",()=>{
    print("Server Running on port 3000")
})
const socketIO=require('socket.io');
const io=socketIO(server);
currentlyOnline=[];

app.get('/', (req,res)=>{
    res.sendFile(path.join(publicViews,'client.html'))
    
})
function modifyOnlineList(socket){
    socket.broadcast.emit('currentOnLine',currentlyOnline);
}

io.on('connection',(socket)=>{
    modifyOnlineList(socket)
    socket.on('userData',(data)=>{
        socket.data.userName=data.userName;
        socket.data.userId=data.userID;
        currentlyOnline.push({user:data.userName,id:data.userID});
        io.emit('currentOnLine',currentlyOnline)
    })
    socket.on('disconnect',()=>{
        userName=socket.data.userName;
        userID=socket.data.userId;
        removeItem(currentlyOnline,{user:userName,id:userID})
        modifyOnlineList(socket)
    })

})


