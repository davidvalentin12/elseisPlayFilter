(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name elseis.playFilter.components:elseisPlay
     * @description
     *
     */

    angular.module('elseis.playFilter').component('elseisPlay', {
            bindings: {
                play: '<'
            },
            controller: elseisPlayCtrl,
            controllerAs: 'elseisPlayCtrl',
            templateUrl: 'src/scripts/elseisPlay/elseisPlay.tpl.html'
        }
    );

    /**
     * @ngdoc controller
     * @name elseis.playFilter.controllers:elseisPlayCtrl
     * @description
     *
     */
    function elseisPlayCtrl() {

        var self = this;


        /**
         * @ngdoc method
         * @name $onInit
         * @methodOf elseis.playFilter.controllers:elseisPlayCtrl
         * @description
         *
         */
        self.$onInit = function $onInit() {
        };


        self.$onChanges = function (changesObject) {
            console.log(changesObject);
        }


    }
})();
