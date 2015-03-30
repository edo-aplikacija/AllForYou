'use strict';

angular.module('mainApp').controller('computersLaptopsProductCtrl',
['$scope', '$state', '$stateParams', '$sce', '$window', 'computersLaptopsService', 'computersLaptopsCategoryService',
	function ($scope, $state, $stateParams, $sce, $window, computersLaptopsService, computersLaptopsCategoryService) {

	    // LOAD PRODUCT
	    // =============================================================================
	    var loadProduct = function () {
	        computersLaptopsService.getProductById().get({ 'id': $stateParams.id }).$promise.then(
                function (response) {
                    // success
                    if (response.data.length > 0) {
                        console.log(response.data[0]);
                        $scope.productData = response.data[0];
                        $scope.selectedImage = response.data[0].images[0];

                        updateMetaTitle($scope.productData.title);

                        if ($scope.productData.editorialreviews[0]) {
                            updateMetaDescription($scope.productData.editorialreviews[0]);
                        } else if ($scope.productData.features[0]) {
                            updateMetaDescription($scope.productData.features[0]);
                        }

                        updateMetaImage($scope.productData.images[0])

                        loadCategoryProducts($scope.productData._id, $scope.productData.title, $scope.productData.category);

                        var adsIframePartOne = '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&MarketPlace=US&Operation=GetAdHtml&TemplateId=SrchWdgt&region=US&marketplace=amazon&tracking_id=onlshohub-20&auto_complete=true&search_type=search_widget&link_id=IMQCQDJSLB5I3662&width=1186&height=630&default_search_category=PCHardware&default_search_key=';
                        var adsIframePartTwo = '&widgetId=__mobileAssociatesSearchWidget_adunit_0&default_category_html=Computers&default_category_value=pc-hardware&default_category_search=PCHardware&theme=light&bg_color=ffffff&isresponsive=true';
                        $scope.adsIframeSrc = $sce.trustAsResourceUrl(adsIframePartOne + $scope.productData.category + adsIframePartTwo);
                    } else {
                        $state.go('computersLaptops');
                    }
                },
                function () {
                    // error
                    $state.go('computersLaptops');
                }
                );
	    }
	    loadProduct();
	    // LOAD ELECTRONICS CATEGORY PRODUCTS
	    // =============================================================================
	    var loadCategoryProducts = function (id, title, category) {
	        computersLaptopsCategoryService.getMostSelling().get({ 'id': id, 'title': title, 'category': category }).$promise.then(
                function (response) {
                    // success
                    if (response.data.length > 0) {
                        $scope.catProducts = response.data;
                    }
                }
                );
	    }
	    // META TAGS
	    // =============================================================================
	    var updateMetaTitle = function (data) {
	        $scope.$emit('updateMetaTitle', data);
	    }
	    var updateMetaDescription = function (data) {
	        $scope.$emit('updateMetaDescription', data);
	    }
	    var updateMetaImage = function (data) {
	        $scope.$emit('updateMetaImage', data);
	    }
	    // =============================================================================
	    // HELPER METHODS
	    // =============================================================================
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
	        if (data) {
	            var results = [];
	            for (var i = 0; i < data.length; i++) {
	                if (data[i].asin !== product.asin) {
	                    results.push(data[i]);
	                }
	            }
	            return results;
	        }
	    }
	    $scope.removeHtmlTags = function (data) {
	        if (data) {
	            return String(data).replace(/<[^>]+>/gm, '');
	        }
	    }
	    $scope.previewImage = function (data) {
	        $scope.selectedImage = data;
	    }
	    $scope.customerReviewsIframe = function (data) {
	        return $sce.trustAsResourceUrl(data);
	    }
	    $scope.editorialText = function (html) {
	        return $sce.trustAsHtml(html);
	    };
	    $scope.buyButton = function (url) {
	        $window.open(url);
	    };

	}]);