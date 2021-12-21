const passportLocal=require('passport-local')
const fs=require('fs')
const path=require('path')
const localStrategy=new passportLocal.Strategy((username,password,done)=>{
    let users=fs.readFileSync(path.join(__dirname,'fakedb.json'),{encoding:'utf-8'})
    let parsed=JSON.parse(users)
    console.log(parsed)
    let {userList}=parsed
    let result=userList.filter(item=>item.username===username&&item.password===password)
    if(result.length>0){
        return done(null,result[0])
    }else{
        return done(new Error('The username or password is wrong'),null)
    }
})

module.exports=localStrategy