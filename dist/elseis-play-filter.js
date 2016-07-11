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

        'dvm.templates',
          'restangular'
      ]);

}());

(function() {
  'use strict';

  angular.module('elseis.playFilter')
      .config(["RestangularProvider", function(RestangularProvider) {
        RestangularProvider.setFullResponse(true);
        RestangularProvider.setBaseUrl('http://alltheater.elseis.es/wp-json/wp/v2/');


      }])
}());
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name elseis.playFilter.components:elseisPlay
     * @description
     *
     */

    elseisPlayCtrl.$inject = ["$window", "$scope"];
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

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name elseis.playFilter.components:elseisPlayFilter
     * @description
     *
     */

    elseisPlayFilterCtrl.$inject = ["Restangular", "$window", "$timeout"];
    angular.module('elseis.playFilter').component('elseisPlayFilter', {
            bindings: {
                taxonomy: '<',
                term: '<',
                kw: '<'
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
    function elseisPlayFilterCtrl(Restangular, $window, $timeout) {

        var self = this;
        self.handleClickOnLetter = handleClickOnLetter;
        self.letterIsSelected = letterIsSelected;
        self.toggleDropdown = toggleDropdown;
        self.selectDropdownOption = selectDropdownOption;
        self.loadAllPlays = loadAllPlays;
        self.loadAllAuthors = loadAllAuthors;
        self.handleAuthorSelection = handleAuthorSelection;
        self.loadPlaysFilteredByKW = loadPlaysFilteredByKW;
        self.loadWithoutPagination = loadWithoutPagination;


        /**
         * @ngdoc method
         * @name $onInit
         * @methodOf elseis.playFilter.controllers:elseisPlayFilterCtrl
         * @description
         *
         */
        self.$onInit = function $onInit() {
            self.loadAllPlays();
            self.loadAllAuthors();
        };


        self.plays = [];
        self.allPages = false;
        self.currentSearchfilter = 'obras-api/?';
        function loadAllPlays() {
            // reset total pages
            self.totalPages = 0;

            setSearchFilter();
            var playsApi;

            playsApi = Restangular.all(self.currentSearchfilter);
            playsApi.getList().then(function (response) {
                if (self.plays.length != response.data.length) {
                    self.plays = response.data;
                }
                setPagesInfo(response);
            });
        }

        function setPagesInfo(response) {
            self.totalPages = parseInt(response.headers()['x-wp-totalpages']);
            self.totalPlays = parseInt(response.headers()['x-wp-total']);
        }

        function loadWithoutPagination() {
            self.allPages = true;
            self.loadAllPlays();
        }

        function setSearchFilter() {
            //base
            self.currentSearchfilter = 'obras-api/?';
            //category
            if (self.filter != '') {
                self.currentSearchfilter = self.currentSearchfilter + '&' + self.filter;
            }
            //taxonomy
            if (self.taxonomy != '') {
                self.currentSearchfilter = self.currentSearchfilter + '&filter[taxonomy]=' + self.taxonomy;
            }
            //term
            if (self.term != '') {
                self.currentSearchfilter = self.currentSearchfilter + '&filter[term]=' + self.term;
            }
            //key word
            if (self.kw != '') {
                self.currentSearchfilter = self.currentSearchfilter + '&filter[kw]=' + self.kw;
            }
            //pagination
            if (self.allPages) {
                self.currentSearchfilter = self.currentSearchfilter + '&filter[posts_per_page]=-1&filter[paged]=1';
            } else {
                self.currentSearchfilter = self.currentSearchfilter + '&filter[posts_per_page]=4&filter[paged]=1';
            }
        }

        /*
         * INPUT
         */
        self.kwInput = '';
        function loadPlaysFilteredByKW() {
            if ((self.kwInput.length > 3 || self.kwInput.length == 0) && self.kwInput != self.kw) {
                self.kw = self.kwInput;
                delay(self.loadAllPlays, 500);
            }
        }

        var delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();





        self.selectedLetter = '';
        self.abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        /**
         * @name handleClickOnLetter
         * @description
         *  handles the click on a letter, by setting this one to the selected one.
         * @param letter
         */
        function handleClickOnLetter(letter) {
            self.selectedLetter = letter;
            resetSelectedAuthor();
            filterAuthorsByFirstLetter(letter);
        }

        self.displayedAuthors = [];
        function filterAuthorsByFirstLetter(selectedLetter) {
            if (self.authors) {
                self.displayedAuthors = self.authors.filter(function (author) {
                    var firstLetter = author.name.slice(0, 1).toUpperCase();

                    return firstLetter == selectedLetter.toUpperCase();
                });
            }
        }

        self.authors = [];
        self.selectedAuthor = '';
        function loadAllAuthors() {
            var authorsApi = Restangular.all('autor');
            authorsApi.getList().then(function (response) {
                self.authors = response.data;
            });
        }

        function handleAuthorSelection(author) {
            $window.location.href = author.link;
        }

        function resetSelectedAuthor() {
            self.selectedAuthor = '';
        }

        /**
         * @name  letterIsSelected
         * @description
         * Return if the letter is the selected one or not.
         * @param letter
         */
        function letterIsSelected(letter) {
            return self.selectedLetter == letter;

        }


        /*
         * DROPDOWN
         */
        self.dropdownVisible = false;
        self.dropdownOptions = ['más actuales', 'más visitas', 'mejor valoradas', 'próximamente'];
        self.selectedDropdownOption = 'más actuales';
        function toggleDropdown() {
            self.dropdownVisible = !self.dropdownVisible;
        }

        function selectDropdownOption(option) {
            self.selectedDropdownOption = option;
            self.toggleDropdown();
            _filterByDropdownCategory(option);
        }


        function _filterByDropdownCategory() {
            /**
             * 'más actuales': estreno <= hoy // order by fecha estreno desc
             *
             * 'más visitas': order by views
             *
             * 'mejor valoradas': order by likes
             *
             * 'próximamente':  estreno > hoy // order by fecha estreno asc
             *
             *
             */
            if (self.selectedDropdownOption == 'más actuales') {
                self.filter = 'filter[meta_compare]=%3C%3D&filter[meta_value]=20160708&filter[meta_key]=estreno&filter[order]=DESC&filter[orderby]=meta_value_num';
            }
            if (self.selectedDropdownOption == 'próximamente') {
                self.filter =  'filter[meta_compare]=%3E&filter[meta_value]=20160708&filter[meta_key]=estreno&filter[order]=ASC&filter[orderby]=meta_value_num';
            }
            if (self.selectedDropdownOption == 'mejor valoradas') {
                self.orderBy = 'likes';
                self.filter = 'filter[meta_key]=_touchsize_likes&filter[order]=DESC&filter[orderby]=meta_value_num';
            }
            if (self.selectedDropdownOption == 'más visitas') {
                self.orderBy = 'views';
                self.filter = 'filter[meta_key]=ts_article_views&filter[order]=DESC&filter[orderby]=meta_value_num';
            }


            self.loadAllPlays();
        }


    }
})();

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

(function () {
    'use strict';


    angular.module('elseis.playFilter')
        .filter('masActuales', function () {
            return function (obras) {
                return obras.filter(function (obra) {
                    return
                })
            };
        })
        .filter('mejorValoradas', ["$filter", function ($filter) {
            return function (obras) {
                
            };
        }]);


})();

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
        elseisPlayFilterService.$inject = ["Restangular"];
        this.$get = elseisPlayFilterService;



        function elseisPlayFilterService(Restangular) {

            var self = this;
            
            self.getAllPlays = function(){}


            return self;
        }
    });




})();
