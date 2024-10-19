const {Strategy, ExtractJwt}=require('passport-jwt');
const User=require('../models/user');

module.exports=(passport)=>{
    const opts={
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };
    passport.use(new Strategy(opts, (jwt_payload, done)=>{
        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            });
    }));
};