(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name elseis.playFilter.components:elseisPlayFilter
     * @description
     *
     */

    angular.module('elseis.playFilter').component('elseisPlayFilter', {
            bindings: {},
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
    function elseisPlayFilterCtrl(Restangular) {

        var self = this;
        self.handleClickOnLetter = handleClickOnLetter;
        self.letterIsSelected = letterIsSelected;
        self.toggleDropdown = toggleDropdown;
        self.selectDropdownOption = selectDropdownOption;
        self.loadAllPlays = loadAllPlays;
        self.loadAllAuthors = loadAllAuthors;
        self.handleAuthorSelection = handleAuthorSelection;


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
        function loadAllPlays() {
            var playsApi = Restangular.all('obras-api');
            playsApi.getList().then(function (play) {
                self.plays = play;
            });
        }


        self.selectedLetter = undefined;
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
            self.displayedAuthors = self.authors.filter(function (author) {
                var firstLetter = author.name.slice(0, 1).toUpperCase();

                return firstLetter == selectedLetter.toUpperCase();
            });
        }

        self.authors = [];
        self.selectedAuthor = '';
        function loadAllAuthors() {
            var authorsApi = Restangular.all('autor');
            authorsApi.getList().then(function (authors) {
                self.authors = authors;
            });
        }
        function handleAuthorSelection(author){
            self.selectedAuthor = author;
        }
        function resetSelectedAuthor(){
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


        function _filterByDropdownCategory(category) {
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
            if (category == 'más actuales') {
                self.filter = 'antesDeHoyYHoy';
            }
            if (category == 'próximamente') {
                self.filter = 'despuesDeHoy';
            }
            if (category == 'mejor valoradas') {
                self.orderBy = 'likes';
                self.filter = 'todos';
            }
            if (category == 'más visitas') {
                self.orderBy = 'views';
                self.filter = 'todos';
            }


        }


    }
})();
