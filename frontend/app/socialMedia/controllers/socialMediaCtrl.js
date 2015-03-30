﻿'use strict';

angular.module('mainApp').controller('socialMediaCtrl',
['$scope', '$state', '$filter', '$rootScope',
	function ($scope, $state, $filter, $rootScope) {

	    // social media
	    $scope.description = 'Everything you need in one place. Best selling products from electronics, computers and watches';
	    $scope.socialUrl = 'http://www.allforyu.com/';
	    $scope.socialImage = 'http://www.allforyu.com/content/images/electronics/tv-video.jpg';
		 
       $scope.$watch(function () { return window.location.href }, function (data) {
	        $scope.socialUrl = data;
	        $scope.$emit('updateMetaUrl', data);
	    });		 
		 
	    var updateDescription = function (data) {
	        if (data) {
	            $scope.description = removeHtmlTags(data);
	        }
	    }
	    var updateImage = function (data) {
	        if (data) {
	            $scope.socialImage = data;
	        }
	    }
	    var removeHtmlTags = function (data) {
	        return String(data).replace(/<[^>]+>/gm, '');
	    }
	    $rootScope.$on('updateMetaDescription', function (e, data) {
	        updateDescription(data);
	    });

	    $rootScope.$on('updateMetaImage', function (e, data) {
	        updateImage(data);
	    });

	}]);