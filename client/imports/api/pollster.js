
Template.pollster.helpers({
	charts: function() {
/* 
http://elections.huffingtonpost.com/pollster/api
*	Each state has pollster charts, this returns values.


METHODS: 
/charts/
--state, topic, showall(bool)
/charts/SLUG/
/polls/
--page, chart, state, topic, before, after, sort, showall
*/
	
	var ipInfo = Session.get('ipInfo');
	var method = 'charts';
	var params = {};
	// params.state = abbr_State(ipInfo.region, 'abbrev');
	params.state = "US";
	params.topic = '2016-president';
	urlParams = jQuery.param(params);
	var res =  ReactiveMethod.call('huffPollster', method, urlParams);
	console.log(res);
	return res;
	  
	},
	topChart: function() {
		//console.log(this);
		
		var arr = [];
		
		var bingo = _.each(this.estimates, function(p) {
		  	arr.push({name: p.choice, y: p.value});
		  	});
		
	    return {
				chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: true,
	        type: 'pie'
		    },
		    title: {
		        text: this.title
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                style: {
		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                }
		            }
		        }
		    },
		    series: [{
		        name: 'Incumbents',
		        data: arr

					/*	
		        	data is an array of objects of properties (name, y).
		        	Take array of "estimates" if values exist, then spit out new array of name: and y: based on this array.
		        		
					var arr = []
					var bingo = _.each(results, function(o) {
					  _.each(o.estimates, function(p) {
					  	arr.push({name: p.choice, y: p.value})
					  	})
					  });

					*/
					/*	        		
			        [
			            { name: this.estimates[0].choice, y: this.estimates[0].value },
			            { name: this.estimates[1].choice, y: this.estimates[1].value },
		          
			        ]
			        */
		    }]
		  };
		},
		date: function() {
			var utcDate = this.last_updated;
			
			var localDate = new Date(utcDate);
			localDate = localDate.toLocaleDateString("en-US");
			return localDate;
		}
});