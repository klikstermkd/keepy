(function() {

   'use strict';

   /* @ngInject */
   function UserService($rootScope, $window, $state, AuthService) {

      var User = {
         logout: function() {

            $state.go('login', {}, {location: 'replace'});
            AuthService.logout();
            $rootScope.signedIn = false;

            $window.addEventListener('popstate', function() {
               $state.go('login');
            });

         }
      };

      return User;

   }

   angular
      .module('keepyApp.services')
      .factory('UserService', UserService);

})();
