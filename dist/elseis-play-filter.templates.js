(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/elseisPlayFilter/elseisPlayFilter.tpl.html',
    '<div class=""><section class=letter-filter><label class=letter-fitler-description>Explora los títulos por autor</label><div class=letter-list><ul><li class=letter ng-repeat="letter in elseisPlayFilterCtrl.abecedario" ng-bind="letter | uppercase" ng-click=elseisPlayFilterCtrl.handleClickOnLetter(letter) ng-class="{\'selected-letter\': elseisPlayFilterCtrl.letterIsSelected(letter)}"></li></ul></div></section><section class=filter-input-dropdown><div class=input-filter><input type=text placeholder="Busca por título, autor, director, compañía, género, tema..."></div><div class=dropdown-filter><div class=dropdown-label ng-click=elseisPlayFilterCtrl.toggleDropdown()><label ng-bind="elseisPlayFilterCtrl.selectedDropdownOption | uppercase"></label></div><div class=dropdown ng-show=elseisPlayFilterCtrl.dropdownVisible><ul class=dropdown-options><li class="dropdown-option dropdown-label" ng-repeat="dropdownOption in elseisPlayFilterCtrl.dropdownOptions" ng-click=elseisPlayFilterCtrl.selectDropdownOption(dropdownOption)><label ng-bind="dropdownOption | uppercase"></label></li></ul></div></div></section><section><elseis-plays-display></elseis-plays-display></section></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/elseisPlaysDisplay/elseisPlaysDisplay.tpl.html',
    '<div>HELLO!!! I WILL BE THE PLAY DISPLAY COMPONENT!!</div>');
}]);
})();
