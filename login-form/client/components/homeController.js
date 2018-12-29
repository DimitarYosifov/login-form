"use strict";
angular.module("angular-app.homeController", [])
        .controller("homeController", function ($scope, userDataService, $window, $rootScope, $http, $state, $timeout) {
            userDataService.auth(function (authorized) {
                if (!authorized.success) {
                    $state.go('login');
                }
            });
            $scope.users = [];
            $http.get('/api/users').then(function (res) {
                res.data.forEach((obj) => {
                    $scope.users.push(obj);
                });
            });
        });




