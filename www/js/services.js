angular.module('app.services', ['ngColorThis', 'ngTouch', 'selectionModel', 'ngSanitize']).factory('HackerNews', function() {
  return new Firebase('https://hacker-news.firebaseio.com/v0');
});