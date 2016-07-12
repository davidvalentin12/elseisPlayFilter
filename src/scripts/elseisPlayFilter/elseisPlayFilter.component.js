(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name elseis.playFilter.components:elseisPlayFilter
     * @description
     *
     */

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
            _filterByDropdownCategory();
            self.loadAllPlays();
            self.loadAllAuthors();
        };


        self.plays = [];
        self.allPages = false;
        self.loading = false;
        self.currentSearchfilter = 'obras-api/?';
        function loadAllPlays() {
            self.loading = true;
            // reset total pages
            self.totalPages = 0;

          if(!self.firstAllPages){
            self.allPages = false;
          }
            setSearchFilter();
            var playsApi;

            playsApi = Restangular.all(self.currentSearchfilter);
            playsApi.getList().then(function (response) {
                self.plays = response.data;
                setPagesInfo(response);
                $timeout(function(){
                    self.loading = false;
                }, 500);

              self.firstAllPages = false;
            });
        }

        function setPagesInfo(response) {
            self.totalPages = parseInt(response.headers()['x-wp-totalpages']);
            self.totalPlays = parseInt(response.headers()['x-wp-total']);
        }

        function loadWithoutPagination() {
            self.allPages = true;
          self.firstAllPages = true;
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

        function letterIsSelected(letter) {
            return self.selectedLetter == letter;
        }


        /*
         * DROPDOWN
         */
        self.dropdownVisible = false;
        self.dropdownOptions = ['más actuales', 'más visitas', 'mejor valoradas', 'próximamente'];
        self.selectedDropdownOption = 'más visitas';
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
                self.filter = 'filter[meta_compare]=%3E&filter[meta_value]=20160708&filter[meta_key]=estreno&filter[order]=ASC&filter[orderby]=meta_value_num';
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
