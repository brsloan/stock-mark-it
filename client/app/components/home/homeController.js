angular.module('stock-mark-it')
    .controller('MainCtrl', [
      '$scope',
      'home',
      'chart',
      'stock',
      function($scope, home, chart, stock){
        var formData = {};
        $scope.formData = formData;
        $scope.getStocks = getStocks;
        $scope.stocks = stock.stocks;
        $scope.removeStock = function(name){
          stock.removeStock(name, function(data){
            chart.drawFromData(data);
          });
        };
        
        if(stock.stocks.length < 1){
          formData.stock_code = "GOOG";
          getStocks();
        }
          
        
        function getStocks(){
          stock.getStocks(formData.stock_code, function(data){
            chart.drawFromData(data);
          });
        }
        
      }
    ])