/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_USER = 'app/App/GET_USER';
export const SET_USER = 'app/App/SET_USER';
export const LOGOUT = 'app/App/LOGOUT';
export const DISPLAY_ERROR = 'app/App/DISPLAY_ERROR';
export const CLEAR_ERROR = 'app/App/CLEAR_ERROR';
