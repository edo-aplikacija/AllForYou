﻿'use strict';

angular.module('mainApp').controller('electronicsCategoryCtrl',
['$scope', '$state', '$stateParams', '$sce', 'electronicsCategoryService',
	function ($scope, $state, $stateParams, $sce, electronicsCategoryService) {

	    // CATEGORY
	    var findCategory = function () {
	        var category = '';
	        var allowedCatLength = allowedCategories.length;
	        for (var i = 0; i < allowedCatLength; i++) {
	            if (allowedCategories[i].slug === $stateParams.category) {
	                category = allowedCategories[i].name;
	                $scope.allowedSubcategories = allowedCategories[i].subcategories;
	            }
	        }
	        return category;
	    }
	    var allowedCategories = [
            {
                slug: 'cell-phones', name: 'Cell Phones', subcategories: [
                  { name: 'Unlocked Cell Phones', searchName: 'Unlocked' },
                  { name: 'No Contract Cell Phones', searchName: 'No Contract' }
                ]
            },
            {
                slug: 'cell-phones-accessories', name: 'Cell Phones Accessories', subcategories: [
                    { name: 'Accessory Kits', searchName: 'Accessory Kits' },
                    { name: 'Audio Adapters', searchName: 'Audio Adapters' },
                    { name: 'Batteries', searchName: 'Batteries' },
                    { name: 'Bluetooth Headsets', searchName: 'Bluetooth Headsets' },
                    { name: 'Car Accessories', searchName: 'Car Accessories' },
                    { name: 'Chargers', searchName: 'Chargers' },
                    { name: 'Corded Headsets', searchName: 'Corded Headsets' },
                    { name: 'MicroSD Cards', searchName: 'MicroSD Cards' },
                    { name: 'Portable Speakers', searchName: 'Portable Speakers' },
                    { name: 'Signal Boosters', searchName: 'Signal Boosters' },
                    { name: 'Smart Watches', searchName: 'Smart Watches' },
                ]
            },
            {
                slug: 'tv-video', name: 'TV Video', subcategories: [
                    { name: 'LED LCD', searchName: 'LED LCD' },
                    { name: 'Plasma', searchName: 'Plasma' },
                    { name: 'TV DVD Combos', searchName: 'TV DVD Combos' },
                    { name: 'Projectors', searchName: 'Projectors' },
                    { name: 'Video Glasses', searchName: 'Video Glasses' },
                    { name: 'HD DVD Players', searchName: 'HD DVD Players' },
                    { name: 'DVD Players Recorders', searchName: 'DVD Players Recorders' },
                    { name: 'Blu-Ray Players Recorders', searchName: 'Blu-Ray Players Recorders' },
                ]
            },
            {
                slug: 'photo-camera', name: 'Photo Camera', subcategories: [
                    { name: 'Digital Cameras', searchName: 'Digital Cameras' },
                    { name: 'Camcorders', searchName: 'Camcorders' },
                    { name: 'Camcorder Lenses', searchName: 'Camcorder Lenses' },
                    { name: 'Projectors', searchName: 'Projectors' },
                    { name: 'Surveillance Cameras', searchName: 'Surveillance Cameras' },
                    { name: 'Printers Scanners', searchName: 'Printers Scanners' },
                    { name: 'Flashes', searchName: 'Flashes' },
                ]
            },
            {
                slug: 'home-audio', name: 'Home Audio', subcategories: [
                    { name: 'Compact Radios Stereos', searchName: 'Compact Radios Stereos' },
                    { name: 'Portable MP3 Audio Docks', searchName: 'Portable MP3 Audio Docks' },
                    { name: 'Wireless Streaming Audio Systems', searchName: 'Wireless Streaming Audio Systems' },
                    { name: 'Speakers', searchName: 'Speakers' },
                ]
            },
            {
                slug: 'gps', name: 'GPS', subcategories: [
                    { name: 'Trucking', searchName: 'Trucking' },
                    { name: 'Marine', searchName: 'Marine' },
                    { name: 'Car', searchName: 'Car' },
                ]
            }
	    ];
	    var MAIN_CATEGORY = findCategory();
	    if (MAIN_CATEGORY === '') {
	        $state.go('electronics')
	    } else {
	        // INIT DATA
	        // =============================================================================
	        $scope.products = [];
	        $scope.orderby = 'salesrank';
	        $scope.changedOrderby = 'salesrank';
	        $scope.selectedSubcategory = [];
	        $scope.selectedBrands = [];
	        $scope.userMinPrice = '';
	        $scope.userMaxPrice = '';
	        $scope.totalProducts = 0;
	        $scope.changedSearchText = $stateParams.title;
	        $scope.searchtext = $stateParams.title;
	        $scope.loading = false;
	        $scope.noResult = false;
	        var adsIframePartOne = '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&MarketPlace=US&Operation=GetAdHtml&TemplateId=SrchWdgt&region=US&marketplace=amazon&tracking_id=onlshohub-20&auto_complete=true&search_type=search_widget&link_id=4WWPIWN6DDI7PSL5&width=1186&height=400&default_search_category=Electronics&default_search_key=';
	        var adsIframePartTwo = '&widgetId=__mobileAssociatesSearchWidget_adunit_0&default_category_html=Electronics&default_category_value=electronics&default_category_search=Electronics&theme=light&bg_color=FFFFFF&isresponsive=true';
	        $scope.adsIframeSrc = $sce.trustAsResourceUrl(adsIframePartOne + MAIN_CATEGORY + adsIframePartTwo);
	        // =============================================================================
	        // LOAD TOTAL PRODUCTS
	        var loadTotalProducts = function (searchtext, subcategory, brands, minPrice, maxPrice) {
	            var form = {
	                'searchtext': searchtext,
	                'category': MAIN_CATEGORY,
	                'subcategory': subcategory,
	                'brands': brands,
	                'minPrice': minPrice,
	                'maxPrice': maxPrice
	            }	            
	            electronicsCategoryService.getTotalProducts().save(form).$promise.then(
                    function (response) {
                        // success
                        $scope.totalProducts = response.data;
                    }
                    );
	        }
	        // LOAD PRODUCTS
	        var loadProducts = function (searchtext, subcategory, brands, orderby, minPrice, maxPrice, page) {
	            $scope.loading = true;
	            $scope.noResult = false;
	            var form = {
	                'searchtext': searchtext,
	                'category': MAIN_CATEGORY,
	                'subcategory': subcategory,
	                'brands': brands,
	                'orderby': orderby,
	                'minPrice': minPrice,
	                'maxPrice': maxPrice,
                    'page': page
	            }
	            electronicsCategoryService.getProductDataBySearch().save(form).$promise.then(
                    function (response) {
                        // success
                        $scope.loading = false;
                        if (response.data.length > 0) {
                            $scope.noResult = false;
                            var metaTitle = 'All for you | ' + MAIN_CATEGORY + ' ' + $stateParams.title;
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
	        // LOAD BRANDS
	        var loadBrands = function () {
	            electronicsCategoryService.getBrands().get({ 'category': MAIN_CATEGORY }).$promise.then(
                    function (response) {
                        // success
                        if (response.data.length > 0) {
                            $scope.brands = response.data;
                        }
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
	        loadTotalProducts($scope.changedSearchText, [], [], '', '');
	        loadProducts($scope.changedSearchText, [], [], $scope.orderby, '', '', 1);
	        loadBrands();
	        // =============================================================================
	        // RESET PRODUCTS
	        $scope.resetProducts = function () {
	            $scope.products = [];
	            $scope.orderby = 'salesrank';
	            $scope.changedOrderby = 'salesrank';
	            $scope.selectedSubcategory = [];
	            $scope.selectedBrands = [];
	            $scope.userMinPrice = '';
	            $scope.userMaxPrice = '';
	            $scope.totalProducts = 0;
	            $scope.changedSearchText = '';
	            $scope.searchtext = '';
	            loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	            loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	            loadPaginationInit();
	        }
	        // SEARCH TEXT
	        $scope.updateSearchTextValue = function (data) {
	            $scope.changedSearchText = data;
	            loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	            loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	            loadPaginationInit();
	        }
	        // ORDER BY
	        $scope.updateOrderby = function (data) {
	            if (data !== $scope.changedOrderby) {
	                $scope.changedOrderby = data;
	                loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                loadPaginationInit();
	            }
	        }
	        // SUBCATEGORY 
	        $scope.checkedSubcategory = function (subcategory) {
	            if ($scope.selectedSubcategory.indexOf(subcategory) < 0) {
	                $scope.selectedSubcategory.push(subcategory);
	                loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                loadPaginationInit();
	            } else {
	                var lenOfSelSubcategories = $scope.selectedSubcategory.length;
	                for (var i = 0; i < lenOfSelSubcategories; i++) {
	                    if ($scope.selectedSubcategory[i] === subcategory)
	                        $scope.selectedSubcategory.splice(i, 1);
	                }
	                loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                loadPaginationInit();
	            }
	        }
	        // BRAND
	        $scope.checkedBrand = function (brand) {
	            if ($scope.selectedBrands.indexOf(brand) < 0) {
	                $scope.selectedBrands.push(brand);
	                loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                loadPaginationInit();
	            } else {
	                var lenOfSelBrands = $scope.selectedBrands.length;
	                for (var i = 0; i < lenOfSelBrands; i++) {
	                    if ($scope.selectedBrands[i] === brand)
	                        $scope.selectedBrands.splice(i, 1);
	                }
	                loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
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
	                        loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                        loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                        loadPaginationInit();
	                    }
	                } else {
	                    $scope.userMinPrice = parseInt((minPrice) * 100) || '';
	                    $scope.userMaxPrice = parseInt((maxPrice) * 100) || '';
	                    $scope.priceError = undefined;
	                    loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                    loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                    loadPaginationInit();
	                }
	            } else {
	                $scope.userMinPrice = '';
	                $scope.userMaxPrice = '';
	                loadTotalProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.userMinPrice, $scope.userMaxPrice);
	                loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, 1);
	                loadPaginationInit();
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
	                loadProducts($scope.changedSearchText, $scope.selectedSubcategory, $scope.selectedBrands, $scope.changedOrderby, $scope.userMinPrice, $scope.userMaxPrice, newPage);
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
	    }	    
	}]);