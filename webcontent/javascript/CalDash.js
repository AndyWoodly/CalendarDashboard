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
        this.allDay = (undefined === params.allDay ? false : params.allDay);
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

    Event.prototype.isAllDay = function() {
		return this.allDay;
	};

	return Event;

})();


var EventManager = (function(){

    function EventManager(params) {
        params = params || {};
        this.setEvents(params.events);
        this.dates = [];
        this.dateEvents = {};
    }

    EventManager.prototype.update = function(date) {
        this.date = date || new Date();
        var uEvents = [];
        var uDates = {};
        var uDateEvents = {};
        var me = this;
        Utils.each(this.events, function(event) {
            if (me.date <= event.getStartDate() || me.date < event.getEndDate()) {
                uEvents.push(event);
                var eventDate = (me.date <= event.getStartDate() ? event.getStartDate() : event.getEndDate());
                eventDate = eventDate.clone().clearTime();
                uDates[eventDate] = true;
                var events = uDateEvents[eventDate];
                if (events === undefined) {
                    events = [];
                    uDateEvents[eventDate] = events;
                }
                events.push(event);
            }
        });
        this.setEvents(uEvents);
        var uDatesArray = [];
        var d;
        for (d in uDates) {
            uDatesArray.push(new Date(Date.parse(d)));
        }
        uDatesArray.sort(function (a, b) {
            // start date sort
            return a.getTime() - b.getTime();
        });
        this.dates = uDatesArray;
        this.dateEvents = uDateEvents;
    };

    EventManager.prototype.getEvents = function() {
        return this.events;
    };

    EventManager.prototype.setEvents = function(events) {
        this.events = (undefined === events ? [] : events);
        this.events.sort(function (a, b) {
            // start date sort
            return a.getStartDate().getTime() - b.getStartDate().getTime();
        });
        this.nextEvent = (this.events.length > 0 ? this.events[0] : undefined);
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

GoogleConverter.convertItem = function(item) {
    var params = {};
    var titleParts = CalDash.utils.parseTitle(item.summary);
    params.type = titleParts.type;
    params.title = titleParts.title;
    params.person = titleParts.person;

    params.location = item.location;
    params.description = item.description;
    var startTime = item.start.dateTime !== undefined ? item.start.dateTime : item.start.date;
    params.startDate = new Date(Date.parse(startTime));
    var endTime = item.end.dateTime !== undefined ? item.end.dateTime : item.end.date;
    params.endDate = new Date(Date.parse(endTime));
    if (item.start.date !== undefined) {
        params.allDay = true;
    }
    return new Event(params);
};

GoogleConverter.convert = function(data) {
    var items;
    if (data instanceof Array) {
        items = data;
    } else {
        items = data.items;
    }
    var events = [];
    Utils.each(items, function(item) {
        events.push(GoogleConverter.convertItem(item));
    });
    return events;
};


// utilities

CalDash.utils = {

    // Format: "Serie -- Vorname Name: Titel"
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
    },

    formatDate: function(myDate) {
        return myDate.toFormat("DDD MMM DD");
    },

    formatTime: function(event) {
        if (event.isAllDay() === true) {
            return 'all day';
        } else {
            return event.getStartDate().toFormat("HH24:MI") + " - " + event.getEndDate().toFormat("HH24:MI");
        }
    },
    
    formatRFC3339: function(date) {
        return date.toFormat("YYYY-MM-DDTHH:MI:SSZ");
    },

    formatTimeToStart: function(millisLeft) {
        var resSingle = [ "second", "minute", "hour", "day" ];
        var resMultiple = [ "seconds", "minutes", "hours", "days" ];
        var getRes = function(count, idx) {
            if (count > 1) {
                return resMultiple[idx];
            } else {
                return resSingle[idx];
            }
        };
        var factors = [ 60, 60, 24 ]; // minutes, hours, days
        var diff = millisLeft / 1000.0;
        var idx = 0;
        while (idx < 3 && diff > factors[idx]) {
            diff /= factors[idx];
            idx++;
        }

        var intDiff = Math.abs(diff - Math.floor(diff));
        var finalDiff = diff - intDiff;
        var result = Math.floor(finalDiff) + " " + getRes(finalDiff, idx);
        if (intDiff > 0) {
            var rest = Math.floor(intDiff * factors[idx-1]);
            result = result + " and " + rest + " " + getRes(rest, idx-1);
        }
        return result;
    }

};

