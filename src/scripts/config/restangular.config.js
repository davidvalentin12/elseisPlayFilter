(function() {
  'use strict';

  angular.module('elseis.playFilter')
      .config(function(RestangularProvider) {
        RestangularProvider.setFullResponse(true);
        RestangularProvider.setBaseUrl('http://alltheater.elseis.es/wp-json/wp/v2/');


      })
}());