function print(...vars){
    console.log(...vars)
}

function removeItem(arr,item){
    const index=arr.findIndex((ele)=>{
        if(ele.id===item.id){
            return true;
        }
    })
    if(index!=-1){
        arr.splice(index,1)
    }
    return arr
}

function findSocketId(arr,name){
    for (i=0;i<arr.length;i++){
        if(arr[i].user==name){
            return arr[i].socketID;
        }
    }
    return null
}
module.exports={
    print,
    removeItem,
    findSocketId,
}