/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna')
        .run(function($ionicPlatform,$rootScope) {

            $ionicPlatform.ready(function() {

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if(window.cordova && window.cordova.plugins.Keyboard) {
                    $rootScope.device = $ionicPlatform.device();
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if(window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

            });
        })
        .run(function($rootScope){
            $rootScope.backend = "http://vivirnacoruna.es/api/v1";
            //$rootScope.backend = "http://localhost:8080/api/v1";
    })

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    })

    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position("top");
    });

})();
