(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name
   *
   * @description
   *
   */
  angular.module(
      'elseis.playFilter',

      // DEPENDENCIES
      [

        //'dvm.templates',
        'wp-api-angularjs'
      ]);

}());

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name elseis.playFilter.components:elseisPlayFilter
   * @description
   *
   */

  angular.module('elseis.playFilter').component('elseisPlayFilter', {
        bindings: {

        },
        controller: elseisPlayFilterCtrl,
        controllerAs: 'elseisPlayFilterCtrl',
        templateUrl: 'src/scripts/elseisPlayFilter/elseisPlayFilter.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name elseis.playFilter.controllers:elseisPlayFilterCtrl
   * @description
   *
   */
  function elseisPlayFilterCtrl() {

    var self = this;

    /**
     * @ngdoc method
     * @name $onInit
     * @methodOf elseis.playFilter.controllers:elseisPlayFilterCtrl
     * @description
     *
     */
    self.$onInit = function $onInit() {

    };

  }
})();

(function() {
  'use strict';

  angular.module('elseis.playFilter')
      .config(["WpApiProvider", function(WpApiProvider) {
        WpApiProvider.setBaseUrl('http://www.example.com/wp-json/');
      }]);
}());