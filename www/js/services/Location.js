/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna.services')

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
})();