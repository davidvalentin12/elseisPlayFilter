(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name elseis.playFilter.components:elseisPlaysDisplay
     * @description
     *
     */

    angular.module('elseis.playFilter').component('elseisPlaysDisplay', {
            bindings: {
                plays: '<'
            },
            controller: elseisPlaysDisplayCtrl,
            controllerAs: 'elseisPlaysDisplayCtrl',
            templateUrl: 'src/scripts/elseisPlaysDisplay/elseisPlaysDisplay.tpl.html'
        }
    );

    /**
     * @ngdoc controller
     * @name elseis.playFilter.controllers:elseisPlaysDisplayCtrl
     * @description
     *
     */
    function elseisPlaysDisplayCtrl() {

        var self = this;


        /**
         * @ngdoc method
         * @name $onInit
         * @methodOf elseis.playFilter.controllers:elseisPlaysDisplayCtrl
         * @description
         *
         */
        self.$onInit = function $onInit() {
            console.log(self.plays);
        };


        self.$onChanges = function (changesObject) {
            console.log(changesObject);
        }


    }
})();
