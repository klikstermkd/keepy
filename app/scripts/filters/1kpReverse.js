(function() {

   'use strict';

   function kpReverse() {
      return function(items) {
         return items.slice().reverse();
      };
   }

   angular
      .module('keepyApp.filters', [])
      .filter('kpReverse', kpReverse);

})();
