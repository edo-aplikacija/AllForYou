'use strict';

angular.module('mainApp').controller('electronicsCtrl',
['$scope', '$state', '$stateParams', '$sce', 'electronicsService',
	function ($scope, $state, $stateParams, $sce, electronicsService) {

	    // INIT DATA
	    // =============================================================================
	    $scope.products = [];
	    $scope.orderby = 'salesrank';
	    $scope.changedOrderby = 'salesrank';
	    $scope.userMinPrice = '';
	    $scope.userMaxPrice = '';
	    $scope.totalProducts = 0;
	    $scope.changedSearchText = $stateParams.title;
	    $scope.searchtext = $stateParams.title;
	    $scope.loading = false;
	    $scope.noResult = false;

	    var adsIframePartOne = '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&MarketPlace=US&Operation=GetAdHtml&TemplateId=SrchWdgt&region=US&marketplace=amazon&tracking_id=onlshohub-20&auto_complete=true&search_type=search_widget&link_id=4WWPIWN6DDI7PSL5&width=1186&height=400&default_search_category=Electronics&default_search_key=';
	    var adsIframePartTwo = '&widgetId=__mobileAssociatesSearchWidget_adunit_0&default_category_html=Electronics&default_category_value=electronics&default_category_search=Electronics&theme=light&bg_color=FFFFFF&isresponsive=true';
	    $scope.adsIframeSrc = $sce.trustAsResourceUrl(adsIframePartOne + $stateParams.title + adsIframePartTwo);

	    // =============================================================================
	    // LOAD TOTAL PRODUCTS
	    var loadTotalProducts = function (searchtext, minPrice, maxPrice) {
	        var form = {
	            'searchtext': searchtext,
	            'minPrice': minPrice,
	            'maxPrice': maxPrice
	        }
	        electronicsService.getTotalProducts().get(form).$promise.then(
                function (response) {
                    // success
                    $scope.totalProducts = response.data;
                }
                );
	    }
	    // LOAD PRODUCTS
	    var loadProducts = function (searchtext, orderby, minPrice, maxPrice, page) {
	        $scope.loading = true;
	        $scope.noResult = false;
	        var form = {
	            'searchtext': searchtext,
	            'orderby': orderby,
	            'minPrice': minPrice,
	            'maxPrice': maxPrice,
	            'page': page
	        }
	        electronicsService.getProductDataBySearch().get(form).$promise.then(
                function (response) {
                    // success
                    $scope.loading = false;
                    if (response.data.length > 0) {
                        $scope.noResult = false;
                        var metaTitle = 'All for you | Electronics ' + $stateParams.title;
                        updateMetaTitle(metaTitle);
                        if (response.data[0].editorialreviews[0]) {
                            var metaDescription = response.data[0].editorialreviews[0];
                            updateMetaDescription(metaDescription);
                        } else if (response.data[0].features[0]) {
                            var metaDescription = response.data[0].features[0];
                            updateMetaDescription(metaDescription);
                        }
                        updateMetaImage(response.data[0].images[0])
                    } else {
                        $scope.noResult = true;
                    }
                    $scope.products = response.data;
                }
                );
	    }
	    // =============================================================================
        // PAGINATION INIT
	    var loadPaginationInit = function () {
	        $scope.pagination = {
	            current: 1
	        };
	        $scope.currentPage = 1;
	    }
	    // =============================================================================
        // LOAD INIT DATA 
	    loadPaginationInit();
	    loadTotalProducts($scope.changedSearchText, '', '');
	    loadProducts($scope.changedSearchText, $scope.orderby, '', '', 1);
	    // =============================================================================
	    // RESET PRODUCTS
	    $scope.resetProducts = function () {
	        $scope.products = [];
	        $scope.orderby = 'salesrank';
	        $scope.changedOrderby = 'salesrank';
	        $scope.userMinPrice = '';
	        $scope.userMaxPrice = '';
	        $scope.totalProducts = 0;
	        $scope.changedSearchText = '';
	        $scope.searchtext = '';
	        loadTotalProducts($scope.changedSearchText, $scope.userMinPrice, $scope.userMaxPrice);
	        loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	        loadPaginationInit();
	    }
        // SEARCH TEXT
	    $scope.updateSearchTextValue = function (data) {
	        $scope.changedSearchText = data;
	        $scope.changedSearchText = data;
	        loadTotalProducts($scope.changedSearchText, $scope.userMinPrice, $scope.userMaxPrice);
	        loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	        loadPaginationInit();
	    }
	    // ORDER BY
	    $scope.updateOrderby = function (data) {
	        if (data !== $scope.changedOrderby) {
	            $scope.changedOrderby = data;
	            loadTotalProducts($scope.changedSearchText, $scope.userMinPrice, $scope.userMaxPrice);
	            loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	            loadPaginationInit();
	        }
	    }
	    // PRICE RANGE
	    $scope.updatePrice = function (minPrice, maxPrice) {
	        if (minPrice || maxPrice) {
	            if (minPrice && maxPrice) {
	                if (minPrice >= maxPrice) {
	                    $scope.priceError = "Oops! Min price shouldn't be greater or equal to max price."
	                    $scope.minPrice = undefined;
	                    $scope.maxPrice = undefined;
	                } else {
	                    $scope.userMinPrice = parseInt((minPrice) * 100);
	                    $scope.userMaxPrice = parseInt((maxPrice) * 100);
	                    $scope.priceError = undefined;
	                    loadTotalProducts($scope.changedSearchText, $scope.userMinPrice, $scope.userMaxPrice);
	                    loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                    loadPaginationInit();
	                }
	            } else {
	                $scope.userMinPrice = parseInt((minPrice) * 100) || '';
	                $scope.userMaxPrice = parseInt((maxPrice) * 100) || '';
	                $scope.priceError = undefined;
	                loadTotalProducts($scope.changedSearchText, $scope.userMinPrice, $scope.userMaxPrice);
	                loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                loadPaginationInit();
	            }
	        } else {
	            $scope.userMinPrice = '';
	            $scope.userMaxPrice = '';
	            loadTotalProducts($scope.changedSearchText, $scope.userMinPrice, $scope.userMaxPrice);
	            loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	            $scope.minPrice = undefined;
	            $scope.maxPrice = undefined;
	        }
	    }
	    $scope.closePriceError = function () {
	        $scope.priceError = undefined;
	    }
        // PAGINATION
	    $scope.pageChangeHandler = function (newPage) {
	        if ($scope.products) {
	            loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, newPage);
	        }	        
	    }
	    // =============================================================================
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

	}]);