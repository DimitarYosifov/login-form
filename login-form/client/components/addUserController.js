"use strict";
angular.module("angular-app.addUserController", [])
    .controller("addUserController", function($scope, $window,userDataService, $rootScope, $http, $state, $timeout) {
        $scope.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
        $scope.rememberMe = false;
        $scope.newUser = {
            country: 'Afghanistan'
        };
        userDataService.auth(function (authorized) {
            if (authorized.success) {
                $state.go('home');
            }
        });
        
        $scope.addUser = function() {
            $scope.uniqueName = null;
            $scope.uniqueEmail = null;
            $scope.watch = $scope.$watchGroup(['uniqueName', 'uniqueEmail'], function(newVal, oldVal) {
                if (typeof $scope.uniqueName === "boolean" && typeof $scope.uniqueEmail === "boolean") {
//                  unbinds watch to prevent multiple execution
                    $scope.watch();
                    if ($scope.uniqueName && $scope.uniqueEmail && $scope.newUser.password===$scope.newUser.confirm) {
                        $scope.saveUser();
                    } else if (!$scope.uniqueName) {
                        alert('nickname already in use!');
                    } else if (!$scope.uniqueEmail) {
                        alert('email already in use!');
                    } else {
                        alert('passwords do not match!');
                    }
                }
            });
            $http.post('/api/uniqueNickname', $scope.newUser)
                .then((res) => {
                    $scope.uniqueName = res.data.success;
                }).catch(function onError(error) {
                    console.log(error);
                });
            $http.post('/api/uniqueEmail', $scope.newUser).then((res) => {
                    $scope.uniqueEmail = res.data.success;
                })
                .catch(function onError(error) {
                    console.log(error);
                });
        };
        $scope.saveUser = function() {
            $http.post('/api/users', $scope.newUser)
                .then((res) => {

                    if ($scope.rememberMe) {
                        $window.localStorage.setItem("user", $scope.newUser.nickname);
                        $window.localStorage.setItem("password", $scope.newUser.password);
                        $window.localStorage.setItem("u_id", res.data._id);
                    }
                    $window.sessionStorage.setItem("user", $scope.newUser.nickname);
                    $window.sessionStorage.setItem("password", $scope.newUser.password);
                    $window.sessionStorage.setItem("u_id", res.data._id);
                    $rootScope.$broadcast('changeStatus', {authorized: true})
                    $state.go("home")
                }).catch(function onError(error) {
                    console.log(error);
                });
        };
    })
    .directive('onlyNumbers', function() {
        return {
            restrict: 'A',
            link: function(scope, elm, attrs, ctrl) {
                elm.on('keydown', function(event) {
                    if (event.shiftKey) {
                        event.preventDefault();
                        return false;
                    }
                    if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows
                        return true;
                    } else if (event.which >= 48 && event.which <= 57) {
                        // numbers 0 to 9
                        return true;
                    } else if (event.which >= 96 && event.which <= 105) {
                        // numpad number
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        };
    });