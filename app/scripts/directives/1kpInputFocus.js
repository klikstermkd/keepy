(function() {

   'use strict';

   function kpInputFocus() {
      return {
         require: 'ngModel',
         link: function(scope, element, attrs, ctrl) {

            ctrl.$focused = false;

            element.bind('focus', function() {
               scope.$apply(function() { ctrl.$focused = true; });
            }).bind('blur', function() {
               scope.$apply(function() { ctrl.$focused = false; });
            });

         }
      };
   }

   angular
      .module('keepyApp.directives', [])
      .directive('kpInputFocus', kpInputFocus);

})();
