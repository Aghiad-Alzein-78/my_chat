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
        print('removed')
    }
    return arr
}
module.exports={
    print,
    removeItem
}