(function() {
    'use strict';

    /**
     * @ngdoc provider
     * @name elseis.playFilter.provider:elseisPlayFilterService
     * @description
     *
     */

    angular.module('elseis.playFilter').provider('elseisPlayFilterService', function(){

        /**
         * @ngdoc service
         * @name elseis.playFilter.service:elseisPlayFilterService
         * @description
         *
         */
        this.$get = elseisPlayFilterService;



        function elseisPlayFilterService(Restangular) {

            var self = this;
            
            self.getAllPlays = function(){}


            return self;
        }
    });




})();
