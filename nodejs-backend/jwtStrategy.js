const passportJWT=require('passport-jwt')
const path=require('path')
const fs=require('fs')
require('dotenv').config()
const ExtractJwt=passportJWT.ExtractJwt

const jwtStrategy=new passportJWT.Strategy(
    {
      secretOrKey: process.env.JWT_SECRET||'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
     (payload, done) => {
      let {userList} =  fs.readFileSync(path.join(__dirname,'fakedb.json'));

      if (userList.filter(item=>item.login==='') > 0) {
        let user = matchedUser[0];
        return done(null, user);
      } else {
        return done(new Error("User not found"), null);
      }
    }
  );
module.exports=jwtStrategy