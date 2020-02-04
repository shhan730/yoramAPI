const express = require('express');
const router = express.Router();
const passport = require('passport');

// 로그인 페이지 진입
router.get('/login', function (req, res) {
  let redirectUrl = req.query.redirectUrl;

  if (redirectUrl) {
      res.cookie("redirectUrl", redirectUrl, {
          expires: new Date(Date.now() + (60 * 1000 * 2)),
          httpOnly: true
      });
  }

  res.render('login', {title: 'Ajou Yoram - 로그인', isLogin: false});
});

// 로그아웃
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// 구글 로그인 시작
router.get('/google', passport.authenticate('google'));

// 구글 로그인 결과 콜백
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

module.exports = router;