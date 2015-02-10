angular.module('vivirnacoruna.controllers', [])

.controller('DashCtrl', function($scope,Events,uiGmapGoogleMapApi,Location,$state,$ionicLoading,$rootScope,$ionicSideMenuDelegate) {

        $scope.device = $rootScope.device;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.geolocate = function(){
            navigator.geolocation.getCurrentPosition(function(position){
                $scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 15 };
                $scope.$apply();
            });
        };

        $scope.eventos = [];

        function assignCords(index){
            Location.getCords($scope.eventos[index].location,function(location){
                $scope.eventos[index].coords = {
                    latitude : location.results[0].geometry.location.lat,
                    longitude : location.results[0].geometry.location.lng
                }

                $scope.eventos[index].options =
                {
                    labelContent: $scope.eventos[index].post_title,
                    //labelAnchor: "5 0",
                    labelClass: "labels"
                }

                $scope.eventos[index].open=  function(){
                    //console.log($scope.eventos[index]);
                    $state.go("tab.evento-detail",{eventoId:$scope.eventos[index].ID});
                }
            });
        }

        $scope.buscar = function(texto){
            $state.go("tab.search-result",{query:texto});

        }

        $ionicLoading.show({
            content: '<i class="icon ion-loading-c"></i>',
            animation: 'fade-in'
        });

        Events.today(function(response){
            $scope.eventos = response;

            for(i=0;i<$scope.eventos.length;i++){
                assignCords(i);
            }

            $scope.filtrados = $scope.eventos;

            $ionicLoading.hide();

        });

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = { center: { latitude: 43.368712, longitude: -8.40146 }, zoom: 15 };
        });

        /*Events.prices(function(precios){
            $scope.precios = precios;
        })*/
        $scope.prices =
            [
                {
                    name:   'Todos',
                    class:  "button-light"
                },

                {
                    name:   'Gratuitos',
                    class:  "button-energized"
                },

                {
                    name:   "De pago",
                    class:  "button-positive"
                }
            ];

        $scope.selected_price = 0;
        $scope.changue_price = function(){
            $scope.selected_price = ($scope.selected_price+1) % 3;
        }

        Events.categories(function(categories){
            $scope.categories = categories;
        })

        $scope.$watch('selected_price', function(newValue, oldValue) {


            if(newValue == 0){
                //Todos
                $scope.filtrados = $scope.eventos
            }

            if(newValue == 1){
                //Gratuitos

                $scope.filtrados = [];
                for(i=0;i<$scope.eventos.length;i++){
                    if($scope.eventos[i].price == "de balde"){
                        $scope.filtrados.push($scope.eventos[i]);
                    }
                }
            }

            if(newValue == 2){
                //De Pago

                $scope.filtrados = [];
                for(i=0;i<$scope.eventos.length;i++){
                    if($scope.eventos[i].price != "de balde" && $scope.eventos[i].price != ""){
                        $scope.filtrados.push($scope.eventos[i]);
                    }
                }
            }
        });
})

.controller('EventoDetailCtrl', function($scope,$stateParams,Events,$ionicLoading) {

        $scope.shareAnywhere = function() {
            window.plugins.socialsharing.share($scope.evento.post_content, $scope.evento.title, $scope.evento.image, $scope.evento.guid)
        }

        $ionicLoading.show({
            content: '<i class="icon ion-loading-c"></i>',
            animation: 'fade-in'
        });


        Events.get($stateParams.eventoId,function(response){
            $ionicLoading.hide();
            $scope.evento = response;
        });
})

.controller('AxendaCtrl', function($scope,Events,dateFilter,$state,$ionicLoading) {


        $scope.data_evento = new Date();//dateFilter(new Date(), 'yyyy-MM-dd');


        $scope.showEvents = function(date_selected){


            var start = new Date(date_selected);
            start.setHours(0,0,0,0);

            var end = new Date(date_selected);
            end.setHours(23,59,59,59);

            $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in'
            });

            Events.interval(start.getTime(),end.getTime(),function(response){
                $ionicLoading.hide();
                $scope.eventos = response;
            });

        };

        $scope.showEvents($scope.data_evento);

        $scope.goEvento = function(id){
            $state.go("tab.evento-axenda",{eventoId:id});
        }

})

.controller('AccountCtrl', function($scope) {
})

.controller('SearchResultCtrl', function($scope,$stateParams,Events,$state,$ionicLoading) {
        $scope.query = $stateParams.query;

        $ionicLoading.show({
            content: '<i class="icon ion-loading-c"></i>',
            animation: 'fade-in'
        });

        Events.search($scope.query,function(result){
            $scope.eventos = result;
            $ionicLoading.hide();
        });

        $scope.goEvento = function(id){
            $state.go("tab.evento-detail",{eventoId:id});
        }



});
