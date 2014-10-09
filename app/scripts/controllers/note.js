(function() {

   'use strict';

   /* @ngInject */
   function NoteController($state, NotesService) {

      var noteCtrl = this;

      noteCtrl.note = {
         text: '',
         title: '',
         add: function(note) {
            if (note.title || note.text) {
               $state.go('notes');
               NotesService.add(note);
            }
         }
      };

   }

   angular
      .module('keepyApp.controllers')
      .controller('NoteController', NoteController);

})();
