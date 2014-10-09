(function() {

   'use strict';

   /* @ngInject */
   function AppController(UserService) {

      var appCtrl = this;

      appCtrl.menuToggle = {
         isCollapsed: true
      };

      appCtrl.menuItems = {
         notes: 'Notes',
         archive: 'Archive',
         login: 'Log in',
         register: 'Register',
         logout: 'Log out'
      };

      appCtrl.logout =  function() {
         UserService.logout();
      };

   }

   angular
      .module('keepyApp.controllers', [])
      .controller('AppController', AppController);

})();
