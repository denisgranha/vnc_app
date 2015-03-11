angular.module('vivirnacoruna.services', [])

.factory('Events', function($http,$rootScope) {

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
            var url = $rootScope.backend + '/prices';

            $http.get(url).success(callback).error(error);
        },
        categories: function(callback,error){
            var url = $rootScope.backend + '/categories';

            $http.get(url).success(callback).error(error);
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

