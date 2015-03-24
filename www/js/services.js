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
                icon: "img/audiovisual.svg"
            },

            "Charlas":
            {
                name: "Charlas",
                ids: [78],
                icon: "img/charlas.svg"
            },

            "Escénicas" :
            {
                name: "Escénicas",
                ids: [258,259,80,260,81,192],
                icon: "img/escenicas.svg"
            },

            "Familiar":
            {
                name: "Familiar",
                ids: [109],
                icon: "img/familiar.svg"
            },

            "Música" :
            {
                name: "Música",
                ids: [69,265,271],
                icon: "img/musica.svg"
            },

            "Letras" :
            {
                name: "Letras",
                ids: [72,268,267,266,609],
                icon: "img/general.svg"
            },

            "Inauguracións":
            {
                name: "Inauguracións",
                ids: [182],
                icon: "img/inauguraciones.svg"
            },
            "Exposicións":
            {
                name: "Exposicións",
                ids: [93,182],
                icon: "img/exposiciones.svg"
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

        getCategory: function(event,callback){
            for (var category in categories){

                for(i=0;i<event.categories.length;i++){
                    if(categories[category].ids.indexOf(event.categories[i].term_id) > -1){
                        callback(categories[category]);
                        break;
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

