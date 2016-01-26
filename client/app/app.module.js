google.setOnLoadCallback(function () {  
    angular.bootstrap(document.body, ['stock-mark-it']);
});
google.load('visualization', '1', {packages: ['corechart']});


angular.module('stock-mark-it', ['ui.router']);