(function() {

   'use strict';

   /* @ngInject */
   function EditNoteController(note, $state, NotesService) {

      var editNoteCtrl = this;

      var location = $state.current.name;

      if (location === 'edit') {
         editNoteCtrl.fromNotes = true;
      }

      editNoteCtrl.note = note;

      editNoteCtrl.save = function(note) {

         editNoteCtrl.note.$update({title: note.title, text: note.text});

         if (location === 'edit') {
            $state.go('notes');
         } else {
            $state.go('archive');
         }

      };

      editNoteCtrl.archive = function(note) {

         var noteForArchive = angular.copy(note);

         NotesService.remove(note.$id).then(function() {
            NotesService.addToArchive(noteForArchive);
         });

         $state.go('notes');

      };

      editNoteCtrl.unarchive = function(note) {

         var unarchivedNote = angular.copy(note);

         NotesService.add(unarchivedNote).then(function() {
            NotesService.removeFromArchive(note.$id);
         });

         $state.go('notes');

      };

      editNoteCtrl.remove = function() {

         editNoteCtrl.note.$remove();

         if (location === 'edit') {
            $state.go('notes');
         } else {
            $state.go('archive');
         }

      };

   }

   angular
      .module('keepyApp.controllers')
      .controller('EditNoteController', EditNoteController);

})();
