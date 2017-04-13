import { createStore } from 'redux'
import { testAddTodo , testToggleTodo } from 'tests'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state, completed: !state.completed
      };
    default:
      return state;
  }

}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }

}

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextSate, key) => {
        nextSate[key] = reducers[key](
          state[key],
          action
        );
        return nextSate;
      },
      {}
    );
  };
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);
console.log(store.getState());

testAddTodo(todos);
testToggleTodo(todos);
console.log('All tests passed.');
