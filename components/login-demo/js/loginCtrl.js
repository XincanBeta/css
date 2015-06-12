//, 'css!loginCss/login.css'
define(['./module'], function (login) {
  'use strict';
  login.controller('LoginCtrl', ['$scope', '$state', '$q', '$timeout', 'loginService', function ($scope, $state, $q, $timeout, loginService) {
    // 仅用于测试
    //loginService.clearLoginStatus();

    if (loginService.isLogin()) {
      $state.go('home');
    }

    var textfield = $("input[name=user]");
    $('button[type="submit"]').click(function (e) {
      e.preventDefault();
      //little validation just to check username
      if (textfield.val() != "") {
        //$("body").scrollTo("#output");
        $("#output").addClass("alert alert-success animated fadeInUp")
          .html("欢迎回来 " + "<span style='text-transform:uppercase'>" + textfield.val() + "</span>")
          .removeClass(' alert-danger');
        $("input").css({
          "height": "0",
          "padding": "0",
          "margin": "0",
          "opacity": "0"
        });
        //change button text
        $('button[type="submit"]').html("继续")
          .removeClass("btn-info")
          .addClass("btn-default").click(function () {
            $("input").css({
              "height": "auto",
              "padding": "10px",
              "opacity": "1"
            }).val("");
          });

        $q(function (resolve) {
          //show avatar
          $(".avatar").css({
            "background-image": "url('app/login/img/me.jpeg')"
          });
          $timeout(function () {
            resolve();
          }, 700);
        }).then(function () {
          $state.go('home');
        })

        loginService.loginSuccess();

      } else {
        //remove success mesage replaced with error message
        $("#output").removeClass(' alert alert-success')
          .addClass("alert alert-danger animated fadeInUp").html("请输入用户名");
      }
      //console.log(textfield.val());

    });


  }]);
});

