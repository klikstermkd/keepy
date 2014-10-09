/* global Firebase */

(function() {

   'use strict';

   /* @ngInject */
   function AuthService($rootScope, $q, $firebaseSimpleLogin, $state, FIREBASE_URL) {

      var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseSimpleLogin(ref);

      var Auth = {
         register: function(user) {
            return auth.$createUser(user.email, user.password, true);
         },
         login: function(user) {
            return auth.$login('password', user);
         },
         logout: function() {
            return auth.$logout();
         },
         redirectIfAuthenticated: function() {
            var defer = $q.defer();

            return $firebaseSimpleLogin(ref).$getCurrentUser()
               .then(function(user) {
                  if (user) {
                     defer.reject();
                     $state.go('notes');
                  } else {
                     defer.resolve();
                  }

                  return defer.promise;
               });
         },
         isAuthenticated: function() {
            var defer = $q.defer();

            return $firebaseSimpleLogin(ref).$getCurrentUser()
               .then(function(user) {
                  if (user) {
                     defer.resolve();
                     $rootScope.signedIn = true;
                  } else {
                     defer.reject();
                     $rootScope.signedIn = false;
                     $state.go('login');
                  }

                  return defer.promise;
               });
         },
         currentUser: function() {
            return auth.user;
         },
         remoteCurrentUser: function() {
            var defer = $q.defer();

            return $firebaseSimpleLogin(ref).$getCurrentUser()
               .then(function(user) {
                  if (user) {
                     defer.resolve(user);
                  } else {
                     defer.reject();
                  }

                  return defer.promise;
               });
         }
      };

      return Auth;

   }

   angular
      .module('keepyApp.services', [])
      .factory('AuthService', AuthService);

})();
