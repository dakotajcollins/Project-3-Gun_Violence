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

console.log(injuredsort.slice(0,10))
console.log(killed)
console.log(injured)
console.log(dates)

const line = {
  labels: dates,
  datasets: [
      {
          name: "Amount Killed",
          values: killed,
          chartType: 'bar'
      },
      {
          name: "Amount Injured",
          values: injured,
          chartType: 'bar'
      },
      {
        name: "Amount Killed",
        values: killed,
        chartType: 'line'
      },
      {
        name: "Amount Injured",
        values: injured,
        chartType: 'line'
      },
  ]
}

const linechart = new frappe.Chart("#LineBarchart", {  
                                         
  title: "Crime from Gun Violence",
  data: line,
  type: 'axis-mixed', 
  height: 250,
  colors: ['#7cd6fd', '#743ee2']
})


});
};
graphing(state,start_date,end_date)
