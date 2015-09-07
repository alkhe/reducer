# reducer

Official Reducers for [fluxette](https://github.com/edge/fluxette), and compatible with [Redux](https://github.com/rackt/redux).

**What's a Reducer?**

In case you didn't get here from fluxette or Redux, a Reducer is simply a function that takes an aggregate, which we refer to as a *state*, and a transaction, which we refer to as an *action*, which it combines, or *reduces*, to produce a new state. Thus, they all have the signature of `(State, Action) => State)`. Reducers are very useful for state management, a large element of the Flux Architecture.

A fundamental property of Reducers is that they are composable, which allows for orthogonal code, separation of concerns, and easy scaling. This means that one reducer can hold other reducers, which hold even more reducers.

## Install

```sh
npm install --save reducer
```

## Reducer Creators

**Shape(shape)**
Creates a reducer that holds more reducers on each of its properties. The property names reflect how they will appear on the state.

```js
import Shape from 'reducer/shape';
import { stock, cart } from './reducers';

let store = Shape({ stock, cart });

store()
// { stock: stock(), cart: cart() }
```

**Leaf(initial, reducers)**
Creates a reducer that applies its reducers to a state respective to the type of the action provided (`action.type`), using `initial` as the initial state.

```js
import Leaf from 'reducer/leaf';

let dataReducer = Leaf({ status: 'ready' }, {
	[API_REQUEST]: state => ({ status: 'loading' }),
	[API_DONE]: (state, action) => ({ status: 'done', data: action.data }),
	[API_FAIL]: (state, action) => ({ status: 'error', error: action.error })
});
```

**Filter(types, reducer)**
Creates a reducer that proxies its action to its reducers only if the action's type matches one of its types.

```js
import Filter from 'reducer/filter';

let userReducer = Filter([USER_LOGIN, USER_LOGOUT, USER_CHAT], user);
```

**History()**
Creates a reducer that keeps track of the actions that have been dispatched.

```js
import Shape from 'reducer/shape';
import History from 'reducer/history';

let reducer = Shape({
	history: History()
}))

let state;
state = reducer(state, { type: TYPE_A, data: 'a' })
state = reducer(state, { type: TYPE_B, data: 'b' })
state = reducer(state, { type: TYPE_C, data: 'c' })

state.history
// [{ type: TYPE_A, data: 'a' }, { type: TYPE_B, data: 'b' }, { type: TYPE_C, data: 'c' }]
```

**Hydrate(reducer)**
Creates a reducer that wraps `reducer`, and replaces the state with `action.state` if the action is of type `Hydrate:type`.

```js
import Hydrate, { type as HYDRATE_TYPE } from 'reducer/hydrate';

let reducer = Hydrate(/* other reducer */);

let state;
state = reducer(state, { type: HYDRATE_TYPE, state: { a: 5, b: 6 }});

state
// { a: 5, b: 6 }
```

**SideEffect(reducer, effect)**
Creates a reducer that wraps `reducer`, and calls `effect` as if it were a Reducer, but ignores its return value.

```js
import SideEffect from 'reducer/sideeffect';

let loggingReducer = SideEffect(reducer, (state, action) => console.log(action));

loggingReducer(state, action)

// effectively the same as reducer(state, action), but also logs actions
```
