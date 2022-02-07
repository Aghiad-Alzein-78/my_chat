function print(...vars){
    console.log(...vars)
}
const btnSend=document.getElementById('btnSend');
const messageBox=document.getElementById('messages')
const userName=document.getElementById('userName');
const btnConnect=document.getElementById('connect');
const idText=document.getElementById('ID');
const receiver=document.getElementById('receiver')
const online=document.getElementById('onLine');
const message=document.getElementById('message');
let onlineMembers;
let id;

const socket=io();

function getIdFromName(onlineArr,name){
    for(i=0;i<onlineArr.length;i++){
        ele=onlineArr[i];
        if(ele.user==name){
            print("yes")
            return ele.id
        }
    }
    return null
}

socket.on('connect',()=>{
    print("Connected")
})
socket.on('currentOnLine',(data)=>{
    members=""
    if(data.length!=0){
        for(i=0;i<data.length;i++){
            members+=data[i].user+',';
        }
    }
    online.innerHTML=members
    onlineMembers=data;
    print(onlineMembers)
})
btnConnect.addEventListener('click', ()=>{
    
    id=`${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}`;
    idText.value=id;
    const user=userName.value;
    socket.emit('userData',{userName:user,userID:id})
})
btnSend.addEventListener('click',()=>{
    const senderId=getIdFromName(onlineMembers,receiver.value)
    
    // socket.emit('message',{socketID:socket.id,to:senderId,from:""})
})

//Todo figuring sending message