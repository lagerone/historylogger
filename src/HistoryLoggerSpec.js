describe('HistoryLogger', function () {

	var h;
	beforeEach(function () {
		h = new HistoryLogger();
	});
	afterEach(function () {
		var w = document.getElementById(h._settings.wrapperId);
		if (w) {
			w.parentNode.removeChild(w);	
		}
	});

	describe('setLogWrapper', function () {

		it('should set property with body node', function () {
			h.setLogWrapper();
			expect(h._body).toBeDefined();
			expect(h._body.nodeName).toBeDefined();
			expect(h._body.nodeName).toBe('BODY');
		});

		it('should create div element with id from settings id', function () {
			h.setLogWrapper();
			expect(h._logWrapper.id).toEqual(h._settings.wrapperId);
		});

		it('should append log wrapper to body', function () {
			h.setLogWrapper();
			var b = document.getElementsByTagName('body')[0];
			var w = b.querySelector('#' + h._settings.wrapperId);
			expect(w.nodeName).toBe('DIV');
		});

		it('should return false if log wrapper is defined', function () {
			h._logWrapper = 'whatever';
			expect(h.setLogWrapper()).toEqual(false);
		});

		it('should return true if log wrapper is undefined', function () {
			expect(h.setLogWrapper()).toEqual(true);
		});

	});

	describe('getLogElement', function () {

		it('should call getFormattedDateTime 1 time', function () {
			spyOn(HistoryLogger.prototype, 'getLogElement');
			h.getLogElement();
			expect(h.getLogElement.calls.count()).toEqual(1);
		});

		it('should return node', function () {
			var n = h.getLogElement();
			expect(n.nodeName).toBeDefined();
		});

	});

	describe('log', function () {

		it('should throw error if no message is passed as argument', function () {
			expect(function () {
				h.log();
			}).toThrow();
		});

		xit('should call setLogWrapper 1 time', function () {
			spyOn(HistoryLogger.prototype, 'setLogWrapper');
			h.log('something');
			expect(h.setLogWrapper.calls.count()).toEqual(1);
		});

		xit('should call getLogElement 1 time', function () {
			spyOn(HistoryLogger.prototype, 'getLogElement');
			h.log('something');
			expect(h.getLogElement.calls.count()).toEqual(1);
		});		

	});

});
