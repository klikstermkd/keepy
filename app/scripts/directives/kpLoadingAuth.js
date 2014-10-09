(function() {

   'use strict';

   /* @ngInject */
   function kpLoadingAuth($rootScope, AuthService, $state) {

      var message = '';

      return {
         scope: {
            user: '=',
            action: '@'
         },
         link: function(scope, elem) {

            $rootScope.errorMsg = '';

            elem.bind('click', function() {
               if (scope.action === 'login') {
                  elem[0].textContent = 'Logging in...';
                  AuthService.login(scope.user).then(function() {
                     $state.go('notes', {}, {location: 'replace'});
                     $rootScope.errorMsg = '';
                  }, function(error) {
                     elem[0].textContent = 'Log in';
                     message = error.message.substr(42, error.message.length);
                     $rootScope.errorMsg = message;
                  });
               } else if (scope.action === 'register') {
                  elem[0].textContent = 'Registering in...';
                  AuthService.register(scope.user).then(function() {
                     $state.go('login');
                     $rootScope.errorMsg = '';
                  }, function(error) {
                     elem[0].textContent = 'Register';
                     message = error.message.substr(42, error.message.length);
                     $rootScope.errorMsg = message;
                  });
               }
            });

         }
      };
   }

   angular
      .module('keepyApp.directives')
         .directive('kpLoadingAuth', kpLoadingAuth);

})();
