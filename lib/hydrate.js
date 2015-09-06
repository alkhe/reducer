'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var type = '@reducer:HYDRATE';

exports.type = type;

exports['default'] = function (store) {
	return function (state, action) {
		return action !== undefined && action.type === type ? action.state : store(state, action);
	};
};