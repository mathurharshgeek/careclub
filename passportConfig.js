const LocalStrategy=require('passport-local').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// const db=require('./db');
const userData=require('./models/userData')
exports.initializingPassport=(passport)=>{
passport.use(new LocalStrategy( {usernameField:'email'},async(email,password,done)=>{
    let user=await userData.findOne({u_email:email})            
           if(!user){
             done(null,false)

           }else{
            if(user.u_password !== password ){
               done(null,false)
          }
             done(null,user);
           }
            
          passport.serializeUser((user,done ) => {
                // console.log(user)
        
                      done(null, user);
                      // Saving the user details into session through user._id
                    }
                  );
                
                  passport.deserializeUser((id, done) => {
                    // Getting all the user information from user id
                      done(null, done);
                    
                  });  
}));


passport.use(new GoogleStrategy({
    clientID:     "984387427947-kisrs3h1urgmhbb3ekmg5o69tua4cnos.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://careclubapi.onrender.com/auth/google/callback",
    passReqToCallback : true,
    scope:[ 'email', 'profile' ]
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile);
    return done(null,profile);
  }
));
passport.serializeUser(function(user, done) {
   done(null, user);

    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  
done(null, user);
});

}