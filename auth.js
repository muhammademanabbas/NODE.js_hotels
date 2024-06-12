const passport  =  require('passport');
const localStrategy  =  require('passport-local').Strategy;
const Person = require('./model/person.js');

passport.use(new localStrategy(async (username, password, done)=>{
    try {
      console.log('---------I am the Passport\'s Local Strategy------------');
      console.log(`Recieving Credientials :${username, password}`) ;  
      let PersonData  = await Person.findOne({username:username})  ; 
      if(!PersonData){
        console.log('USER is not FOUND !!'); 
        return done(null, false , {message : 'Incorrect Username !!'});
      }
      const isPasswordMatch  = PersonData.password === password ? true : false ;
      if(isPasswordMatch){
        return done(null, username);
      }
      else{
        return done(null , false , {message : 'Incorrect Password !!'})
      }
    } catch (error) {
      return done("Error Message",error.message);
    }
  }));

  module.exports  = passport ; 