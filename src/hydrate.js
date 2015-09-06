export let type = '@reducer:HYDRATE';

export default store =>
	(state, action) =>
		(action !== undefined) && (action.type === type)
			? action.state
			: store(state, action);
