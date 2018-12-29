"use strict";
angular.module('angular-app')
        .directive('navigation', function ($interval, $state, $timeout, $window, $transitions) {
            return {
                restrict: 'AE',
                templateUrl: 'client/templates/nav.html',
                scope: {
                    authorized: "="
                },
                link: function ($scope, element, attrs, ctrl) {
                    $scope.$watch(function () {
                        return $state.$current.name;
                    }, function (newVal, oldVal) {
                        $scope.state = newVal;
                    });
                    $scope.$on("changeStatus", function (x, data) {
                        $scope.authorized = data.authorized;
                        $scope.authorized = data.authorized;
                    });
                    $scope.logOut = function () {
                        $scope.authorized = false;
                        $window.localStorage.removeItem("user");
                        $window.sessionStorage.removeItem("user");
                        $window.localStorage.removeItem("password");
                        $window.sessionStorage.removeItem("password");
                        $window.localStorage.removeItem("u_id");
                        $window.sessionStorage.removeItem("u_id");
                        $scope.$emit('changeStatus', {authorized: false});
                        $state.go("login");
                    };
                }
            };
        });
