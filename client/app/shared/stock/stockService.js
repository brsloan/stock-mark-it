angular.module('stock-mark-it')
    .factory('stock', ['$http', function($http){
       var stock = {
           stocks: []
       };
       
       stock.getStocks = getStocks;
       stock.removeStock = removeStock;
       
       return stock;
       
       function getStocks(name, callback){
           //Don't get stock info if it's already in the array
           if(stock.stocks.filter(function(dataset){
               return dataset.dataset_code.toUpperCase() === name.toUpperCase();
           }).length > 0){ return; }
           
          
          var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + name + '.json?limit=360&column_index=4&api_key=wLGi4gLUkXue3_pzFMjK';
          
          $http.get(url).success(function(data){
             stock.stocks.push(data.dataset);
             callback(stock.stocks);
          });
           
       }
       
       function removeStock(name, callback){
           var stockToRemove = stock.stocks.filter(function(stock){
               return stock.dataset_code === name;
           })[0];
           
           var index = stock.stocks.indexOf(stockToRemove);
           
           if(stock.stocks.length > 1)
            stock.stocks.splice(index,1);
           
           callback(stock.stocks);
       }
    }]);