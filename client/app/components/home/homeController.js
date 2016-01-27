var socket = io.connect();
angular.module('stock-mark-it')
    .controller('MainCtrl', [
      '$scope',
      'chart',
      'stock',
      function($scope, chart, stock){
        var formData = {};
        $scope.formData = formData;
        $scope.getStocks = getStocksUser;
        $scope.stocks = stock.stocks;
        $scope.removeStock = removeStockUser;

        //Reconnect on refresh to make sure preload fires
        socket = io.connect();
         
        socket.on('addStock', function(data){
            $scope.$apply(function(){
              getStocksByName(data.stock, null);
            });
        });
        
        socket.on('removeStock', function(data){
            $scope.$apply(function(){
              removeStock(data.stock);
            });
        });
          
        socket.on('preload', function(data){
          if(stock.stocks.length == 0 && data.stocks.length > 0){
            $scope.$apply(function(){
              for(var i=0;i<data.stocks.length;i++){
                getStocksByName(data.stocks[i]);
              }
            });
          }
        });
        
        function getStocksUser(){
          getStocksByName(formData.stock_code, function(){
            socket.emit('addStock', formData.stock_code);
            formData.stock_code = '';
          });
        }
        
        function getStocksByName(name, callback){
          stock.getStocks(name, function(data){
            chart.drawFromData(data);
            if(callback)callback();
          });
        }
        
        function removeStockUser(name){
          socket.emit('removeStock', name);
          removeStock(name);
        }
        
        function removeStock(name){
          stock.removeStock(name, function(data){
            chart.drawFromData(data);
          });
        }
        
      }
    ])