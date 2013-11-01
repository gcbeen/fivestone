var checkIEPro = (function () {
	var props = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"],
	p,
	index = props.length;
	
	return function checkIEPro(obj, source) {
		for (p in {toString: null}) {
			return obj;
		}
		while (index > 0) {
			prop = props[index];
			if (source.hasOwnProperty(prop)) {
				obj[prop] = source[prop];
			}
		}
		return obj;
	}
}());

function extend(obj) {
	var index = arguments.length,
		source,
		prop;
	while (index > 1) {
		source = arguments[index];
		console.log('--- source ---', source, arguments);
		for (prop in source) {
			obj[prop] = source[prop];
		}
		checkIEPro(obj, source);
		index -= 1;
	}
	return obj;
}
