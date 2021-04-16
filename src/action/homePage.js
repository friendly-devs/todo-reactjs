import actionTypes from '../actionTypes';

const setFormType = (formType) => ({
  type: actionTypes.homePage.SET_FROM_TYPE,
  payload: formType,
});

export { setFormType as default };
