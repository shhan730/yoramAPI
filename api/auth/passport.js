const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
      done(null, user);
  });

  passport.deserializeUser((user, done) => {
      done(null, user);
  });

  const google = require('../../config/google.json');
  passport.use(new GoogleStrategy({
    clientID: google.web.client_id,
    clientSecret: google.web.client_secret,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['https://www.googleapis.com/auth/plus.me']
}, function (accessToken, refreshToken, profile, done) {
    const socialId = profile.id;
    const nickname = profile.displayName;
    const profileImageUrl = profile.photos[0].value;

    onLoginSuccess('Google', socialId, nickname, profileImageUrl, done);
}
));

function onLoginSuccess(platformName, socialId, nickname, profileImageUrl, done) {
    models.User.create({
        platformName: platformName,
        socialId: socialId,
        nickname: nickname,
        profileImageUrl: profileImageUrl,
      })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        if(err.name === 'SequelizeUniqueConstraintError'){
          return res.status(409).end();
        }
        res.status(500).end();
      })
      done(null, user);
};

}