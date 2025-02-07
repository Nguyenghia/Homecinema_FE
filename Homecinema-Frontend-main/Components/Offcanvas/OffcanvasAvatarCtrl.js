app.controller("OffcanvasAvatarCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", "$route", function ($scope, $rootScope, $http, $window, $timeout, $location, $route) {
    //-------------------------------------------------- Biến môi trường

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường	
    
    
    //-------------------------------------------------- Xử lí tiện ích
    
    // 

    $scope.changeIconPassword = function() {
		let pass = document.getElementById("taikhoan_pass");
		let iconPass = document.getElementById("iconPass");
		let pass_register = document.getElementById("pass_register");
		let iconPass_register = document.getElementById("iconPass_register");
		if (pass.type == "password") {
			pass.type = "text";
			iconPass.setAttribute("class", "bi bi-eye");
		} else {
			pass.type = "password";
			iconPass.setAttribute("class", "bi bi-eye-slash");
		}
		if (pass_register.type == "password") {
			pass_register.type = "text";
			iconPass_register.setAttribute("class", "bi bi-eye");
		} else {
			pass_register.type = "password";
			iconPass_register.setAttribute("class", "bi bi-eye-slash");
		}
	};
    
    $scope.SignIn = async function (user) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `user/login`,
            data: {gmail: user.email, matKhau: user.pass},
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $rootScope.MyAccount = response.data.jwt;
                $route.reload();
                localStorage.setItem("account",JSON.stringify($rootScope.MyAccount));
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.messError = "tài khoản hoặc mật khẩu không chính xác";
            }
        )
        await $scope.getDetailUser(user);
    }

    $scope.SignUp = async function (user) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `user/register`,
            data: {gmail: user.email, matKhau: user.pass},
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.mess = "Tạo tài khoản thành công"
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.mess = "Email đã được sử dụng"
            }
        )
        console.log(`Account ${$scope.nameAccount}`);
    }

    $scope.logout = function(){
        $rootScope.MyAccount = null;
        $rootScope.detailAccount = null;
        $rootScope.historyEpisode = [];
        localStorage.removeItem("account");
        localStorage.removeItem("detailAccount");
        localStorage.removeItem("historyEpisode");
        $scope.messError = "";
        $scope.mess = "";
        $route.reload();
    }


    $scope.getDetailUser = function (user) {
        $http({
            method: 'GET',
            url: $rootScope.Host + `user/${user.email}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}` // include the token in the header
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                localStorage.setItem("detailAccount",JSON.stringify(response.data.result));
                $rootScope.detailAccount = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.log(response);
            }
        )
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);