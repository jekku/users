(function () {
    angular.module('usersApp.components')
      .directive('profile', profile)
      .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$rootScope', 'userService'];

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

    function profileCtrl ($scope, $rootScope, userService) {
        var vm = $scope.vm;

        vm.logout = function () {
            userService.logout().then(getHome);
        }

        userService.getProfile()
          .then(display, showErrors);

        function display (data) {
            vm.user = data.data;
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

