'use strict';
/* global app: true */

var mainApp = angular.module('mainApp', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angularUtils.directives.dirPagination',
    '720kb.socialshare'

]);

// CONSTANTS
mainApp.constant('API_SERVER', 'http://localhost:8050/api/');
// HOME
mainApp.constant('HOME_TEMPLATES', 'app/home/views/');
mainApp.constant('ELECTRONIC_TEMPLATES', 'app/electronics/views/');
mainApp.constant('COMPUTERS_LAPTOPS_TEMPLATES', 'app/computersLaptops/views/');
mainApp.constant('WATCHES_TEMPLATES', 'app/watches/views/');



mainApp.config(['$httpProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', 'HOME_TEMPLATES', 'ELECTRONIC_TEMPLATES', 'COMPUTERS_LAPTOPS_TEMPLATES', 'WATCHES_TEMPLATES',
                function ($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider, HOME_TEMPLATES, ELECTRONIC_TEMPLATES, COMPUTERS_LAPTOPS_TEMPLATES, WATCHES_TEMPLATES) {
						  
						  
                    $urlRouterProvider.otherwise('/');

                    $stateProvider
                         // home
                         .state('home', {
                             controller: 'homeCtrl',
                             url: '/',
                             templateUrl: HOME_TEMPLATES + 'home.html',
                         })
                        // electronics
                        .state('electronics', {
                            controller: 'electronicsCtrl',
                            url: '/electronics/:title',
                            templateUrl: ELECTRONIC_TEMPLATES + 'electronics.html',
                        })
                        .state('electronicsCategory', {
                            controller: 'electronicsCategoryCtrl',
                            url: '/electronic/:category/:title',
                            templateUrl: ELECTRONIC_TEMPLATES + 'electronicsCategory.html',
                        })
                        .state('electronicsProduct', {
                            controller: 'electronicsProductCtrl',
                            url: '/electronics-product/:slug/:id',
                            templateUrl: ELECTRONIC_TEMPLATES + 'electronicsProduct.html',
                        })
                        // computers laptops
                        .state('computersLaptops', {
                            controller: 'computersLaptopsCtrl',
                            url: '/computers-laptops/:title',
                            templateUrl: COMPUTERS_LAPTOPS_TEMPLATES + 'computersLaptops.html',
                        })
                        .state('computersLaptopsCategory', {
                            controller: 'computersLaptopsCategoryCtrl',
                            url: '/computer-laptop/:category/:title',
                            templateUrl: COMPUTERS_LAPTOPS_TEMPLATES + 'computersLaptopsCategory.html',
                        })
                        .state('computersLaptopsProduct', {
                            controller: 'computersLaptopsProductCtrl',
                            url: '/computers-laptops-product/:slug/:id',
                            templateUrl: COMPUTERS_LAPTOPS_TEMPLATES + 'computersLaptopsProduct.html',
                        })
                        // watches
                        .state('watches', {
                            controller: 'watchesCtrl',
                            url: '/watches/:title',
                            templateUrl: WATCHES_TEMPLATES + 'watches.html',
                        })
                        .state('watchesCategory', {
                            controller: 'watchesCategoryCtrl',
                            url: '/watch/:category/:title',
                            templateUrl: WATCHES_TEMPLATES + 'watchesCategory.html',
                        })
                        .state('watchesProduct', {
                            controller: 'watchesProductCtrl',
                            url: '/watches-product/:slug/:id',
                            templateUrl: WATCHES_TEMPLATES + 'watchesProduct.html',
                        });
                        

                }]);