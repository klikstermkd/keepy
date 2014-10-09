(function() {

   'use strict';

   function kpCapitalizeFirst() {
      return {
         require: 'ngModel',
         link: function(scope, element, attrs, modelCtrl) {

            var capitalize = function(inputValue) {
               var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);

               if (capitalized !== inputValue) {
                  modelCtrl.$setViewValue(capitalized);
                  modelCtrl.$render();
               }

               return capitalized;
            };

            modelCtrl.$parsers.push(capitalize);
            // capitalize(scope[attrs.ngModel]);  // capitalize initial value
         }
      };
   }

   angular
      .module('keepyApp.directives')
      .directive('kpCapitalizeFirst', kpCapitalizeFirst);

})();
