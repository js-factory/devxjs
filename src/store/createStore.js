import Subscription from "./subscription";
import Store from "./store";
import reducer from './reduce';
import actionCreator from './actionCreator';

/**
 *
 *
 * @description creates and returns a store
 * @param {*} [initialState={}]
 * @param {*} [enhancer=[]]
 * @returns {object} store a javascript object
 */
export default function createStore(/* initial state */ initialState = {}, enhancer = []) {
    const subscription = new Subscription();
    const store = new Store(initialState);
    const { subscribe, unsubscribe } = subscription;
    const { setState, getState } = store;
    const middleware = [...enhancer.map(fn => fn(getState)), reducer()(getState)];

    function update(data) {
        const newState = setState.call(store, data);
        return subscription.getAll().map(componentSetState => componentSetState(newState));
    }

    function action(userDefinedAction, props) {
        const fn = actionCreator(userDefinedAction());
        return function (props, behaviors) {
            return fn.apply(null, [getState, middleware, update, props, behaviors]);
        };
    }

    return {
        action,
        setState: getState.bind(store),
        getState: getState.bind(store),
        subscribe: subscribe.bind(subscription),
        unsubscribe: unsubscribe.bind(subscription)
    };
};
