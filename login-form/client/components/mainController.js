"use strict";
angular.module("angular-app.mainController", [])
        .controller("mainController", function ($scope, userDataService, $window, $rootScope, $http, $state, $timeout) {
            $scope.authUser = {
                nickname: $window.localStorage.getItem("user"),
                password: $window.localStorage.getItem("password")
            };
            if (!$scope.authUser.nickname && !$scope.authUser.password) {
                $scope.authUser = {
                    nickname: $window.sessionStorage.getItem("user"),
                    password: $window.sessionStorage.getItem("password")
                };
            }
            $scope.authorized = false;
            $http.post('/api/login', $scope.authUser)
                    .then((res) => {
                        if (res.data.success) {
                            $scope.authorized = true;
                            userDataService.user = res.data.user;
                        } else {
                            $scope.authorized = false;
                        }
                    }).catch(function onError(error) {
                console.log(error);
            });
        });
