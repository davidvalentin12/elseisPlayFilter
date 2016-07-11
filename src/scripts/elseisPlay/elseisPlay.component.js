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
    function elseisPlayCtrl($window, $scope) {

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
            setImgUrl();
            //jQuery('.play').each(function(i, el) {
            //    window.setTimeout(function(){
            //        jQuery(el).addClass('animated bounceInUp');
            //    }, 100 * i);
            //});
        };

        self.redirectToPlay = function redirectToPlay(){
            $window.location.href = self.play.link;
        };


        function setImgUrl(){
            if(self.play.miniatura){
                var miniatura = self.play.miniatura;
                self.play.miniatura = miniatura.slice(0, miniatura.length-4)+ '-630x370'+miniatura.slice(miniatura.length-4, miniatura.length);
            }

        }


    }
})();
