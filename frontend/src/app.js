var env = {};

if (window) {
    Object.assign(env, window.__env);
}

(function (angular, Materialize) {
    angular.module('usersApp', [
        'usersApp.service',
        'usersApp.components'
    ]).constant('__env', env);
})(angular, Materialize);

