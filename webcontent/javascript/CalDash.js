/*
 Copyright © Andreas Hölzl
 @author twitter.com/andywoodly
*/

var CalDash = {};

var Event = (function(){

	function Event(params) {
		params = params || {};
		this.type = (undefined === params.type ? '' : params.type);
		this.title = (undefined === params.title ? '' : params.title);
		this.description = (undefined === params.description ? '' : params.description);
		this.person = (undefined === params.person ? '' : params.person);
		this.location = (undefined === params.location ? '' : params.location);
		this.startDate = (undefined === params.startDate ? undefined : params.startDate);
		this.endDate = (undefined === params.endDate ? undefined : params.endDate);
	}

	Event.prototype.getType = function() {
		return this.type;
	};

	Event.prototype.getTitle = function() {
		return this.title;
	};

	Event.prototype.getPerson = function() {
		return this.person;
	};

	Event.prototype.getLocation = function() {
		return this.location;
	};

	Event.prototype.getDescription = function() {
		return this.description;
	};

	Event.prototype.getStartDate = function() {
		return this.startDate;
	};

	Event.prototype.getEndDate = function() {
		return this.endDate;
	};

	return Event;

})();


var EventManager = (function(){

    function EventManager(params) {
        params = params || {};
        this.events = (undefined === params.events ? [] : params.events);
        this.events.sort();
        this.nextEvent = (this.events.length > 0 ? [0] : new Event());
        this.dates = [];
        this.dateEvents = {};
    }

    EventManager.prototype.update = function(date) {
        this.date = date || new Date();
        var currDate = this.date;
        var newEvents = [];
        Utils.each(this.events, function(event) {
            if (currDate <= event.getStartDate() || currDate < event.getEndDate()) {
                newEvents.push(event);

            }
        });
    };

    EventManager.prototype.getNextEvent = function() {
        return this.nextEvent;
    };

    EventManager.prototype.getDates = function() {
        return this.dates;
    };

    EventManager.prototype.getEventsForDate = function(date) {
        return this.dateEvents[date];
    };

    return EventManager;

})();


// calendar converter

function GoogleConverter() {}

GoogleConverter.convert = function(item) {
    var params = {};
    var titleParts = parseTitle(item.summary);
    params.type = titleParts.type;
    params.title = titleParts.title;
    params.person = titleParts.person;

    params.location = item.location;
    params.description = item.description;
    params.startDate = new Date(Date.parse(item.start.dateTime));
    params.endDate = new Date(Date.parse(item.end.dateTime));
    return new Event(params);
};


// utilities

CalDash.utils = {

    // "Serie -- Vorname Name: Titel"
    parseTitle: function (text) {
        var result = {};
        if (text !== undefined) {
            var parts = text.split("--");
            if (parts.length == 2) {
                result.type = Utils.trim(parts[0]);
                this.parseNameTitle(parts[1], result);
            } else {
                this.parseNameTitle(text, result);
            }
        }
        return result;
    },

    parseNameTitle: function (text, result) {
        if (text !== undefined) {
            var nameTitle = text.split(":", 2);
            if (nameTitle.length == 2) {
                result.person = Utils.trim(nameTitle[0]);
                result.title = Utils.trim(nameTitle[1]);
            } else {
                result.title = Utils.trim(text);
            }
        }
    }

};

