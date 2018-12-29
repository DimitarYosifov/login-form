"use strict";
angular.module("angular-app", [
    'ui.router',
    "angular-app.mainController",
    "angular-app.homeController",
    "angular-app.logUserController",
    "angular-app.addUserController",
    "angular-app.editController",
    "angular-app.userDataService"
])
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider
                    .state("/", {
                        abstract: true,
                        url: "/"
                    })
                    .state("home", {
                        url: "/home",
                        templateUrl: "client/templates/home.html",
                        controller: 'homeController'
                    })
                    .state("login", {
                        url: "/login",
                        templateUrl: "client/templates/logUser.html",
                        controller: 'logUserController'
                    })
                    .state("register", {
                        url: "/register",
                        templateUrl: "client/templates/addUser.html",
                        controller: 'addUserController'
                    })
                    .state("edit", {
                        url: "/edit",
                        templateUrl: "client/templates/edit.html",
                        controller: 'editController'
                    });
            $urlRouterProvider.otherwise("home");
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });
        });

