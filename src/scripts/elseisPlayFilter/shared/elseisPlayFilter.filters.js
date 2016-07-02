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
        .filter('mejorValoradas', function ($filter) {
            return function (obras) {
                
            };
        });


})();
