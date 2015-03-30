'use strict';

angular.module('mainApp').controller('headerSearchCtrl',
['$scope', '$state', '$timeout', 'electronicsService', 'computersLaptopsService', 'watchesService',
	function ($scope, $state, $timeout, electronicsService, computersLaptopsService, watchesService) {

	    // init data
	    $scope.newHeaderSeachText = '';

	    $scope.electronicsSearchResult = undefined;
	    $scope.computersLaptopsSearchResult = undefined;
	    $scope.watchesSearchResult = undefined;
	    
	    $scope.removeSearchText = function () {
	        $scope.headerSearchText = '';
	        $scope.electronicsSearchResult = undefined;
	        $scope.computersLaptopsSearchResult = undefined;
	        $scope.watchesSearchResult = undefined;
	    }

	    $scope.updateHeaderSeachText = function (data) {
	        $scope.newHeaderSeachText = data;       
	    }

	    var timeoutPromise;
	    var delayInMs = 1000;
	    $scope.$watch('newHeaderSeachText', function (newHeaderSeachText) {
	        $scope.electronicsSearchResult = undefined;
	        $scope.computersLaptopsSearchResult = undefined;
	        $scope.watchesSearchResult = undefined;
	        $timeout.cancel(timeoutPromise);
	        if (newHeaderSeachText.length > 2) {
	            timeoutPromise = $timeout(function () {	                

	                loadElectronicsData(newHeaderSeachText);
	                loadComputersLaptopsData(newHeaderSeachText);
	                loadWatchesData(newHeaderSeachText);
	            }, delayInMs);
	        }
	    }, true);

	    var loadElectronicsData = function (searchtext) {
	        electronicsService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.electronicsSearchResult = response.data;
                    }
                }
            );
	    }
	    var loadComputersLaptopsData = function (searchtext) {
	        computersLaptopsService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.computersLaptopsSearchResult = response.data;
                    }
                }
            );
	    }
	    var loadWatchesData = function (searchtext) {
	        watchesService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.watchesSearchResult = response.data;
                    }
                }
            );
	    }

	}]);