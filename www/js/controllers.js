angular.module('vivirnacoruna.controllers', [])

.controller('DashCtrl', function($scope,Events,uiGmapGoogleMapApi,Location,$state,$ionicLoading,$ionicPopup) {


        //Pone el tamaño del mapa via jquery
        $('.angular-google-map-container').css('height', ($(window).height() / 1.65));

        //Fecha para header de la pagina today
        $scope.date = new Date();

        $scope.eventos = [];
        $scope.categories = [];

        $scope.filters = {
            category: "Todas",
            price: 0
        };


        function assignCords(index){
            Location.getCords($scope.eventos[index].location,function(location){
                $scope.eventos[index].coords = {
                    latitude : location.results[0].geometry.location.lat,
                    longitude : location.results[0].geometry.location.lng
                }

                $scope.eventos[index].options =
                {
                    //labelContent: $scope.eventos[index].post_title,
                    labelAnchor: "5 0"
                    //labelClass: "labels"
                }

                $scope.eventos[index].open=  function(){
                    //console.log($scope.eventos[index]);
                    $state.go("tab.evento-detail",{eventoId:$scope.eventos[index].ID});
                }


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

        },
        function(error){
            //TODO Notificar error
            $ionicLoading.hide();
        });

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = { center: { latitude: 43.368712, longitude: -8.40146 }, zoom: 15 };
        });

        Events.prices(function(precios){
            $scope.prices = precios;
        })



        $scope.changue_price = function(){
            $scope.filters.price = ($scope.filters.price+1) % 3;
        };

        Events.categories(function(categories){
            $scope.categories = categories;
        });

        $scope.apply_filters  = function(price,category){

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


        //POPUP DE CATEGORIAS
        var myPopup;
        $scope.showPopup = function(){
            myPopup = $ionicPopup.show({
                templateUrl: 'templates/categories.html',
                title: 'Seleccione a categoría desexada',
                scope: $scope,
                buttons: [
                    { text: 'Cancelar' }
                ]
            });
        };

        $scope.selectCategory = function(category){
            $scope.filters.category = category.name;
            myPopup.close();
        }

})

.controller('EventoDetailCtrl', function($scope,$stateParams,Events,$ionicLoading,$rootScope) {

        $scope.shareAnywhere = function() {

            //Compartir la imagen en principio no es muy útil ya que retrasa bastante el compartir el evento
            /*if($scope.evento.image){
                window.plugins.socialsharing.share($scope.evento.post_content, $scope.evento.title, $scope.evento.image, $scope.evento.guid)}
            else
            */
                window.plugins.socialsharing.share($scope.evento.post_content, null,null, $scope.evento.guid)
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
})

.controller('AxendaCtrl', function($scope,Events,dateFilter,$state,$ionicLoading) {

        //Fecha del título
        $scope.date = new Date();


        $scope.data_evento = new Date();//dateFilter(new Date(), 'yyyy-MM-dd');

        Events.categories(function(categories){
            $scope.categories = categories;
        });

        $scope.eventos = [];
        $scope.eventos2 = [];


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
                    $scope.eventos = [];
                    $scope.eventos2 = [];
                    $ionicLoading.hide();

                    for(i=0;i<response.length;i++){


                        for(j=0;j<response[i].categories.length;j++){

                            if($scope.categories["Exposicións"].ids.indexOf(response[i].categories[j].term_id) > -1){
                                //TODO CAMBIAR POR WHILE
                                j=response[i].categories.length;
                                $scope.eventos2.push(response[i]);
                            }
                            else{
                                j=response[i].categories.length;
                                $scope.eventos.push(response[i]);

                            }
                        }
                    }

            },
            function(error){
                //TODO Notificar error
                $ionicLoading.hide();
            });

        };

        $scope.getColor = function(event){
            var category = Events.getCategory(event);

            return category.color;

        }



        $scope.showEvents($scope.data_evento);

        $scope.goEvento = function(id){
            $state.go("tab.evento-axenda",{eventoId:id});
        }



})

.controller('AccountCtrl', function($scope,gettextCatalog,localStorageService) {

        $scope.setLanguage = function(language){
            gettextCatalog.setCurrentLanguage(language);
            localStorageService.set("language",language);
        };
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
        },
        function(error){
            //TODO Notificar error
            $ionicLoading.hide();
        });

        $scope.goEvento = function(id){
            $state.go("tab.evento-detail",{eventoId:id});
        }



});
