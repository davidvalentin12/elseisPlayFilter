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
