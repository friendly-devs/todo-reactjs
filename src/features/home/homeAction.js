import actionTypes from '../../constants/actionTypes';

const setFormType = (formType) => ({
  type: actionTypes.home.SET_FROM_TYPE,
  payload: formType,
});

export { setFormType as default };
