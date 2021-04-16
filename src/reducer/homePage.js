import actionTypes from '../actionTypes';
import formType from '../constants/formType';

const initialState = {
  form: formType.FORM_CREATE,
};

export default function homePageReducer(states = initialState, action) {
  switch (action.type) {
    case actionTypes.homePage.SET_FROM_TYPE:
      return {
        ...states,
        form: action.payload,
      };

    default:
      return states;
  }
}
