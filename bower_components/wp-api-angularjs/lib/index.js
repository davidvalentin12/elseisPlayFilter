module.exports = angular.module('wp-api-angularjs', [
    require('./Provider').name,
    require('./Rest/Services').name
]);