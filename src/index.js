import { Component, injectStore } from './hoc';
import { withStore, createStore as cs, actionCreator } from './store';

const withState = Component;

const createStore = (initialState, middleware) => {
    const store = cs(initialState, middleware);
    injectStore(store);
    return store;
}

export {
    Component,
    withState,
    withStore,
    injectStore,
    createStore,
    actionCreator
};

export default {
    withState,
    withStore,
    Component,
    injectStore,
    createStore,
    actionCreator
};

