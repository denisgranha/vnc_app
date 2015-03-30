/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.controllers')
        .controller('AccountCtrl', function($scope) {
            $scope.goUrl = function(url){
                window.open(url, '_system');
            }
        });
})();
