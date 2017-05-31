window.addEventListener('load', function() {

  var webAuth = new auth0.WebAuth({
    domain: 'njkrauss1.auth0.com/',
    clientID: 'KKy0mLFfms63O4uMKL6sa9iNEfPea6oY',
    redirectUri: window.location.href,
    audience: 'https://njkrauss1.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  var loginBtn = document.getElementById('loginbutton');

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

});
