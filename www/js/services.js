angular.module('vivirnacoruna.services', [])

.factory('Events', function($http,$rootScope) {

    return {
        today: function(callback){

            var url = $rootScope.backend + '/today';

            $http.get(url).success(callback);
        },

        get: function(id,callback){
            var url = $rootScope.backend + '/event/'+id;

            $http.get(url).success(callback);
        },

        interval: function(start,end,callback){

            var url = $rootScope.backend + '/interval/'+start+'/'+end;

            $http.get(url).success(callback);
        },

        search: function(query,callback){
            var url = $rootScope.backend + '/search/'+query;

            $http.get(url).success(callback);
        },
        prices: function(callback){
            var url = $rootScope.backend + '/prices';

            $http.get(url).success(callback);
        },
        categories: function(callback){
            var url = $rootScope.backend + '/categories';

            $http.get(url).success(callback);
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

