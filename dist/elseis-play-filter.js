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
        RestangularProvider.setBaseUrl('http://alltheater.elseis.es/wp-json/wp/v2/');


      }])
}());
(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name elseis.playFilter.components:elseisPlayFilter
   * @description
   *
   */

  elseisPlayFilterCtrl.$inject = ["Restangular"];
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
  function elseisPlayFilterCtrl(Restangular) {

    var self = this;
    self.handleClickOnLetter = handleClickOnLetter;
    self.letterIsSelected = letterIsSelected;
    self.toggleDropdown = toggleDropdown;
    self.selectDropdownOption = selectDropdownOption;
    self.loadAllPlays = loadAllPlays;
    self.loadAllAuthors = loadAllAuthors;
    self.handleAuthorSelection = handleAuthorSelection;
    self.loadPlaysFilteredByKW = loadPlaysFilteredByKW;


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
    self.currentSearchfilter= 'obras-api/?';
    function loadAllPlays() {
      self.currentSearchfilter= 'obras-api/?';
      var playsApi;
      if (self.taxonomy != '') {
        self.currentSearchfilter =  self.currentSearchfilter + '&filter[taxonomy]=' + self.taxonomy;
      }
      if (self.term != '') {
        self.currentSearchfilter =  self.currentSearchfilter + '&filter[term]=' + self.term;
      }
      if (self.kw != '') {
        self.currentSearchfilter =  self.currentSearchfilter + '&filter[kw]=' + self.kw;
      }
      //pagination
      self.currentSearchfilter =  self.currentSearchfilter + '&filter[posts_per_page]=-1&filter[paged]=1';


      playsApi = Restangular.all( self.currentSearchfilter);
      playsApi.getList().then(function(play) {
        self.plays = play;
      });
    }
    self.kwInput = '';
    function loadPlaysFilteredByKW(){
      self.kw = self.kwInput;
      self.loadAllPlays();
    }






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
      self.displayedAuthors = self.authors.filter(function(author) {
        var firstLetter = author.name.slice(0, 1).toUpperCase();

        return firstLetter == selectedLetter.toUpperCase();
      });
    }

    self.authors = [];
    self.selectedAuthor = '';
    function loadAllAuthors() {
      var authorsApi = Restangular.all('autor');
      authorsApi.getList().then(function(authors) {
        self.authors = authors;
      });
    }

    function handleAuthorSelection(author) {
      self.selectedAuthor = author;
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
                filter: '<',
                authorFilter: '<'
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

            onAuthorFilterChange(changesObject);
            onOrderByChange(changesObject);
            onFilterChange(changesObject);
            if (self.localSelectedAuthor != undefined) {
                filterPlaysByAuthor();
            }
            if (self.localCategoryFilter != undefined) {
                filterPlaysByCategory();
            }
        };

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
                 * recived: 20160101
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
        };

        self.redirectToPlay = function redirectToPlay(){
            $window.location.href = self.play.link;
        };


        function setImgUrl(){
            var miniatura = self.play.miniatura;
            self.play.miniatura = miniatura.slice(0, miniatura.length-4)+ '-630x370'+miniatura.slice(miniatura.length-4, miniatura.length);

        };


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
