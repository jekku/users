(function () {
    angular.module('usersApp')
      .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', '$rootScope', 'localStorageService'];

    function mainCtrl ($scope, $rootScope, localStorageService) {
        $rootScope.$watch('state', function () {}, true);

        if (localStorageService.get('profile')) {
            $rootScope.state = 'profile';
        }
    }

})();

