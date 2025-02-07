app.controller("FormMovieCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", "$routeParams", function ($scope, $rootScope, $http, $window, $timeout, $location, $routeParams) {
    //-------------------------------------------------- Biến môi trường
    $scope.listCategory = [];
    $scope.flagAlert_true = false;
    $scope.flagAlert_false = false;
    $scope.flagAlertNotExits_true = false;
    $scope.id = $routeParams.id;
    $scope.movie={
        trangThai: "",
        listIdLoai: [],
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
  
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.addMovie = async function (movie) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `phim/add`,
            data: {idPhim: movie.idPhim, tenPhim: movie.tenPhim, hinhPhim: movie.hinhPhim, trangThai: movie.trangThai,
                    tacGia: movie.tacGia,  moTa: movie.moTa
            },
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagAlert_true = true;
                for (const idLoai of movie.listIdLoai) {
                    $scope.addCategory_Movie({idPhim: movie.idPhim, idLoai: idLoai});
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }

    $scope.addCategory_Movie = async function (cate_movie) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `theloaiphim/add`,
            data: {idPhim: cate_movie.idPhim, idLoai: cate_movie.idLoai},
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
    $scope.editMovie = async function (movie) {
        await await $scope.deleteMovieCate(movie.idPhim);
        await $http({
            method: 'PUT',
            url: $rootScope.Host + `phim/${movie.idPhim}`,
            data: {idPhim: movie.idPhim, tenPhim: movie.tenPhim, hinhPhim: movie.hinhPhim, trangThai: movie.trangThai,
                tacGia: movie.tacGia,  moTa: movie.moTa
            },
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagAlert_true = true;
                for (const idLoai of movie.listIdLoai) {
                    $scope.addCategory_Movie({idPhim: movie.idPhim, idLoai: idLoai});
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }
    $scope.editMovieCate = async function (movie) {
        await $http({
            method: 'PUT',
            url: $rootScope.Host + `phim/${movie.idPhim}`,
            data: {idPhim: movie.idPhim, tenPhim: movie.tenPhim, hinhPhim: movie.hinhPhim, trangThai: movie.trangThai,
                tacGia: movie.tacGia,  moTa: movie.moTa
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
    $scope.getDetailMovie = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.movie = {
                    idPhim: response.data.result.idPhim,
                    tenPhim: response.data.result.tenPhim,
                    hinhPhim: response.data.result.hinhPhim,
                    moTa: response.data.result.moTa,
                    tacGia: response.data.result.tacGia,
                    trangThai: response.data.result.trangThai + "",
                    ngayTao: new Date(response.data.result.ngayTao),
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
               if(response.status == 401){
                $scope.flagAlertNotExits_true = true;
               }
            }
        )
    }

    $scope.getDetailMovieCate = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloaiphim/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
               $scope.movie.listIdLoai = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
               if(response.status == 401){
                $scope.flagAlertNotExits_true = true;
               }
            }
        )
    }
    $scope.deleteMovieCate = async function (id) {
        await $http({
            method: 'DELETE',
            url: $rootScope.Host + `theloaiphim/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.flagAlert_true = true;
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }
    $scope.getAllCategory = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloai/all`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}` // include the token in the header
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listCategory = response.data.result;               
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }
    $scope.resetForm = function () {
        if(confirm('Bạn có muốn để giá trị mặc định?')){
            $scope.movie = {
                idPhim: "",
                tenPhim: "",
                hinhPhim: "",
                moTa: "",
                tacGia: "",
                trangThai: "",
                ngayTao: "",
                listIdLoai: [],
            }
        }
    };
    if($scope.id!=undefined || $scope.id != null) {
        $scope.getDetailMovie($scope.id);
        $scope.getDetailMovieCate($scope.id);
    }
    $scope.getAllCategory();
    // 
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);