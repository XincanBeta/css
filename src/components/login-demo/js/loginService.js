define(['./module'], function (login) {
  login.service('loginService', ['$local', function ($local) {
    this.loginSuccess = function(){
      $local.set('loginSuccess', true, '1 day');
    }

    this.isLogin = function(){
      return $local.get('loginSuccess');
    }

    this.clearLoginStatus = function(){
      $local.remove("loginSuccess")
    }
  }])
})
