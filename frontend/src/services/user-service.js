(function () {
    angular.module('usersApp.service.userService', [])
      .service('userService', userService);

    userService.$inject = ['$http', '__env'];

    function userService ($http, __env) {
        var baseUrl = __env.apiUrl + __env.baseUrl + '/user';

        return {
            login: login,
            register: register,
            logout: logout,
            getProfile: getProfile
        };

        function login (auth) {
            return $http.post(baseUrl + '/login', auth);
        }

        function register (registrationFields) {
            return $http.post(baseUrl + '/register', registrationFields);
        }

        function logout () {
            return $http.post(baseUrl + '/logout', {});
        }

        function getProfile () {
            return $http.get(baseUrl + '/profile');
        }

    }
})();

