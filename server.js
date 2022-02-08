const express=require('express');
const path=require('path');
const {print,removeItem,findSocketId}=require('./utils');
const PORT=3000;

app=express();
const publicViews=path.join(__dirname,'public_views')
app.use(express.static(path.join(__dirname,'public')));
const server=app.listen(3000,"192.168.1.110",()=>{
    print("Server Running on port 3000")
})
const socketIO=require('socket.io');
const io=socketIO(server);
currentlyOnline=[];

app.get('/', (req,res)=>{
    res.sendFile(path.join(publicViews,'client.html'))
    
})
// {socketID:socket.id,user:data.userName,id:data.userID}

function getSocketsId(currentlyOnLineList,senderName,receiverName){
    senderID=findSocketId(currentlyOnLineList,senderName);
    receiverID=findSocketId(currentlyOnLineList,receiverName);
    return [senderID,receiverID];
}

function modifyOnlineList(socket){
    io.emit('currentOnLine',currentlyOnline)
}

io.on('connection',(socket)=>{
    modifyOnlineList(socket)
    socket.on('userData',(data)=>{
        socket.data.userName=data.userName;
        socket.data.userId=data.userID;
        currentlyOnline.push({socketID:socket.id,user:data.userName,id:data.userID});
        modifyOnlineList(socket)
    })
    socket.on('disconnect',()=>{
        userName=socket.data.userName;
        userID=socket.data.userId;
        removeItem(currentlyOnline,{socketID:socket.id,user:userName,id:userID})
        modifyOnlineList(socket)
    })
    socket.on('sendMessage',(data)=>{
        const sender=data.senderName;
        const receiver=data.receiverName;
        print(sender,receiver)
        const message=data.message;
        const[senderID,receiverID]=getSocketsId(currentlyOnline,sender,receiver);
        io.to(receiverID).emit('receiveMessage',{senderName:sender,message:message});
        
    })

})


