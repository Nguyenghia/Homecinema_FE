app.controller("MainCtrl", ["$scope", "$rootScope", "$http", "$location", "$window", "$timeout", "$interval", function ($scope, $rootScope, $http, $location, $window, $timeout, $translate, $interval) {
    //-------------------------------------------------- Biến môi trường

    $rootScope.Host = "https://homecinema-backend.onrender.com/api/v1/"; 	                    // Biến chứa địa chỉ máy chủ server spring boot
    $rootScope.MyAccount = JSON.parse(localStorage.getItem("account"));	// Biến chứa phiên người dùng
    $rootScope.detailAccount = JSON.parse(localStorage.getItem("detailAccount"))|| "Khách";
    $rootScope.historyEpisode = JSON.parse(localStorage.getItem("historyEpisode")) || [];
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    $rootScope.onloadAdmin = function(){
        if(($rootScope.MyAccount == null && $rootScope.detailAccount == null)||$rootScope.detailAccount == null||!$rootScope.detailAccount.vaiTro){
            $location.path("/home");
        }else{
            $scope.checkJWTExpired();
        }
    }
    $rootScope.onloadUser = function(){
        if($rootScope.MyAccount == null && ($rootScope.detailAccount == "Khách" || $rootScope.detailAccount == null)){
            $location.path("/home");
        }else{
            $scope.checkJWTExpired();
        }
    }

    $scope.checkJWTExpired = function () {
        $http({
            method: 'GET',
            url: $rootScope.Host + `user/${$rootScope.detailAccount.gmail}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}` // include the token in the header
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                console.log("done JWT Authentication");
            },
            function errorCallback(response) { 			// Nếu thất bại
                $rootScope.MyAccount = null;
                $rootScope.detailAccount = null;
                $rootScope.historyEpisode = [];
                localStorage.removeItem("account");
                localStorage.removeItem("detailAccount");
                localStorage.removeItem("historyEpisode");
                $location.path("/home");
            }
        )
    }
    //-------------------------------------------------- Xử lí tiện ích

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
    }]);
