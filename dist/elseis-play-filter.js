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

        //'dvm.templates',
          'restangular'
      ]);

}());

(function() {
  'use strict';

  angular.module('elseis.playFilter')
      .config(["RestangularProvider", function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://alltheater.elseis.es/wp-json/wp/v2/');


      }]).run(["Restangular", function(Restangular){
    
  }]);
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


    /**
     * @ngdoc method
     * @name $onInit
     * @methodOf elseis.playFilter.controllers:elseisPlayFilterCtrl
     * @description
     *
     */
    self.$onInit = function $onInit() {
      var obrasApi = Restangular.all('obras-api');
      obrasApi.getList().then(function(obras) {
        console.log(obras);
        self.obras = obras;
        obras.forEach(function(obra) {
          console.log(obra);
        })
      });
    };


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
    self.dropdownVisible = true;
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

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name elseis.playFilter.components:elseisPlaysDisplay
   * @description
   *
   */

  angular.module('elseis.playFilter').component('elseisPlaysDisplay', {
        bindings: {},
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




  }
})();
