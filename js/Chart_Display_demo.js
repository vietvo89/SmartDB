//This is Bao testing

$(function () {

alasql("select * from csv('../data/DLA_Module_downtime_summary.csv')",[],function(res){

    var LPP_alarm_description = []; // good (preferred way); = new Array () => Bad  (try to avoid)
    var LPP_alarm_count = [];   
    var TGB_alarm_description = []; // for bar chart
    var TGB_alarm_count = [];
    var xIS_alarm_description = [];   
    var xIS_alarm_count = [];
    var ASF_alarm_description = [];   
    var ASF_alarm_count = [];

    //var alarm_qty_desc = {};
 
 //============================================= transform draw data to data type of high chart ===========================================

    var entity_name = 'LPP';
    
    $('#TGB').click(function(){
        entity_name = 'TGB';
        redraw (entity_name, TGB_alarm_count,TGB_alarm_description);
    });
    $('#xIS').click(function(){
        entity_name = 'xIS';
        redraw (entity_name, xIS_alarm_count,xIS_alarm_description);
    });
    $('#LPP').click(function(){
        entity_name = 'LPP';
        redraw (entity_name, LPP_alarm_count,LPP_alarm_description);
    });
    $('#ASF').click(function(){
        entity_name = 'ASF';
        redraw (entity_name, ASF_alarm_count,ASF_alarm_description);
    });
    
    //console.log('here1');
    var DLA_sub_arr = [];  
    for(i=0;i<res.length;i++){
        
        if (res[i].tool == 'LPP00001'){
            DLA_sub_arr = [];
            LPP_alarm_description[i] = [];
            DLA_sub_arr[1] = res[i].alarm_description;
            LPP_alarm_description[i] = DLA_sub_arr;   
            
            LPP_alarm_count[i] = [];
            LPP_alarm_count[i] = res[i].qty;
           
        }
        if (res[i].tool == 'TGB00001'){
            TGB_alarm_description[i - LPP_alarm_description.length] = [];
            TGB_alarm_description[i - LPP_alarm_description.length] = res[i].alarm_description;     
          
            TGB_alarm_count[i - LPP_alarm_count.length] = [];
            TGB_alarm_count[i - LPP_alarm_count.length] = res[i].qty;

        }
        if (res[i].tool == 'xIS00001'){
            xIS_alarm_description[i - LPP_alarm_description.length - TGB_alarm_description.length] = [];
            xIS_alarm_description[i - LPP_alarm_description.length - TGB_alarm_description.length] = res[i].alarm_description;     
          
            xIS_alarm_count[i - LPP_alarm_count.length - TGB_alarm_count.length] = [];
            xIS_alarm_count[i - LPP_alarm_count.length - TGB_alarm_count.length] = res[i].qty;

        }
        if (res[i].tool == 'ASF'){
            ASF_alarm_description[i - LPP_alarm_description.length - TGB_alarm_description.length - xIS_alarm_description.length] = [];
            ASF_alarm_description[i - LPP_alarm_description.length - TGB_alarm_description.length - xIS_alarm_description.length] = res[i].alarm_description;     
          
            ASF_alarm_count[i - LPP_alarm_count.length - TGB_alarm_count.length - xIS_alarm_count.length] = [];
            ASF_alarm_count[i - LPP_alarm_count.length - TGB_alarm_count.length - xIS_alarm_count.length] = res[i].qty;

        }
        
    }
    //console.log('here2');
    var N0_alarm = [LPP_alarm_count[0],TGB_alarm_count[0],xIS_alarm_count[0],ASF_alarm_count[0]];
    var N1_alarm = [LPP_alarm_count[1],TGB_alarm_count[1],xIS_alarm_count[1],ASF_alarm_count[1]];
    var N2_alarm = [LPP_alarm_count[2],TGB_alarm_count[2],xIS_alarm_count[2],ASF_alarm_count[2]];
    var N3_alarm = [LPP_alarm_count[3],TGB_alarm_count[3],xIS_alarm_count[3],ASF_alarm_count[3]];
    var N4_alarm = [LPP_alarm_count[4],TGB_alarm_count[4],xIS_alarm_count[4],ASF_alarm_count[4]];
        

//============================================= High chart setting ===========================================
    Highcharts.chart('DLA_downtime_summary', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Downtime Summary'
        },
        subtitle: {
            text: 'By Tool'
        },
        xAxis: {
            categories: [
                'DIA001',
                'DIA002',
                'DIA003',
                'DIA004'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total assists each tool'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{name: 'USDT',
                  data: N0_alarm, 
                },
                 {name: 'SDT',
                  data: N1_alarm,
                },
                 {name: 'ENG',
                  data: N2_alarm, 
                },
                 {name: 'SETUP',
                  data: N3_alarm,
                },
                 {name: 'No Operator',
                  data: N4_alarm, 
                }
                ]
        
    });
//================================== chart 1 =============================================================
Highcharts.chart('DLA_downtime_summary_1', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Example chart'
        },
        subtitle: {
            text: 'By Tool'
        },
        xAxis: {
            categories: [
                'DIA001',
                'DIA002',
                'DIA003',
                'DIA004'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total assists each tool'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{name: 'USDT',
                  data: N0_alarm, 
                },
                 {name: 'SDT',
                  data: N1_alarm,
                },
                 {name: 'ENG',
                  data: N2_alarm, 
                },
                 {name: 'SETUP',
                  data: N3_alarm,
                },
                 {name: 'No Operator',
                  data: N4_alarm, 
                }
                ]
        
    });
//================================== chart 2 =============================================================
Highcharts.chart('DLA_downtime_summary_2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Example Chart'
        },
        subtitle: {
            text: 'By Tool'
        },
        xAxis: {
            categories: [
                'DIA001',
                'DIA002',
                'DIA003',
                'DIA004'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total assists each tool'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{name: 'USDT',
                  data: N0_alarm, 
                },
                 {name: 'SDT',
                  data: N1_alarm,
                },
                 {name: 'ENG',
                  data: N2_alarm, 
                },
                 {name: 'SETUP',
                  data: N3_alarm,
                },
                 {name: 'No Operator',
                  data: N4_alarm, 
                }
                ]
        
    });

//================================== chart 3 =============================================================
Highcharts.chart('DLA_downtime_summary_3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Example chart'
        },
        subtitle: {
            text: 'By Tool'
        },
        xAxis: {
            categories: [
                'DIA001',
                'DIA002',
                'DIA003',
                'DIA004'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total assists each tool'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{name: 'USDT',
                  data: N0_alarm, 
                },
                 {name: 'SDT',
                  data: N1_alarm,
                },
                 {name: 'ENG',
                  data: N2_alarm, 
                },
                 {name: 'SETUP',
                  data: N3_alarm,
                },
                 {name: 'No Operator',
                  data: N4_alarm, 
                }
                ]
        
    });

//================================== chart 4 =============================================================
Highcharts.chart('DLA_downtime_summary_4', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Example chart'
        },
        subtitle: {
            text: 'By Tool'
        },
        xAxis: {
            categories: [
                'DIA001',
                'DIA002',
                'DIA003',
                'DIA004'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total assists each tool'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{name: 'USDT',
                  data: N0_alarm, 
                },
                 {name: 'SDT',
                  data: N1_alarm,
                },
                 {name: 'ENG',
                  data: N2_alarm, 
                },
                 {name: 'SETUP',
                  data: N3_alarm,
                },
                 {name: 'No Operator',
                  data: N4_alarm, 
                }
                ]
        
    });
});
});

