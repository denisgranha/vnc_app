// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('vivirnacoruna', [   'ionic',
                                    'vivirnacoruna.controllers',
                                    'vivirnacoruna.services',
                                    'uiGmapgoogle-maps',
                                    'ui.bootstrap'
])

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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.today', {
      url: '/today',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-today.html',
          controller: 'DashCtrl'
        }
      }
    })

      .state('tab.search-result', {
          url: '/search/:query',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/search-result.html',
                  controller: 'SearchResultCtrl'
              }
          }
      })

    .state('tab.evento-detail', {
      url: '/evento/:eventoId',
      views: {
          'tab-dash': {
              templateUrl: 'templates/evento-detail.html',
              controller: 'EventoDetailCtrl'
          }
      }
    })

    .state('tab.calendar', {
      url: '/calendar',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-calendar.html',
          controller: 'AxendaCtrl'
        }
      }
    })

      .state('tab.evento-axenda', {
          url: '/calendar/:eventoId',
          views: {
              'tab-friends': {
                  templateUrl: 'templates/evento-detail.html',
                  controller: 'EventoDetailCtrl'
              }
          }
      })

    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/today');

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


        // note that you can also chain configs
        $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    });

