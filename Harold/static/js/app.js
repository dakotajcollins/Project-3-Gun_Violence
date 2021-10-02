state = "California";
start_date = new Date('1/30/2019');
end_date = new Date('1/31/2021');
var gdata
graphing = function(state,start_date,end_date)
{

var url = "https://us-gun-sale-and-violence-report-api.azurewebsites.net/api/v1.0/completedata";

d3.json(url).then(function(response) {
    gdata = response
    var killed = []
    var injured = []
    var dates = []
    statedata = gdata.filter(d => {
        var monthday = d.feature.Date;
        var year = d.feature.Year;
        var date = new Date(monthday +', '+year)
        return (d.feature.State==state && date>=start_date && date<=end_date)
    })
    injuredsort = statedata.sort((a,b)=>{
        var monthday = a.feature.Date;
        var year = a.feature.Year;
        var adate = new Date(monthday +', '+year)
        var monthday = b.feature.Date;
        var year = b.feature.Year;
        var bdate = new Date(monthday +', '+year)
        return a.feature.Injured<b.feature.Injured
    })
    injuredsort.slice(0,10)
    killed = injuredsort.slice(0,10).map(d=>d.feature.Killed)
    injured = injuredsort.slice(0,10).map(d=>d.feature.Injured)
    dates = injuredsort.slice(0,10).map(d=>d.feature.Date+", "+d.feature.Year)
    /*for (var i = 0; i < response.length; i++) {
        var monthday = response[i].feature.Date;
        var year = response[i].feature.Year;
        var date = new Date(monthday +', '+year)
        if (response[i].feature.State==state && date>=start_date && date<=end_date){
            killed.push(response[i].feature.Killed)
            injured.push(response[i].feature.Injured)
            dates.push(date)
        }
    }*/
console.log(injuredsort.slice(0,10))
console.log(killed)
console.log(injured)
console.log(dates)


 /* for (var i = 0; i < response.length; i++) {

    var monthday = response[i].feature.Date;
    var year = response[i].feature.Year;
    var date = new Date(monthday +', '+year)
    var state1 = response[i].feature.State;
    var killed = response[i].feature.Killed;
    var injured = response[i].feature.Injured;*/
    //console.log(response)

    //if (response[i].feature.State==state && date>=start_date && date<=end_date)
    //{
      var trace1 = 
        {
          x: dates,
          y: killed,
          name: "Killed",
          type: "bar",
        }
        ;

      var trace2 = 
        {
          x: dates,
          y: injured,
          name: "Injured",
          type: "bar",
        }
      ;
      var bardata = [trace1, trace2];

      var barLayout = {
        title: "Amount Killed and Injured",
        barmode:'group'
      };
      /*var data = 
        {
          x: killed,
          y: injured,
          mode: 'markers',
          type: 'scatter'
        }
      ];*/
      
      //Plotly.newPlot('bar', data);
      Plotly.newPlot("bar", bardata, barLayout);
      
      var trace5 = 
        {
          x: dates,
          y: killed,
          name: "Killed",
          mode: 'lines',
          type: 'scatter'
        }
      ;

      var trace6 = 
        {
          x: dates,
          y: injured,
          name: "Injured",
          mode: 'lines',
          type: 'scatter'
        }
      ;
      var bardata3 = [trace5, trace6];

      var barLayout3 = {
        title: "Amount Killed and Injured",
      };
      Plotly.newPlot("line", bardata3, barLayout3);
    //}
    /*var data = [{
        values: [injured,killed],
        labels: ["Injured","Killed"],
        type: 'pie'
      }];
      
      var layout = {
        height: 400,
        width: 500
      };
      
      Plotly.newPlot('pie', data, layout); */
   
  /*  else if (state=='All' && date>=start_date && date<=end_date)
    {
        var trace3 = [
            {
              x: killed,
              y: state1,
              name: "Killed",
              type: "bar",
              orientation: "h",
            }
          ];
    
          var trace4 = [
            {
              x: injured,
              y: state1,
              name: "Injured",
              type: "bar",
              orientation: "h",
            }
          ];
          var bardata2 = [trace3, trace4];
    
          var barLayout = {
            title: "Amount Killed and Injured",
            barmode:'group'
          };
        
          Plotly.newPlot("bar", bardata2, barLayout);

          var trace7 = [
            {
              x: killed,
              y: state1,
              name: "Killed",
              mode: 'lines',
            }
          ];
    
          var trace8 = [
            {
              x: injured,
              y: state1,
              name: "Injured",
              mode: 'lines',
            }
          ];
          var bardata4 = [trace7, trace8];
    
          var barLayout4 = {
            title: "Amount Killed and Injured",
          };
          Plotly.newPlot("line", bardata4, barLayout4);
        }*/

  


});
};
graphing(state,start_date,end_date)
