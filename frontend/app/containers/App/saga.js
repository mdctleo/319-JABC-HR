import { takeLatest, call, put, all } from 'redux-saga/effects';
import { GET_USER, LOGOUT } from './constants';
import { getEmployee } from 'api/saga';
import { logout as logoutAction, setUser } from './actions';
import { push } from 'react-router-redux';
import { loginError } from '../Login/actions';
import { ApiClient, EmployeeApi, ILogin } from 'api/swagger-api';
import { setResource } from 'api/actions';
import { LOGIN } from '../Login/constants';
const defaultClient = ApiClient.instance;
const { AuthToken } = defaultClient.authentications;
const employeeApi = new EmployeeApi();

export function* getUser(action) {
  try {
    yield call(getEmployee, action.id);
  } catch (e) {
    yield put(logoutAction());
  }
}

export function* login(action) {
  try {
    const response = yield employeeApi.login(
      new ILogin(action.payload.email, action.payload.password),
    );

    const { employee } = response;
    AuthToken.apiKey = response.token;

    sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: employee.id,
        token: response.token,
      }),
    );

    yield all([
      put(
        setUser({
          id: employee.id,
        }),
      ),
      put(setResource('employee', employee.id, employee)),
    ]);
  } catch (e) {
    yield put(loginError(e.response.body.message));
  }
}

export function* logout() {
  sessionStorage.removeItem('user');
  yield put(push('/'));
}

export default function* profileSaga() {
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(LOGIN, login);
}
