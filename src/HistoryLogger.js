(function(root, factory) {

	'use strict';

	// CommonJS
	if (typeof exports === 'object') {
		module.exports = factory();
	}

	// AMD module
	else if (typeof define === 'function' && define.amd) {
		 define(factory);
	}

	// Browser global
	else {
		root.HistoryLogger = factory();
	}

}(this, function () {

	'use strict';

	var HistoryLogger = function () {
		this._settings = {
			wrapperId: 'logger-wrapper',
			wrapperCollapsedClass: 'logger-wrapper-collapsed',
			loggerControllClass: 'logger-controll',
			loggerItemClass: 'logger-item',
			loggerItemExpandedClass: 'logger-item-expanded',
			loggerItemCollapsedClass: 'logger-item-collapsed',
			dateTimeClass: 'logger-item-datetime',
			msgClass: 'logger-item-msg'
		};
		this._logWrapper = undefined;
		this._logControll = undefined;
		this._body = undefined;

		this.log = function (msg) {
			if (!msg) {
				throw new Error('You must pass a message to log');
			}
			this.setLogWrapper();
			var logEl = this.getLogElement(msg);
			this._logWrapper.insertBefore(logEl, this._logWrapper.firstChild);
			this.hideLoggerItemHistory();
			if (!this._logControll) {
				this._logControll = this.getLogControll();
				this._logWrapper.appendChild(this._logControll);
			}
		};

		this.empty = function (event) {
			event.preventDefault();
			if (!this._logWrapper) {
				return;
			}
			this._logWrapper.innerHTML = '';
			this._logControll = undefined;
		}.bind(this);
	};

	var hp = HistoryLogger.prototype;

	hp.setLogWrapper = function () {
		if (this._logWrapper) {
			return false;
		}
		this._logWrapper = document.createElement('div');
		this._logWrapper.id = this._settings.wrapperId;
		this._logWrapper.addEventListener('mouseover', this.toggleLoggerItemHistory.bind(this), false);
		this._logWrapper.addEventListener('mouseout', this.toggleLoggerItemHistory.bind(this), false);
		this._body = document.getElementsByTagName('body')[0];
		this._body.appendChild(this._logWrapper);
		return true;
	};
	hp.getLogControll = function () {
		var c, a;
		c = hp.getNodeWithClass(this._settings.loggerControllClass);
		a = hp.getNodeWithClass(null, 'Clear log', 'a');
		a.href = "#";
		a.addEventListener('click', this.empty, false);
		c.appendChild(a);
		return c;
	};
	hp.getLogElement = function (msg) {
		var wrapEl, logEl, dateTimeEl, msgEl, hEl;
		wrapEl = this.getNodeWithClass(this._settings.loggerItemClass);
		logEl = this.getNodeWithClass(this._settings.loggerItemExpandedClass);
		dateTimeEl = this.getNodeWithClass(this._settings.dateTimeClass, this.getFormattedDateTime());
		msgEl = this.getNodeWithClass(this._settings.msgClass, msg);
		hEl = this.getNodeWithClass(this._settings.loggerItemCollapsedClass, 'h');
		logEl.appendChild(dateTimeEl);
		logEl.appendChild(msgEl);
		wrapEl.appendChild(logEl);
		wrapEl.appendChild(hEl);
		wrapEl.addEventListener('click', this.toggleLoggerCollapseState.bind(this), false);

		return wrapEl;
	};
	hp.getNodeWithClass = function (className, text, type) {
		var el = document.createElement(type || 'div');
		if (className) {
			el.setAttribute('class', className);
		}
		if (text) {
			el.textContent = text;
		}
		return el;
	};
	hp.toggleLoggerItemHistory = function () {
		var loggerItems = this._logWrapper.querySelectorAll('.' + this._settings.loggerItemClass);
		var i;
		var limit = loggerItems.length;
		for (i = 1; i < limit; i++) {
			loggerItems[i].classList.toggle('hidden');
		}
	};
	hp.toggleLoggerCollapseState = function () {
		this._logWrapper.classList.toggle(this._settings.wrapperCollapsedClass);
	};
	hp.hideLoggerItemHistory = function () {
		var loggerItems = this._logWrapper.querySelectorAll('.' + this._settings.loggerItemClass);
		var i;
		var limit = loggerItems.length;
		for (i = 1; i < limit; i++) {
			loggerItems[i].classList.add('hidden');
		}
	};
	hp.getFormattedDateTime = function () {
		var d = new Date(),
			month = this.forceTwoDigits(d.getMonth() + 1),
			day = this.forceTwoDigits(d.getDate()),
			hours = this.forceTwoDigits(d.getHours()),
			minutes = this.forceTwoDigits(d.getMinutes()),
			seconds = this.forceTwoDigits(d.getSeconds());
		return [d.getFullYear(), month, day].join('-') + ' ' + hours + ':' + minutes + ':' + seconds;
	};
	hp.forceTwoDigits = function (int) {
		var strInt = int + '';
		if (strInt.length === 1) {
			strInt = '0' + strInt;
		}
		return strInt;
	};

	return HistoryLogger;

}));