/* 
 * Copyright Adam Iley, Andreas Hölzl
 * 
 * @author kybernetikos@gmail.com
 * @author andy.woodly@googlemail.com
 */

var Utils = (function() {
    
	function Utils() {}
	
	Utils.prototype.extend = function(subclass, superclass) {
		var intermediate = function() {};
		intermediate.prototype = superclass.prototype;
		subclass.prototype = new intermediate();
	};
	
	Utils.prototype.visit = function(baseNode, visitor) {
		visitor(baseNode);
		var children = baseNode.childNodes;
		for (var i = 0; i < children.length; i++) {
			Utils.prototype.visit(children[i], visitor);
		}
	};
	
	Utils.prototype.getFile = function getFile(url, successHandler, failureHandler, timeout, timeoutHandler) {
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4) {
				if (req.status == 200 || (url.substring(0, 5) == 'file:' && req.status === 0)) {
					successHandler(req.responseText, req.getAllResponseHeaders());
				} else {
					if (failureHandler !== null) {
						failureHandler(url, req.status);
					}
				}
			}
		};
		req.send(null);
		if (timeout !== null && timeout > 0) {
			setTimeout(function() {
				req.abort();
				if (timeoutHandler !== null) {
					timeoutHandler(url, timeout);
				}
			}, timeout);
		}
	};
	
	Utils.prototype.removeChildren = function removeChildren(element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	};
	
	var evaluator = new XPathEvaluator();
	Utils.prototype.xpath = function xpath(expr, context) {
		var xpathResult = evaluator.evaluate(expr, context, null, XPathResult.ANY_TYPE, null);
		return xpathResult.iterateNext();
	};
	Utils.prototype.remove = function(array, value) {
		var index = this.indexOf(array, value);
		if (index >= 0) {
			array.splice(index, 1);
		}
	};
	Utils.prototype.indexOf = function(array, value) {
		for (var i =0; i < array.length; ++i) {
			if (array[i] == value) {
				return i;
			}
		}
		return -1;
	};
	
	var newId = 0;
	Utils.prototype.clone = function clone(templateName) {
		var template = document.getElementById(templateName);
		var newInstance = template.cloneNode(true);
		newInstance.setAttribute('id', 'clone-'+templateName+'-'+(newId++));
		return newInstance;
	};
	
	Utils.prototype.clamp = function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	};
	
	Utils.prototype.store = function store(name, data) {
		try {
			localStorage[name] = JSON.stringify(data);
		} catch (e) {
			return false;
		}
		return true;
	};
	
	Utils.prototype.findCSSRule = function findCSSRule(selector) {
		var styleSheets = document.styleSheets;
		for (var i = 0; i < styleSheets.length; ++i) {
			var rules = styleSheets[i].rules || styleSheets[i].cssRules;
			for (var j=0; j < rules.length; j++) {
				if (rules[j].selectorText.toLowerCase() == selector) {
					return rules[j];
				}
			}
		}
		return null;
	};
	
	Utils.prototype.addClass = function addClass(element, className) {
		var allClasses = element.className.split(" ");
		if (this.indexOf(allClasses, className) < 0) {
			element.className += " "+className;
		}
	};

	Utils.prototype.each = function(array, func) {
		for (var i = 0; i < array.length; ++i) {
			func(array[i]);
		}
	};
	
	Utils.prototype.toSet = function toSet(string) {
		var items = string.split(" ");
		var result = {};
		for (var i = 0; i<items.length; ++i) {
			result[items[i]] = true;
		}
		return result;
	};
	
	Utils.prototype.hasClass = function hasClass(element, className) {
		return element.className == className || (element.className+" ").indexOf(" "+className+" ") >= 0;
	};
	
	Utils.prototype.removeClass = function addClass(element, className) {
		var allClasses = element.className.split(" ");
		var position = this.indexOf(allClasses, className);
		if (position >= 0) {
			allClasses.splice(position, 1);
		}
		element.className = allClasses.join(" ");
	};
	Utils.prototype.removeClasses = function removeClasses(element, classNames) {
		var allClasses = element.className.split(" ");
		for (var i = 0; i < classNames.length; ++i) {
			var position = this.indexOf(allClasses, classNames[i]);
			if (position >= 0) {
				allClasses.splice(position, 1);
			}
			
		}
		element.className = allClasses.join(" ");
	};

	Utils.prototype.retrieve = function retreive(name) {
		var stored = localStorage[name];
		if (stored === null) {
			return null;
		}
		return JSON.parse(stored);
	};
	
	Utils.prototype.clear = function clear(name) {
		delete localStorage[name];
	};
	
	function storeLastPosition(coords) {
		delete localStorage.lastData;
		localStorage.lastPosition = JSON.stringify(coords);
	}

    Utils.prototype.trim = function trim(text) {
        if (text === undefined) {
            return text;
        }
        return text.replace (/^\s+/, '').replace (/\s+$/, '');
    };

	return new Utils();

})();


