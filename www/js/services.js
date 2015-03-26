angular.module('vivirnacoruna.services', [])

.factory('Events', function($http,$rootScope) {

        var categories = {
            "Todas" :
            {
                name: "Todas",
                ids: []
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
                color: "#f06eaa"
            },

            "Familiar":
            {
                name: "Familiar",
                ids: [109],
                marker: "img/familiar.svg",
                color: "#6dcff6"
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
                icon: "ion-camera"
            }
        };

    return {
        today: function(callback,error){

            var url = $rootScope.backend + '/today';

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
})

.factory('Location', function($http){
        return {
          getCords : function(address,callback) {
              return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                  params: {
                      address: address,
                      sensor: false,
                      language: "es",
                      components: 'country:es'
                  }
              }).success(callback);
          }

        }
});

