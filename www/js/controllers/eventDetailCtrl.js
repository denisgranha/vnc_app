/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.controllers')
        .controller('EventDetailCtrl', function($scope,$stateParams,Events,$ionicLoading,$rootScope,$window) {

            $scope.shareAnywhere = function() {

                //Compartir la imagen en principio no es muy útil ya que retrasa bastante el compartir el evento
                /*if($scope.evento.image){
                 window.plugins.socialsharing.share($scope.evento.post_content, $scope.evento.title, $scope.evento.image, $scope.evento.guid)}
                 else
                 */
                var url = $rootScope.backend + "/?p="+$scope.evento.ID;
                $window.plugins.socialsharing.share($scope.evento.post_title+"\n"+url);
            }



            $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in'
            });

            $scope.openLink = function(){
                window.open($rootScope.backend + "/?p="+$scope.evento.ID, '_system');
            }

            $scope.openUrl = function(url){
                window.open(url,'_system');
            }


            Events.get($stateParams.eventoId,function(response){
                    $ionicLoading.hide();
                    $scope.evento = response;

                    var category = Events.getCategory(response);
                    $scope.category = category.name;

                    $scope.evento.post_content = $scope.evento.post_content.replace("<a","<span");
                    $scope.evento.post_content = $scope.evento.post_content.replace("</a>","</span>");

                },
                function(error){
                    //TODO Notificar error
                    $ionicLoading.hide();
                });

            $scope.goMap = function(){
                window.open("https://www.google.es/maps/place/"+encodeURIComponent($scope.evento.location), '_system');
            }
        });
})();
