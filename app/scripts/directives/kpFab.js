(function() {

   'use strict';

   /* @ngInject */
   function kpFab($window, $state) {
      return {
         link: function(scope, el) {

            var position = 0;

            $window.addEventListener('scroll', function() {

               var scroll = $window.scrollY;

               if (scroll > position) {
                  el[0].classList.add('fab-hide');
               } else {
                  el[0].classList.remove('fab-hide');
               }

               position = scroll;
            });

            el.bind('click', function() {
               $state.go('add');
            });

         }
      };
   }

   angular
      .module('keepyApp.directives')
      .directive('kpFab', kpFab);

})();
