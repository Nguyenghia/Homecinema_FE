app.controller("FormEposodeCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", "$routeParams", "$sce", function ($scope, $rootScope, $http, $window, $timeout, $location, $routeParams, $sce) {
    //-------------------------------------------------- Biến môi trường
    $scope.flagAlert_true = false;
    $scope.flagAlert_false = false;
    $scope.flagAlertNotExits_true = false;
    $scope.id = $routeParams.id;
    $scope.idTapPhim = $routeParams.idTapPhim;
    $scope.trustedUrl = "";
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
  
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.addEposode = async function (eposode) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `tapphim/add`,
            data: {idPhim: $scope.id, tenTapphim: eposode.tenTapPhim, luotXem: eposode.luotXem,
                hinhTapphim: eposode.hinhTapphim,  linkVideo: eposode.linkVideo
            },
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagAlert_true = true;
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }

    
    $scope.editEposode = async function (eposode) {
        await $http({
            method: 'PUT',
            url: $rootScope.Host + `tapphim/${eposode.idTapphim}`,
            data: {tenTapphim: eposode.tenTapPhim, luotXem: eposode.luotXem,
                hinhTapphim: eposode.hinhTapphim,  linkVideo: eposode.linkVideo
            },
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagAlert_true = true;
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }
    
    $scope.getDetailEposode = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.eposode = {
                    idTapphim: response.data.result.idTapphim,
                    tenTapPhim: response.data.result.tenTapphim,
                    hinhTapphim: response.data.result.hinhTapphim,
                    luotXem: response.data.result.luotXem,
                    linkVideo: response.data.result.linkVideo,
                    ngayTao: new Date(response.data.result.ngayTao),
                }
                $scope.changeVideo($scope.eposode.linkVideo);
            },
            function errorCallback(response) { 			// Nếu thất bại
               if(response.status == 401){
                $scope.flagAlertNotExits_true = true;
               }
            }
        )
    }

    $scope.resetForm = function () {
        if(confirm('Bạn có muốn để giá trị mặc định?')){
            $scope.eposode = {
                idTapphim: $scope.idTapPhim,
                tenTapPhim: "",
                luotXem: "",
                hinhTapphim: "",
                linkVideo: "",
                ngayTao: "",
            }
        }
    };
    if($scope.idTapPhim!=undefined || $scope.idTapPhim != null) {
        $scope.getDetailEposode($scope.idTapPhim);
    }

    $scope.changeVideo = function(value){
        $scope.trustedUrl = $sce.trustAsResourceUrl(`https://www.youtube.com/embed/${value}`);
    }
    // 
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);