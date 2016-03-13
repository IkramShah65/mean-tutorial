'use strict';

angular.module('meanTutorialApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('games', {
        url: '/games',
        template: '<games></games>'
      });
  });
