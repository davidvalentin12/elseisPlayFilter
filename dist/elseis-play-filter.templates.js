(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/elseisPlayFilter/elseisPlayFilter.tpl.html',
    '<p>hellooo!</p>');
}]);
})();
