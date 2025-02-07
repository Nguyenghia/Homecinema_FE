app.controller("WatchMovieCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$routeParams", "$sce", function ($scope, $rootScope, $http, $window, $timeout, $routeParams, $sce) {
    //-------------------------------------------------- Biến môi trường
    $scope.id = $routeParams.id;
    $scope.listCategories = [];
    $scope.listEpisode = [];
    $scope.eposodeActive = false;
    $scope.like = 0;
    $scope.flagLike = false;
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    
    
    
    //-------------------------------------------------- Xử lí tiện ích
    
    $scope.getDetailTapPhim = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/${$scope.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            async function successCallback(response) {			// Nếu thành công
                $scope.episode = {
                    idPhim: response.data.result.phim.idPhim,
                    idTapphim: response.data.result.idTapphim,
                    tenTapPhim: response.data.result.tenTapphim,
                    hinhTapPhim: response.data.result.hinhTapphim,
                    luotXem: response.data.result.luotXem,
                    ngayTao: response.data.result.ngayTao,
                    linkVideo: $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + response.data.result.linkVideo)
                };
                let exists = $rootScope.historyEpisode.some(item => item === $scope.episode.idTapphim);
                if (!exists) {
                    $rootScope.historyEpisode.unshift($scope.episode.idTapphim);
                    localStorage.setItem("historyEpisode", JSON.stringify($rootScope.historyEpisode));
                }
                await $scope.getAllCategoryByIdMovie($scope.episode.idPhim);
                await $scope.getDetailPhim($scope.episode.idPhim);
                await $scope.getAllTapPhimByIdPhim($scope.episode.idPhim);
                await $scope.updateView($scope.id);
                await $scope.getLike($scope.id);
                if($rootScope.MyAccount != null){
                    await $scope.checkLike($scope.episode);
                }
                $scope.eposodeIndex = $scope.listEpisode.findIndex(item => item.idTapphim === $scope.episode.idTapphim) + 1;
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.error('Error fetching episode details:', response);
            }
        );
    };
    
    $scope.getAllTapPhimByIdPhim = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/byPhim/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                if(response.data.result[0] != undefined){
                    $scope.listEpisode = response.data.result
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }

    $scope.updateView = async function (id) {
        await $http({
            method: 'PUT',
            url: $rootScope.Host + `tapphim/updateView/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                console.log("Updated view done!");
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }
    $scope.likeVideo = async function (episode) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `yeuthich/add`,
            data: {idTapphim: episode.idTapphim, gmail: $rootScope.detailAccount.gmail}, 
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
           async function successCallback(response){			// Nếu thành 
                await $scope.getLike($scope.id);
                await $scope.checkLike($scope.episode);
                // $("#btn-like").prop("checked", true);
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.log(response);
            }
        )
    }

    $scope.unLikeVideo = async function (episode) {
        await $http({
            method: 'DELETE',
            url: $rootScope.Host + `yeuthich/unLike`,
            data: {idTapphim: episode.idTapphim, gmail: $rootScope.detailAccount.gmail}, 
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            async function successCallback(response){			// Nếu thành 
                await $scope.checkLike($scope.episode);
                await $scope.getLike($scope.id);
                // $("#btn-like").prop("checked", false)
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.log(response);
            }
        )
    }
    $scope.getLike = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `yeuthich/count/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.like = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }
    $scope.handleActionLike = function () {
        $("#btn-like").prop("checked", false);
        if($rootScope.MyAccount != null){
            if($scope.flagLike){
                $scope.unLikeVideo($scope.episode);
               ;
            }else{
                $scope.likeVideo($scope.episode);
            }
        }else{
            window.alert("Vui lòng đăng nhập");
        }
    }
    
    $scope.checkLike = async function (episode) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `yeuthich/checkLike`,
            params: {idTapphim: episode.idTapphim, gmail: $rootScope.detailAccount.gmail},
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagLike = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.log(response)
            }
        )
    }

    $scope.getAllCategoryByIdMovie = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloaiphim/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                for (const element of  response.data.result) {
                    $scope.getDetailCategory(element);
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }

    $scope.getDetailPhim = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.phim = {
                    idPhim: response.data.result.idPhim,
                    tenPhim: response.data.result.tenPhim,
                    hinhPhim: response.data.result.hinhPhim,
                    moTa: response.data.result.moTa,
                    tacGia: response.data.result.tacGia,
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }

    $scope.getDetailCategory = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloai/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.listCategories.push(response.data.result)
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }
    $scope.getDetailTapPhim();
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);