(function() {

   'use strict';

   /* @ngInject */
   var redirectIfAuthenticated = function(AuthService) {
      return AuthService.redirectIfAuthenticated();
   };

   /* @ngInject */
   var isAuthenticated = function($rootScope, AuthService) {
      if (AuthService.currentUser()) {
         $rootScope.signedIn = true;
      } else {
         return AuthService.isAuthenticated();
      }
   };

   var notesData = function(location) {

      /* @ngInject */
      function notes(AuthService, NotesService) {

         var user = AuthService.currentUser();

         function getNotes(user) {
            if (location === 'notes') {
               return NotesService.getAll(user);
            } else if (location === 'archive') {
               return NotesService.getAllArchived(user);
            }
         }

         if (user) {
            return getNotes(user).then(function(data) {
               return data;
            });
         } else {
            return AuthService.remoteCurrentUser().then(function(user) {
               return getNotes(user).then(function(data) {
                  return data;
               });
            });
         }
      }

      return notes;

   };


   var noteData = function(location) {

      /* @ngInject */
      function note(NotesService, $stateParams) {

         function getNote() {
            if (location === 'edit') {
               return NotesService.getOne($stateParams.noteId);
            } else if (location === 'editArchived') {
               return NotesService.getOneArchived($stateParams.noteId);
            }
         }

         return getNote().then(function(data) {
            return data;
         });

      }

      return note;

   };

   /* @ngInject */
   var resolveWith = function($q) {
      return function resolved(val) {
         var dfd = $q.defer();
         dfd.resolve(val);

         return dfd.promise;
      };
   };

   /* @ngInject */
   var delegate = function($delegate) {

      if (angular.isUndefined($delegate.spread)) {
         $delegate.spread = function(targetFn, scope) {
            return function() {
               var params = [].concat(arguments[0]);
               targetFn.apply(scope, params);
            };
         };
      }

      if (angular.isUndefined($delegate.resolve)) {
         $delegate.resolve = resolveWith($delegate);
      }

      return $delegate;
   };

   var templateProvider = function(id) {

      /* @ngInject */
      function template($templateCache) {
         return $templateCache.get(id);
      }

      return template;

   };

   /* @ngInject */
   function config($provide, $locationProvider, $urlRouterProvider, $stateProvider) {

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
         .state('login', {
            url: '/login',
            templateUrl: '/views/login.html',
            resolve: {
               redirectIfAuthenticated: redirectIfAuthenticated
            }
         })
         .state('register', {
            url: '/register',
            templateUrl: '/views/register.html',
            resolve: {
               redirectIfAuthenticated: redirectIfAuthenticated
            }
         })
         .state('notes', {
            url: '/',
            controller: 'NotesController',
            controllerAs: 'notesCtrl',
            resolve: {
               isAuthenticated: isAuthenticated,
               notes: notesData('notes')
            },
            templateProvider: templateProvider('notes.html')
         })
         .state('archive', {
            url: '/archive',
            controller: 'NotesController',
            controllerAs: 'notesCtrl',
            resolve: {
               isAuthenticated: isAuthenticated,
               notes: notesData('archive')
            },
            templateProvider: templateProvider('notes.html')
         })
         .state('add', {
            url: '/add',
            controller: 'NoteController',
            controllerAs: 'noteCtrl',
            resolve: {
               isAuthenticated: isAuthenticated
            },
            templateProvider: templateProvider('note.html')
         })
         .state('edit', {
            url: '/edit/:noteId',
            controller: 'EditNoteController',
            controllerAs: 'editNoteCtrl',
            resolve: {
               isAuthenticated: isAuthenticated,
               note: noteData('edit')
            },
            templateProvider: templateProvider('editNote.html')
         })
         .state('editArchived', {
            url: '/editArchived/:noteId',
            controller: 'EditNoteController',
            controllerAs: 'editNoteCtrl',
            resolve: {
               isAuthenticated: isAuthenticated,
               note: noteData('editArchived')
            },
            templateProvider: templateProvider('editNote.html')
         });

      // Register our $log decorator with AngularJS $provider
      $provide.decorator('$q', delegate);

   }

   /* @ngInject */
   function run($rootScope) {
      $rootScope.$on('$stateChangeSuccess', function() {
         $rootScope.appInit = true;
      });
   }

   angular
      .module('keepyApp', ['ui.router',
                           'firebase',
                           'keepyApp.controllers',
                           'keepyApp.services',
                           'keepyApp.directives',
                           'keepyApp.constants',
                           'keepyApp.filters'])
      .config(config)
      .run(run);

})();
