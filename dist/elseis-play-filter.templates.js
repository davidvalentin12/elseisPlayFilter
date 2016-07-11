(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/elseisPlay/elseisPlay.tpl.html',
    '<div class=play><div class=image-holder-div><img ng-src={{elseisPlayCtrl.play.miniatura}} ng-click=elseisPlayCtrl.redirectToPlay()></div><div class=play-details><label class=play-title ng-bind=elseisPlayCtrl.play.title.rendered ng-click=elseisPlayCtrl.redirectToPlay()></label><label class=play-director>Director {{elseisPlayCtrl.play.director}}</label><label class=play-year>Año {{elseisPlayCtrl.play.year}}</label></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/elseisPlayFilter/elseisPlayFilter.tpl.html',
    '<div class=""><section class=letter-filter><div class=row><label class="letter-fitler-description col-lg-4 col-sm-12">Explora los títulos por autor {{elseisPlayFilterCtrl.selectedAuthor.name}}</label><div class="letter-list col-lg-8 col-sm-12"><ul><li class=letter ng-repeat="letter in elseisPlayFilterCtrl.abecedario" ng-bind="letter | uppercase" ng-click=elseisPlayFilterCtrl.handleClickOnLetter(letter) ng-class="{\'selected-letter\': elseisPlayFilterCtrl.letterIsSelected(letter)}"></li></ul></div></div><div class="row autoresList"><ul><li class=col-lg-3 ng-repeat="author in elseisPlayFilterCtrl.displayedAuthors" ng-bind=author.name ng-click=elseisPlayFilterCtrl.handleAuthorSelection(author)></li></ul></div></section><section class="filter-input-dropdown row"><div class=input-filter><input type=text ng-model=elseisPlayFilterCtrl.kwInput ng-change=elseisPlayFilterCtrl.loadPlaysFilteredByKW() placeholder="Busca por título, autor, director, compañía, género, tema..."> <i class="fa fa-search"></i></div><div class=dropdown-filter><div class=dropdown-label ng-click=elseisPlayFilterCtrl.toggleDropdown() ng-class="{\'dropdown-active\':elseisPlayFilterCtrl.dropdownVisible}"><label ng-bind="elseisPlayFilterCtrl.selectedDropdownOption | uppercase"></label><i class="fa pull-right" ng-class="{\'fa-caret-up\':elseisPlayFilterCtrl.dropdownVisible, \'fa-caret-down\':!elseisPlayFilterCtrl.dropdownVisible}"></i></div><div class="dropdown animated fadeIn" ng-if=elseisPlayFilterCtrl.dropdownVisible><ul class=dropdown-options><li class="dropdown-option dropdown-label" ng-repeat="dropdownOption in elseisPlayFilterCtrl.dropdownOptions" ng-click=elseisPlayFilterCtrl.selectDropdownOption(dropdownOption)><label ng-bind="dropdownOption | uppercase"></label></li></ul></div></div></section><section class="load-all row"><label class=pull-left>Mostrando {{elseisPlayFilterCtrl.plays.length}} de {{elseisPlayFilterCtrl.totalPlays}} obras</label><label class="pull-right load-all-label" ng-click=elseisPlayFilterCtrl.loadWithoutPagination() ng-if="elseisPlayFilterCtrl.totalPlays > 4 && !elseisPlayFilterCtrl.allPages">Ver todas</label></section><section class="plays-display row" ng-show=!elseisPlayFilterCtrl.loading><elseis-plays-display plays=elseisPlayFilterCtrl.plays order-by=elseisPlayFilterCtrl.orderBy></elseis-plays-display></section><section class="loader-display row" ng-show=elseisPlayFilterCtrl.loading><div class=loader></div></section></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/elseisPlaysDisplay/elseisPlaysDisplay.tpl.html',
    '<elseis-play ng-repeat="play in elseisPlaysDisplayCtrl.localPlays | orderBy:elseisPlaysDisplayCtrl.orderBy:\'desc\' " play=play class="item col-lg-3 col-md-3 col-sm-12"></elseis-play>');
}]);
})();
