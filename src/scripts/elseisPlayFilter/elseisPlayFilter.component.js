(function() {
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
  function elseisPlayFilterCtrl( Restangular) {

    var self = this;
    self.handleClickOnLetter = handleClickOnLetter;
    self.letterIsSelected = letterIsSelected;
    self.toggleDropdown = toggleDropdown;
    self.selectDropdownOption = selectDropdownOption;
    self.loadAllPlays = loadAllPlays;


    /**
     * @ngdoc method
     * @name $onInit
     * @methodOf elseis.playFilter.controllers:elseisPlayFilterCtrl
     * @description
     *
     */
    self.$onInit = function $onInit() {
      self.loadAllPlays();
    };


    self.plays = [];
    function loadAllPlays(){
      var playsApi = Restangular.all('obras-api');
      playsApi.getList().then(function(play) {
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
    self.dropdownOptions = ['más actuales', 'más visitas', 'mejor valoradas', 'próximamente', 'últimos días'];
    self.selectedDropdownOption = 'más actuales';
    function toggleDropdown(){
      self.dropdownVisible = !self.dropdownVisible;
    }
    function selectDropdownOption(option){
      self.selectedDropdownOption = option;
      self.toggleDropdown();
    }


  }
})();
