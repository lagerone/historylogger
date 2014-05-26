(function () {
	
	'use strict';
	
	var loader = (function () {
		var target = document.getElementsByTagName('body')[0];
		var spinner = new Spinner();
		return {
			start: function () {
				spinner.spin(target);
			},
			stop: function () {
				spinner.stop();
			}
		};
	}());

	var dataservice = {
		mock: function (msg, timeout) {
			return $.Deferred(function (def) {
				setTimeout(function () {
					def.resolve(msg);
				}, timeout);
			}).promise();
		}
	};

	var logger = new HistoryLogger();

	$('#demo-button').on('click', runDemo);
	$('#empty-button').on('click', logger.empty);
	
	// logger.log('Starting the demo');
	// logger.log('Next log message');
	// logger.log('Another log message');
	// logger.log('The demo is done');

	
	function runDemo () {
		loader.start();
		$.when(dataservice.mock('Starting the demo', 1000))
			.then(function (m) {
				logger.log(m);
				return dataservice.mock('Next log message', 1000);
			})
			.then(function (m) {
				logger.log(m);
				return dataservice.mock('Another log message', 1000);				
			})
			.then(function (m) {
				logger.log(m);
				return dataservice.mock('The demo is done', 1000);				
			})
			.then(function (m) {
				logger.log(m);				
			})
			.always(loader.stop);
			
	}
}());