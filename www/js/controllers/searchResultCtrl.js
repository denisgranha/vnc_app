/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.controllers')

        .controller('SearchResultCtrl', function($scope,$stateParams,Events,$state,$ionicLoading) {
            $scope.query = $stateParams.query;

            $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                duration: 10000
            });

            Events.search($scope.query,function(result){
                    $scope.eventos = result;
                    $ionicLoading.hide();
                },
                function(error){
                    //TODO Notificar error
                    $ionicLoading.hide();
                    $state.go("tab.today-error");
                });

            $scope.goEvento = function(id){
                $state.go("tab.evento-detail",{eventoId:id});
            }

            $scope.getColor = function(event){
                var category = Events.getCategory(event);

                return category.color;

            }

        });
})();
