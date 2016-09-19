(function () {
    angular.module('usersApp.components')
      .directive('profile', profile)
      .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$rootScope', 'userService', 'localStorageService'];

    function profile () {
        var directive = {
            link: link,
            scope: {},
            templateUrl: '/assets/components/profile/profile.html',
            controller: 'profileCtrl',
            controllerAs: 'vm',
            bindToContoller: true,
            restricet: 'E'
        };

        function link () {}

        return directive;
    }

    function profileCtrl ($scope, $rootScope, userService, localStorageService) {
        var vm = $scope.vm;

        vm.logout = function () {
            localStorageService.remove('profile');
            userService.logout().then(getHome);
        }

        userService.getProfile()
          .then(display, showErrors);

        function display (data) {
            vm.user = data.data;
            localStorageService.set('profile', vm.user);
        }

        function showErrors (error) {
            Materialize.toast(error.data.message, 3000);
        }

        function getHome () {
            $rootScope.state = 'login';
            Materialize.toast('Successfully logged out', 3000);
        }
    }
})();

