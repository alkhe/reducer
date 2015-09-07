export default (reducer, effect) =>
	(state, action) => {
		effect(state, action);
		return reducer(state, action);
	};
