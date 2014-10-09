/* global Firebase */

(function() {

   'use strict';

   /* @ngInject */
   function NotesService($q, $firebase, FIREBASE_URL, AuthService) {

      var notesRef = new Firebase(FIREBASE_URL + 'notes');
      var notes = $firebase(notesRef);

      var archivedNotesRef = new Firebase(FIREBASE_URL + 'archive');
      var archivedNotes = $firebase(archivedNotesRef);

      var Notes = {
         getAll: function(user) {
            var defer = $q.defer();
            var notesRef = new Firebase(FIREBASE_URL + 'notes');
            var notes = $firebase(notesRef.startAt(user.id).endAt(user.id));
            defer.resolve(notes);
            return defer.promise;
         },
         getAllArchived: function(user) {
            var defer = $q.defer();
            var notes = $firebase(archivedNotesRef.startAt(user.id).endAt(user.id));
            defer.resolve(notes);
            return defer.promise;
         },
         getOne: function(noteId) {
            var defer = $q.defer();
            var noteRef = new Firebase(FIREBASE_URL + 'notes/' + noteId);
            var note = $firebase(noteRef);
            defer.resolve(note);
            return defer.promise;
         },
         getOneArchived: function(noteId) {
            var defer = $q.defer();
            var archivedNoteRef = new Firebase(FIREBASE_URL + 'archive/' + noteId);
            var note = $firebase(archivedNoteRef);
            defer.resolve(note);
            return defer.promise;
         },
         add: function(note) {
            var currentUser = AuthService.currentUser();

            var newNote = {
               $priority: currentUser.id,
               text: note.text,
               title: note.title,
               userId: currentUser.id
            };

            return notes.$add(newNote);
         },
         addToArchive: function(note) {
            var currentUser = AuthService.currentUser();

            var newNote = {
               $priority: currentUser.id,
               text: note.text,
               title: note.title,
               userId: currentUser.id
            };

            return archivedNotes.$add(newNote);
         },
         remove: function(noteId) {
            return notes.$remove(noteId);
         },
         removeFromArchive: function(noteId) {
            return archivedNotes.$remove(noteId);
         }
      };

      return Notes;

   }

   angular
      .module('keepyApp.services')
      .factory('NotesService', NotesService);

})();
