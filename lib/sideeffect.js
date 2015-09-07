"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (reducer, effect) {
	return function (state, action) {
		effect(state, action);
		return reducer(state, action);
	};
};

module.exports = exports["default"];