(function() {

   'use strict';

   var firstTime = true;

   /* @ngInject */
   function kpNotesMason($timeout) {

      var timeoutMs;

      return {
         link: function(scope, el) {


            if (scope.note.text.length <= 10) {
               el[0].children[0].style.fontSize = '45px';
            } else if (scope.note.text.length <= 20) {
               el[0].children[0].style.fontSize = '38px';
            } else if (scope.note.text.length <= 35) {
               el[0].children[0].style.fontSize = '30px';
            } else if (scope.note.text.length <= 55) {
               el[0].children[0].style.fontSize = '22px';
            } else if (scope.note.text.length <= 80) {
               el[0].children[0].style.fontSize = '16px';
            }


            if (scope.$last) {

               if (firstTime) {
                  $timeout(function() {
                     var container = document.querySelector('#masonry');
                     var mason = new Masonry(container, {
                        itemSelector: '.item',
                        transitionDuration: 0
                     });
                  }, 200, false);
                  firstTime = false;
               } else {
                  var container = document.querySelector('#masonry');
                  var mason = new Masonry(container, {
                     itemSelector: '.item',
                     transitionDuration: 0
                  });
               }
            }

         }
      };
   }

   angular
      .module('keepyApp.directives')
      .directive('kpNotesMason', kpNotesMason);

})();
