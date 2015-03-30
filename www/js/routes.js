/**
 * Created by denisgranha on 31/3/15.
 */

(function(){
    angular.module('vivirnacoruna')
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
                            controller: 'HomeCtrl'
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
                            controller: 'EventDetailCtrl'
                        }
                    }
                })

                .state('tab.calendar', {
                    url: '/calendar',
                    views: {
                        'tab-friends': {
                            templateUrl: 'templates/tab-calendar.html',
                            controller: 'CalendarCtrl'
                        }
                    }
                })

                .state('tab.evento-axenda', {
                    url: '/calendar/:eventoId',
                    views: {
                        'tab-friends': {
                            templateUrl: 'templates/evento-detail.html',
                            controller: 'EventDetailCtrl'
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

        });
})();
