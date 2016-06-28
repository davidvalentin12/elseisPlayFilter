(function() {
  'use strict';

  angular.module('elseis.playFilter')
      .config(function(WpApiProvider) {
        WpApiProvider.setBaseUrl('http://www.example.com/wp-json/');
      });
}());