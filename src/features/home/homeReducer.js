import actionTypes from '../../constants/actionTypes';
import formTypes from '../../constants/formTypes';

const initialState = {
  form: formTypes.FORM_CREATE,
};

export default function homeReducer(states = initialState, action) {
  switch (action.type) {
    case actionTypes.home.SET_FROM_TYPE:
      return {
        ...states,
        form: action.payload,
      };

    default:
      return states;
  }
}
