var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let google = require('../../config/google.json');
passport.use(new GoogleStrategy({
  clientID: google.clientID,
  clientSecret: google.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
     User.findOrCreate({ googleId: profile.id }, function (err, user) {
       return done(err, user);
     });
}
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
  res.redirect('/');
  });