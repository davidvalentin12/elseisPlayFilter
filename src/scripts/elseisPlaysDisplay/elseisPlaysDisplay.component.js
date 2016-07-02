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
                plays: '<',
                orderBy: '<',
                filter: '<'
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
        };


        self.$onChanges = function (changesObject) {
            self.localPlays = angular.copy(self.plays);
            setLikesToNumber();
            setViewsToNumber();
            setFormatedDate();
            onOrderByChange(changesObject);
            onFilterChange(changesObject);

        }

        function onFilterChange(changesObject){
            if (changesObject.filter) {
                if (changesObject.filter.currentValue == 'antesDeHoyYHoy') {
                    var currentDate = new Date();
                    self.localPlays = self.localPlays.filter(function (play) {
                        return new Date(play.estreno) <= currentDate;
                    })
                }
                if (changesObject.filter.currentValue == 'despuesDeHoy') {
                    var currentDate = new Date();
                    self.localPlays = self.localPlays.filter(function (play) {
                        return new Date(play.estreno) > currentDate;
                    })

                }
            }
        }
        function onOrderByChange(changesObject){
            if (changesObject.orderBy) {
                self.orderBy = changesObject.orderBy.currentValue;
            }
        }


        function setLikesToNumber() {
            self.localPlays.forEach(function (play) {
                play.likes = parseInt(play.likes);
            })
        }

        function setViewsToNumber() {
            self.localPlays.forEach(function (play) {
                play.views = parseInt(play.views);
            })
        }

        function setFormatedDate() {
            self.localPlays.forEach(function (play) {
                /**
                 * recived: 20160101
                 * wanted: 2016-01-01
                 */
                var estreno = play.estreno;
                play.estreno = estreno.slice(0, 4) + '-' + estreno.slice(4, 6) + '-' + estreno.slice(6, 8);

            })


        }


    }
})();
