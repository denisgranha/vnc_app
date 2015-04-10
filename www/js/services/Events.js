/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.services')
        .factory('Events', function($http,$rootScope) {

            var categories = {
                "Todas" :
                {
                    name: "Todas",
                    ids: [],
                    color: "#f18c62",
                    icon: "ion-ios-circle-outline"
                },

                "Audiovisual" :
                {
                    name: "Audiovisual",
                    ids: [76,264,261],
                    marker: "img/audiovisual.svg",
                    color: "#aba000",
                    icon: "ion-videocamera"
                },

                "Charlas":
                {
                    name: "Charlas",
                    ids: [78],
                    marker: "img/charlas.svg",
                    color: "#b86e71",
                    icon: "ion-speakerphone"
                },

                "Escénicas" :
                {
                    name: "Escénicas",
                    ids: [258,259,80,260,81,192],
                    marker: "img/escenicas.svg",
                    color: "#f06eaa",
                    icon: "icon-escenicas6"
                },

                "Familiar":
                {
                    name: "Familiar",
                    ids: [109],
                    marker: "img/familiar.svg",
                    color: "#6dcff6",
                    icon: "icon-familia"
                },

                "Música" :
                {
                    name: "Música",
                    ids: [69,265,271],
                    marker: "img/musica.svg",
                    color: "#005952",
                    icon: "ion-mic-c"
                },

                "Letras" :
                {
                    name: "Letras",
                    ids: [72,268,267,266,609],
                    marker: "img/general.svg",
                    color: "#f18c62",
                    icon: "ion-ios-bookmarks"
                },

                "Inauguracións":
                {
                    name: "Inauguracións",
                    ids: [182],
                    marker: "img/inauguraciones.svg",
                    color: "#605ca8",
                    icon: "ion-wineglass"
                },
                "Exposicións":
                {
                    name: "Exposicións",
                    ids: [93,182],
                    marker: "img/exposiciones.svg",
                    color: "#605ca8",
                    icon: "icon-expo"
                }
            };

            return {
                today: function(callback,error){

                    var start = new Date();
                    start.setHours(0,0,0,0);
                    start = start.getTime();

                    var end = new Date();
                    end.setHours(23,59,59,59);
                    end = end.getTime();

                    //var url = $rootScope.backend + '/today';
                    //TODO la ruta today de la API usa la fecha local del servidor, hay que cambiarlo

                    var url = $rootScope.backend + '/interval/'+start+'/'+end;

                    $http.get(url).success(callback).error(error);
                },

                get: function(id,callback,error){
                    var url = $rootScope.backend + '/event/'+id;

                    $http.get(url).success(callback).error(error);
                },

                interval: function(start,end,callback,error){

                    var url = $rootScope.backend + '/interval/'+start+'/'+end;

                    $http.get(url).success(callback).error(error);
                },

                search: function(query,callback,error){
                    var url = $rootScope.backend + '/search/'+query;

                    $http.get(url).success(callback).error(error);
                },
                prices: function(callback,error){
                    callback([
                        {
                            name:   'TODOS',
                            class:  "button-light"
                        },

                        {
                            name:   'GRATIS',
                            class:  "button-energized"
                        },

                        {
                            name:   "PAGO",
                            class:  "button-positive"
                        }
                    ]);
                },
                categories: function(callback,error){
                    callback(categories);
                },

                getCategory: function(event){

                    for (var category in categories){

                        for(i=0;i<event.categories.length;i++){
                            if(categories[category].ids.indexOf(event.categories[i].term_id) > -1){
                                return categories[category];
                            }
                        }

                    };
                }

            }
        });

})();
