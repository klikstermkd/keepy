(function() {

   'use strict';

   /* @ngInject */
   function NotesController(notes, $state) {

      var notesCtrl = this;

      var location = $state.current.name;

      if (location === 'notes') {
         notesCtrl.notesLoc = true;
      }

      notesCtrl.notes = notes;

   }

   angular
      .module('keepyApp.controllers')
      .controller('NotesController', NotesController);

})();
