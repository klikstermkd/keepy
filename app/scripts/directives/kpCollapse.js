(function() {

   'use strict';

   function kpCollapse() {
      return {
         link: function(scope, element, attrs) {

            scope.$watch(attrs.kpCollapse, function (shouldCollapse) {
               if (shouldCollapse) {
                  element.addClass('collapse');
               } else {
                  element.removeClass('collapse');
               }
            });

         }
      };
   }

   angular
      .module('keepyApp.directives')
      .directive('kpCollapse', kpCollapse);

})();
