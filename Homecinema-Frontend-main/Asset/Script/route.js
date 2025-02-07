//Điều hướng trang
app.config(function ($routeProvider) {
	$routeProvider
		.when("/home", {
			title:"Trang chủ",
			templateUrl: "Pages/Home/index.html?" + Math.random(),
			controller: "HomeCtrl"
		})
		.when("/movie/:id", {
			title:"Detail Movie",
			templateUrl: "Pages/Movie/index.html?" + Math.random(),
			controller: "MovieClientCtrl"
		})
		.when("/history", {
			title:"History Episode",
			templateUrl: "Pages/History/index.html?" + Math.random(),
			controller: "HistoryCtrl"
		})
		.when("/liked", {
			title:"Liked Episode",
			templateUrl: "Pages/History/index.html?" + Math.random(),
			controller: "HistoryCtrl"
		})
		.when("/movie/watch/:id", {
			title:"Watch Movie",
			templateUrl: "Pages/Movie/WatchMovie/index.html?" + Math.random(),
			controller: "WatchMovieCtrl"
		})
		.when("/search/:type/:value", {
			title:"Search Movie",
			templateUrl: "Pages/Search/index.html?" + Math.random(),
			controller: "SearchMovieCtrl"
		})
		.when("/search/:type", {
			title:"Search Movie",
			templateUrl: "Pages/Search/index.html?" + Math.random(),
			controller: "SearchMovieCtrl"
		})
		.when("/admin/statistical", {
			title:"Statistical - Admin",
			templateUrl: "Pages/Admin/Home/index.html?" + Math.random(),
			controller: "AdminCtrl"
		})
		.when("/admin/user", {
			title:"User Management - Admin",
			templateUrl: "Pages/Admin/User/index.html?" + Math.random(),
			controller: "UserCtrl"
		})
		.when("/admin/user/add", {
			title:"Add User - Admin",
			templateUrl: "Pages/Admin/User/FormUser/index.html?" + Math.random(),
			controller: "FormUserCtrl"
		})
		.when("/admin/user/edit/:id", {
			title:"Edit User - Admin",
			templateUrl: "Pages/Admin/User/FormUser/index.html?" + Math.random(),
			controller: "FormUserCtrl"
		})
		.when("/admin/category", {
			title:"Movie Category Management - Admin",
			templateUrl: "Pages/Admin/Category/index.html?" + Math.random(),
			controller: "CategoryCtrl"
		})
		.when("/admin/category/add", {
			title:"Add Category - Admin",
			templateUrl: "Pages/Admin/Category/FormCategory/index.html?" + Math.random(),
			controller: "FormCategoryCtrl"
		})
		.when("/admin/category/edit/:id", {
			title:"Edit Category - Admin",
			templateUrl: "Pages/Admin/Category/FormCategory/index.html?" + Math.random(),
			controller: "FormCategoryCtrl"
		})
		.when("/admin/movie", {
			title:"Movie Management - Admin",
			templateUrl: "Pages/Admin/Movie/index.html?" + Math.random(),
			controller: "MovieCtrl"
		})
		.when("/admin/movie/add", {
			title:"Add Movie - Admin",
			templateUrl: "Pages/Admin/Movie/FormMovie/index.html?" + Math.random(),
			controller: "FormMovieCtrl"
		})
		.when("/admin/movie/edit/:id", {
			title:"Edit Movie - Admin",
			templateUrl: "Pages/Admin/Movie/FormMovie/index.html?" + Math.random(),
			controller: "FormMovieCtrl"
		})
		.when("/admin/movie/episode/:id", {
			title:"Episode Management - Admin",
			templateUrl: "Pages/Admin/Movie/Episode/index.html?" + Math.random(),
			controller: "EpisodeCtrl"
		})
		.when("/admin/movie/episode/:id/add", {
			title:"Add Episode - Admin",
			templateUrl: "Pages/Admin/Movie/Episode/FormEposode/index.html?" + Math.random(),
			controller: "FormEposodeCtrl"
		})
		.when("/admin/movie/episode/:id/add/edit/:idTapPhim", {
			title:"Edit Episode - Admin",
			templateUrl: "Pages/Admin/Movie/Episode/FormEposode/index.html?" + Math.random(),
			controller: "FormEposodeCtrl"
		})
		.otherwise({redirectTo: "/home"});
});
app.run(function ($rootScope) {
	// sự kiện thay đổi router
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		$rootScope.title = next.$$route.title;
	});
  });