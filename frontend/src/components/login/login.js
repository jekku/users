(function () {
    angular.module('usersApp.components')
      .directive('login', login)
      .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$rootScope', 'userService'];

    function login () {
        var directive = {
            link: link,
            scope: {},
            templateUrl: '/assets/components/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            bindToContoller: true,
            restricet: 'E'
        };

        function link () {}

        return directive;
    }

    function loginCtrl ($scope, $rootScope, userService) {
        var vm = $scope.vm;

        vm.login = function () {
            userService.login({
                username: vm.username,
                password: vm.password
            }).then(linkProfile, showError);
        }

        vm.goToRegistration = goToRegistration;

        function linkProfile (data) {
            $rootScope.state = 'profile';
            Materialize.toast('Successful Login', 3000);
            $rootScope.user = data.data;
        }

        function showError (error) {
            $rootScope.state = 'login';
            Materialize.toast(error.data.message, 3000);
        }

        function goToRegistration () {
            $rootScope.state = 'register';
        }
    }
})();

