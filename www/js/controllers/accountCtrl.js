/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.controllers')
        .controller('AccountCtrl', function($scope) {

            $scope.sendEmail = function(){
                if(window.cordova.plugins && window.cordova.plugins.email) {
                    window.cordova.plugins.email.open({to: "info@vivirnacoruna.es"});
                }

            };


            $scope.goUrl = function(url){
                window.open(url, '_system');
            }
        });
})();
