(function () {
    "use strict"

    angular.module("ngjsIntlTelInput", []).directive('ngjsIntlTelInput', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                options: '=',
                ngRequired: '='
            },
            template: '<input id="drphone" type="tel" ng-model="data" ng-required="ngRequired" ng-pattern="pattern">',
            link: function (scope, element, attrs, ctrl) {
                
                var input = document.querySelector("#drphone");

                // initialise plugin
                scope.options.utilsScript = './utils.js';
                var iti = window.intlTelInput(input, scope.options);

                scope.$watch('ngModel', function(v) {
                    if (scope.notWatchModel) {
                        scope.notWatchModel = false;
                        return;
                    }
                    if (v) {
                        iti.setNumber(v);

                        $timeout(function() {
                            var value = element.find('#drphone').val();
                            value = value.replace(/ /g, '');
                            element.find('#drphone').val(value);
                        }, 1000)
                    }
                });

                input.addEventListener('change', function () {
                    eventFuntion();
                });
                input.addEventListener('keyup', function () {
                    eventFuntion();
                });
                input.addEventListener('blur', function () {
                    eventFuntion();
                });
                input.addEventListener("countrychange", function () {
                    eventFuntion();
                });

                var eventFuntion = function () {
                    if (iti.isValidNumber()) {
                        $timeout(function () {
                            scope.notWatchModel = true;
                            scope.ngModel = iti.getNumber();
                            scope.pattern = '[0-9]+';
                        });
                    } else {
                        $timeout(function () {
                            scope.pattern = '[]+';
                        });
                    }
                };
            }
        }
    }]);
}).call(this);
