'use strict';

angular.module('mainApp').controller('homeCtrl',
['$scope', '$state', 'electronicsService', 'computersLaptopsService', 'watchesService', 
	function ($scope, $state, electronicsService, computersLaptopsService, watchesService) {

	    var loadElectronics = function () {
	        electronicsService.getMostSelling().get().$promise.then(
                function (response) {
                    // success
                    $scope.electronics = response.data;
                }
                );
	    }
	    loadElectronics();

	    var loadComputersLaptops = function () {
	        computersLaptopsService.getMostSelling().get().$promise.then(
                function (response) {
                    // success
                    $scope.computersLaptops = response.data;
                }
                );
	    }
	    loadComputersLaptops();

	    var loadWatches = function () {
	        watchesService.getMostSelling().get().$promise.then(
                function (response) {
                    // success
                    $scope.watches = response.data;
                }
                );
	    }
	    loadWatches();

	    $scope.calculateDiscount = function (price, oldPrice) {
	        if (oldPrice && oldPrice > price) {
	            return parseInt((1 - (price / oldPrice)) * 100) + '% OFF';
	        } else {
	            return undefined;
	        }
	    }

	    $scope.formatPrice = function (data) {
	        var result = (data / 100).toFixed(2);
	        return '$' + result;
	    }

	    $scope.formatOldPrice = function (price, oldprice) {
	        if (oldprice && oldprice > price) {
	            var result = (oldprice / 100).toFixed(2);
	            return '$' + result;
	        } else {
	            return undefined;
	        }
	    }

	    $scope.filterProducts = function (data, product) {
	        var results = [];
	        for (var i = 0; i < data.length; i++) {
	            if (data[i].asin !== product.asin) {
	                results.push(data[i]);
	            }
	        }
	        return results;
	    }

	    $scope.removeHtmlTags = function (data) {
	        if (data) {
	            return String(data).replace(/<[^>]+>/gm, '');
	        }
	    }
	    
	    // META TAGS
	    var updateMetaTitle = function (data) {
	        $scope.$emit('updateMetaTitle', data);
	    }

	    var updateMetaDescription = function (data) {
	        $scope.$emit('updateMetaDescription', data);
	    }

	    var updateMetaImage = function (data) {
	        $scope.$emit('updateMetaImage', data);
	    }
	    
	    updateMetaTitle('All for you | Everything you need in one place');
	    updateMetaDescription('Everything you need in one place. Best selling products from electronics, computers and watches');
       updateMetaImage('http://www.online-shopping-hub.com/content/images/electronics/tv-video.jpg');		 
		 
	}]);