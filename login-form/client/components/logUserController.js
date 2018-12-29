"use strict";
angular.module("angular-app.logUserController", [])
        .controller("logUserController", function ($scope, userDataService, $window, $rootScope, $http, $state, $timeout) {
            $scope.rememberMe = false;
            userDataService.auth(function (authorized) {
                if (authorized.success) {
                    $state.go('home');
                }
            }); 
            $scope.logUser = function () {
                $http.post('/api/login', $scope.user)
                        .then((res) => {
                            if ($scope.rememberMe && res.data.success) {
                                $window.localStorage.setItem("user", $scope.user.nickname);
                                $window.localStorage.setItem("password", $scope.user.password);
                                $window.localStorage.setItem("u_id", res.data.u_id);
                            }
                            if (!res.data.success) {
                                alert('invalid password or nickname!');
                            } else {
                                $window.sessionStorage.setItem("user", $scope.user.nickname);
                                $window.sessionStorage.setItem("password", $scope.user.password);
                                $window.sessionStorage.setItem("u_id", res.data.u_id);
                                $rootScope.$broadcast('changeStatus', {authorized: true});
                                $state.go("home");
                            }
                        }).catch(function onError(error) {
                    console.log(error);
                });
            };
        });




