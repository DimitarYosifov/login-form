"use strict";
angular.module('angular-app.userDataService', [])
        .service('userDataService', function ($window, $http, $state) {
            this.auth = function (callback) {
                let authUser = {
                    nickname: $window.localStorage.getItem("user"),
                    password: $window.localStorage.getItem("password")
                };
                if (!authUser.nickname && !authUser.password) {
                    authUser = {
                        nickname: $window.sessionStorage.getItem("user"),
                        password: $window.sessionStorage.getItem("password")
                    };
                }
                $http.post('/api/login', authUser)
                        .then((res) => {
                            callback(res.data);
                        }).catch(function onError(error) {
                    console.log(error);
                });
            };
        });
