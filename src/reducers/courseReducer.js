import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
	switch(action.type) {
		case types.LOAD_COURSES_SUCCESS:
			// ES6 recommends immutability, hence the following
			// two lines are wrong as it mutates the state directly
			// state.push(action.course);
			// return state;

			//return [...state,
			//	Object.assign({}, action.course)
			//];
			return action.courses;

		case types.CREATE_COURSE_SUCCESS:
			return [...state, 
				Object.assign({}, action.course)
			];

		case types.UPDATE_COURSE_SUCCESS:
			return [
				...state.filter(course => course.id != action.course.id),
				Object.assign({}, action.course)
			];
		default:
			return state;
	}
}
