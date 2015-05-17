/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.controllers')
        .controller('HomeCtrl', function($scope,Events,uiGmapGoogleMapApi,Location,$state,$ionicLoading,$ionicPopup,$window) {


            $scope.hidetabs = false;

            //Pone el tamaño del mapa via jquery, ya que via css con unidades vh no es compatible en todos los dispositivos
            //Y la libreria no permite fijar tamaño por porcentajes
            $('.angular-google-map-container').css('height', ($(window).height() / 1.65));

            //Fecha para header de la pagina today
            $scope.date = new Date();

            $scope.eventos = [];
            $scope.categories = [];

            $scope.filters = {
                category: "Todas",
                price: 0,
                price_name: "Todos"
            };

            if($window.localStorage['selected_category'] != undefined){
                $scope.filters.category = window.localStorage['selected_category'];
            }

            if($window.localStorage['selected_price'] != undefined){
                $scope.filters.price = Number(window.localStorage['selected_price']);
            }




            function assignCords(index){
                Location.getCords($scope.eventos[index].location,function(location){
                    $scope.eventos[index].coords = {
                        latitude : location.results[0].geometry.location.lat,
                        longitude : location.results[0].geometry.location.lng
                    };

                    var title = "";
                    if($scope.eventos[index].post_title.length > 10){
                        title = $scope.eventos[index].post_title.substring(0,10) + "...";
                    }
                    else{
                        title = $scope.eventos[index].post_title;
                    }
                    $scope.eventos[index].options =
                    {
                        labelAnchor: "-5 50",
                        labelClass: "marker-label",
                        labelContent: title
                    };

                    $scope.eventos[index].open=  function(){
                        $state.go("tab.evento-detail",{eventoId:$scope.eventos[index].ID});
                    };


                    var category = Events.getCategory($scope.eventos[index]);
                    $scope.eventos[index].marker = category.marker;
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

                    $scope.apply_filters($scope.filters.price,$scope.filters.category);


                },
                function(error){
                    //TODO Notificar error
                    $ionicLoading.hide();
                });

            uiGmapGoogleMapApi.then(function(maps) {
                //Centrado en el Obelisco
                $scope.map = { center: { latitude: 43.368712, longitude: -8.40146 }, zoom: 15 };
            });

            Events.prices(function(precios){
                $scope.prices = precios;

                if($window.localStorage['selected_price'] != undefined){
                    $scope.filters.price = Number(window.localStorage['selected_price']);
                }
            });



            $scope.changue_price = function(){
                $scope.filters.price = ($scope.filters.price+1) % 3;
                $scope.filters.price_name = $scope.prices[$scope.filters.price].name;
            };

            Events.categories(function(categories){
                $scope.categories = categories;
            });

            $scope.apply_filters  = function(price,category){

                $window.localStorage['selected_category'] = category;
                $window.localStorage['selected_price'] = price;

                $scope.filtrados = [];

                if(price == 0){
                    //Todos los de la categoria
                    if(category == "Todas"){
                        $scope.filtrados = $scope.eventos;
                    }
                    else{
                        for(i=0;i<$scope.eventos.length;i++){

                            for(j=0;j<$scope.eventos[i].categories.length;j++){
                                if($scope.categories[category].ids.indexOf($scope.eventos[i].categories[j].term_id) > -1){
                                    $scope.filtrados.push($scope.eventos[i]);
                                }
                            }
                        }
                    }

                }

                if(price == 1){
                    //Gratuitos

                    $scope.filtrados = [];
                    for(i=0;i<$scope.eventos.length;i++){
                        if($scope.eventos[i].price == "de balde"){

                            if(category == "Todas"){
                                $scope.filtrados.push($scope.eventos[i]);
                            }
                            else {
                                for (j = 0; j < $scope.eventos[i].categories.length; j++) {
                                    if ($scope.categories[category].ids.indexOf($scope.eventos[i].categories[j].term_id) > -1) {
                                        $scope.filtrados.push($scope.eventos[i]);
                                    }
                                }
                            }
                        }
                    }
                }

                if(price == 2){
                    //De Pago

                    $scope.filtrados = [];
                    for(i=0;i<$scope.eventos.length;i++){
                        if($scope.eventos[i].price != "de balde" && $scope.eventos[i].price != ""){

                            if(category == "Todas"){
                                $scope.filtrados.push($scope.eventos[i]);
                            }
                            else {
                                for (j = 0; j < $scope.eventos[i].categories.length; j++) {
                                    if ($scope.categories[category].ids.indexOf($scope.eventos[i].categories[j].term_id) > -1) {
                                        $scope.filtrados.push($scope.eventos[i]);
                                    }
                                }
                            }
                        }
                    }
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }

            };



            $scope.$watchGroup(['filters.category','filters.price'], function(newValue, oldValue,scope) {
                $scope.apply_filters(newValue[1],newValue[0]);
            },true);


            //Popup De Categorias
            var myPopup;
            $scope.showPopup = function(){
                myPopup = $ionicPopup.show({
                    templateUrl: 'templates/categories.html',
                    //title: 'Seleccione a categoría desexada',
                    scope: $scope
                    /*buttons: [
                        { text: 'Cancelar' }
                    ]*/
                });
            };

            $scope.selectCategory = function(category){
                $scope.filters.category = category.name;
                myPopup.close();
            }

        });
})();
