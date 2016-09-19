(function () {
    angular.module('usersApp.components')
      .directive('register', register)
      .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$scope', '$rootScope', 'userService'];

    function register () {
        var directive = {
            link: link,
            scope: {},
            templateUrl: '/assets/components/register/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm',
            bindToContoller: true,
            restricet: 'E'
        };

        function link () {}

        return directive;
    }

    function registerCtrl ($scope, $rootScope, userService) {
        var vm = $scope.vm;

        vm.cancelRegistration = cancelRegistration;

        vm.register = function () {
            userService.register({
                username: vm.username,
                email_address: vm.email,
                password: vm.password,
                first_name: vm.firstName,
                last_name: vm.lastName
            }).then(linkProfile, showError);
        }

        function linkProfile (data) {
            $rootScope.state = 'login';
            Materialize.toast('Successful register', 3000);
            $rootScope.user = data.data;
        }

        function cancelRegistration () {
            $rootScope.state = 'login';
        }

        function showError (error) {
            if (error.data.errors) {
                return Materialize.toast('Please add all required fields');
            }

            Materialize.toast(error.data.message, 3000);
        }
    }
})();

