(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/elseisPlay/elseisPlay.tpl.html',
    '<div class=play><div class=image-holder-div><img ng-src={{elseisPlayCtrl.play.miniatura}} ng-click=elseisPlayCtrl.redirectToPlay() a></div><div class=play-details><label class=play-title ng-bind=elseisPlayCtrl.play.title.rendered ng-click=elseisPlayCtrl.redirectToPlay()></label><label class=play-director>Director {{elseisPlayCtrl.play.director}}</label><label class=play-year>Año {{elseisPlayCtrl.play.year}}</label><label class=play-year>views {{elseisPlayCtrl.play.views}}</label><label class=play-year>likes {{elseisPlayCtrl.play.likes}}</label></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/elseisPlayFilter/elseisPlayFilter.tpl.html',
    '<div class=""><section class=letter-filter><div class=row><label class="letter-fitler-description col-lg-4 col-sm-12">Explora los títulos por autor {{elseisPlayFilterCtrl.selectedAuthor.name}}</label><div class="letter-list col-lg-8 col-sm-12"><ul><li class=letter ng-repeat="letter in elseisPlayFilterCtrl.abecedario" ng-bind="letter | uppercase" ng-click=elseisPlayFilterCtrl.handleClickOnLetter(letter) ng-class="{\'selected-letter\': elseisPlayFilterCtrl.letterIsSelected(letter)}"></li></ul></div></div><div class="row autoresList"><ul><li class=col-lg-3 ng-repeat="author in elseisPlayFilterCtrl.displayedAuthors" ng-bind=author.name ng-click=elseisPlayFilterCtrl.handleAuthorSelection(author)></li></ul></div></section><section class=filter-input-dropdown><div class=input-filter><input type=text ng-model=elseisPlayFilterCtrl.kwInput ng-change=elseisPlayFilterCtrl.loadPlaysFilteredByKW() placeholder="Busca por título, autor, director, compañía, género, tema..."></div><div class=dropdown-filter><div class=dropdown-label ng-click=elseisPlayFilterCtrl.toggleDropdown()><label ng-bind="elseisPlayFilterCtrl.selectedDropdownOption | uppercase"></label></div><div class=dropdown ng-show=elseisPlayFilterCtrl.dropdownVisible><ul class=dropdown-options><li class="dropdown-option dropdown-label" ng-repeat="dropdownOption in elseisPlayFilterCtrl.dropdownOptions" ng-click=elseisPlayFilterCtrl.selectDropdownOption(dropdownOption)><label ng-bind="dropdownOption | uppercase"></label></li></ul></div></div></section><section class="plays-display row"><elseis-plays-display plays=elseisPlayFilterCtrl.plays order-by=elseisPlayFilterCtrl.orderBy filter=elseisPlayFilterCtrl.filter author-filter=elseisPlayFilterCtrl.selectedAuthor.id></elseis-plays-display></section></div>');
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
    '<elseis-play ng-repeat="play in elseisPlaysDisplayCtrl.localPlays | orderBy:elseisPlaysDisplayCtrl.orderBy:\'desc\' " play=play class="item col-lg-3 col-md-3 col-sm-12"></elseis-play>');
}]);
})();
