/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.controllers')
        .controller('CalendarCtrl', function($scope,Events,dateFilter,$state,$ionicLoading,$window) {

            if($window.localStorage['selected_date'] != undefined){
                //Fecha del título
                $scope.data_evento = new Date($window.localStorage['selected_date']);
            }
            else{
                //Fecha del título
                $scope.data_evento = new Date();
            }




            $scope.date = new Date();

            Events.categories(function(categories){
                $scope.categories = categories;
            });

            //Eventos de todas la categorías menos exposiciones
            $scope.eventos = [];

            //Eventos de exposiciones
            $scope.eventos2 = [];


            $scope.showEvents = function(date_selected){

                $window.localStorage['selected_date'] = date_selected.toString();

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



        });

})();
