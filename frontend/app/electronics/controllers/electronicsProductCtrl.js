'use strict';

angular.module('mainApp').controller('electronicsProductCtrl',
['$scope', '$state', '$stateParams', '$sce', '$window', 'electronicsService', 'electronicsSubcategoryService', 'electronicsCategoryService',
	function ($scope, $state, $stateParams, $sce, $window, electronicsService, electronicsSubcategoryService, electronicsCategoryService) {

	    // LOAD PRODUCT
	    // =============================================================================
	    var loadProduct = function () {
	        electronicsService.getProductById().get({ 'id': $stateParams.id }).$promise.then(
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

                        loadCategoryProducts($scope.productData._id, $scope.productData.title, $scope.productData.category, $scope.productData.subcategory);
                        loadSubcategoryProducts($scope.productData._id, $scope.productData.title, $scope.productData.category, $scope.productData.subcategory);

                        var adsIframePartOne = '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&MarketPlace=US&Operation=GetAdHtml&TemplateId=SrchWdgt&region=US&marketplace=amazon&tracking_id=onlshohub-20&auto_complete=true&search_type=search_widget&link_id=4WWPIWN6DDI7PSL5&width=1186&height=630&default_search_category=Electronics&default_search_key=';
                        var adsIframePartTwo = '&widgetId=__mobileAssociatesSearchWidget_adunit_0&default_category_html=Electronics&default_category_value=electronics&default_category_search=Electronics&theme=light&bg_color=FFFFFF&isresponsive=true';
                        $scope.adsIframeSrc = $sce.trustAsResourceUrl(adsIframePartOne + $scope.productData.subcategory + adsIframePartTwo);

                    } else {
                        $state.go('electronics');
                    }
                },
                function () {
                    // error
                    $state.go('electronics');
                }
                );
	    }
	    loadProduct();
	    // LOAD ELECTRONICS CATEGORY PRODUCTS
	    // =============================================================================
	    var loadCategoryProducts = function (id, title, category, subcategory) {
	        electronicsCategoryService.getMostSelling().get({ 'id': id, 'title': title, 'category': category, 'subcategory': subcategory }).$promise.then(
                function (response) {
                    // success
                    if (response.data.length > 0) {
                        $scope.catProducts = response.data;
                    }
                }
                );
	    }
	    // LOAD ELECTRONICS SUBCATEGORY PRODUCTS
	    // =============================================================================
	    var loadSubcategoryProducts = function (id, title, category, subcategory) {
	        electronicsSubcategoryService.getMostSelling().get({ 'id': id, 'title': title, 'category': category, 'subcategory': subcategory }).$promise.then(
                function (response) {
                    // success
                    if (response.data.length > 0) {
                        $scope.subCatProducts = response.data;
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
	    $scope.customerReviewsIframe = function(data) {
	        return $sce.trustAsResourceUrl(data);
	    }
	    $scope.editorialText = function (html) {
	        return $sce.trustAsHtml(html);
	    };	    
	    $scope.buyButton = function (url) {
	        $window.open(url);
	    };

	}]);