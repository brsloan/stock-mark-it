angular.module('stock-mark-it')
    .factory('chart', function() {
      var o = {};
      o.drawExample = drawExample;
      o.drawFromData = drawFromData;
      return o;
      
      function drawExample(){
          var exampleDataSet1 = {
                dataset_code:"FB",
                name: 'Facebook Inc. (FB) Prices, Dividends, Splits and Trading Volume',
                column_names:["Date","Close"],
                data: [["2016-01-25",97.01],
                      ["2016-01-22",97.94],
                      ["2016-01-21",94.16],
                      ["2016-01-20",94.35],
                      ["2016-01-19",95.26],
                      ["2016-01-15",94.88],
                      ["2016-01-14",98.37],
                      ["2016-01-13",95.44],
                      ["2016-01-12",99.37],
                      ["2016-01-11",97.5],
                      ["2016-01-08",97.33],
                      ["2016-01-07",97.92],
                      ["2016-01-06",102.97],
                      ["2016-01-05",102.73],
                      ["2016-01-04",102.02],
                      ["2015-12-31",104.66],
                      ["2015-12-30",106.22],
                      ["2015-12-29",107.26]]
          };
          
          var exampleDataSet2 = {
                dataset_code:"GOOG",
                name: 'Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume',
                column_names:["Date","Close"],
                data: [["2016-01-25",711.67],
                      ["2016-01-22",725.25],
                      ["2016-01-21",706.59],
                      ["2016-01-20",698.45],
                      ["2016-01-19",701.79],
                      ["2016-01-15",694.63],
                      ["2016-01-14",714.8],
                      ["2016-01-13",700.56],
                      ["2016-01-12",726.07],
                      ["2016-01-11",716.03],
                      ["2016-01-08",714.47],
                      ["2016-01-07",726.39],
                      ["2016-01-06",743.62],
                      ["2016-01-05",742.58],
                      ["2016-01-04",740.23],
                      ["2015-12-31",758.88],
                      ["2015-12-30",771.0],
                      ["2015-12-29",776.6]]
          };
          
          
            drawFromData([exampleDataSet1, exampleDataSet2]);
      }
      
      function drawFromData(dataSetArray){
        
        
        var colIndexes = [];
        var joinedData;
        
        for(var i=0;i<dataSetArray.length;i++){
          var data = new google.visualization.DataTable();
          data.addColumn('date', 'Date');
          data.addColumn('number', dataSetArray[i].dataset_code);
          data.addRows(dataSetArray[i].data.map(function(val){
            return [new Date(Date.parse(val[0])),val[1]];
          }));
          
          if(i==0){
            joinedData = data;
          }
          else {
            colIndexes.push(i);
            joinedData = google.visualization.data.join(joinedData, data, 'full', [[0, 0]], colIndexes, [1]);
          }
          
        }
        
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(joinedData, {
            interpolateNulls: true,
           crosshair: { trigger: 'both' }
        });
       
      }
      
    });