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
               //orderBy: '<',
               //filter: '<',
               //authorFilter: '<',
                totalPages: '<',
                totalPlays: '<',
                loadWithoutPagination: '&'
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
            //setLikesToNumber();
            //setViewsToNumber();
            //setFormatedDate();
            //onOrderByChange(changesObject);
            //onFilterChange(changesObject);
            //if (self.localCategoryFilter != undefined) {
            //    filterPlaysByCategory();
            //}
        };

        function mergePlays(newPlays, oldPlays){
            newPlays.forEach(function(newPlay, index){
                if(self.localPlays.every(function(oldPlay){return newPlay.id != oldPlay.id;})){
                    self.localPlays.push(newPlay);
                }
            });
            self.localPlays.forEach(function(oldPlay, index){
                if(newPlays.every(function(newPlay){return newPlay.id != oldPlay.id})){
                    
                    self.localPlays.splice(index,1);
                }
            })
        }

        function onFilterChange(changesObject) {
            if (changesObject.filter) {
                self.localCategoryFilter = changesObject.filter.currentValue;
            }
        }
        function onOrderByChange(changesObject) {
            if (changesObject.orderBy) {
                self.orderBy = changesObject.orderBy.currentValue;
            }
        }
        function onAuthorFilterChange(changesObject) {
            if (changesObject.authorFilter) {
                self.localSelectedAuthor = changesObject.authorFilter.currentValue;
            }
        }
        self.localSelectedAuthor = undefined;
        function filterPlaysByAuthor() {
            self.localPlays = self.localPlays.filter(function (play) {
                return play.autor[0] == self.localSelectedAuthor;
            })
        }
        self.localCategoryFilter = undefined;
        function filterPlaysByCategory() {

            var currentDate = new Date();
            if (self.localCategoryFilter == 'antesDeHoyYHoy') {
                self.localPlays = self.localPlays.filter(function (play) {
                   
                    return new Date(play.estreno) <= currentDate;
                })
            }
            if (self.localCategoryFilter == 'despuesDeHoy') {
                self.localPlays = self.localPlays.filter(function (play) {
                    
                    return new Date(play.estreno) > currentDate;
                })
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
                 * received: 20160101
                 * wanted: 2016-01-01
                 */
                
                var estreno = play.estreno;
                play.estreno = estreno.slice(0, 4) + '-' + estreno.slice(4, 6) + '-' + estreno.slice(6, 8);
            })


        }


    }
})();
