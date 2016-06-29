(function() {
  'use strict';

  angular.module('elseis.playFilter')
      .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://alltheater.elseis.es/wp-json/wp/v2/');


      }).run(function(Restangular){
    
  });
}());