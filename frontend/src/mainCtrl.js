(function () {
    angular.module('usersApp')
      .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', '$rootScope'];

    function mainCtrl ($scope, $rootScope) {
        $rootScope.$watch('state', function () {}, true);
    }

})();

