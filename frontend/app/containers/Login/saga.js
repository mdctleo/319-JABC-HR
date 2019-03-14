import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { setUser } from 'containers/App/actions';
import { loginError } from './actions';
import request from 'utils/request';
import { setResource } from 'api/actions';

export function* login(action) {
  const body = {
    email: action.payload.email,
    password: action.payload.password,
  };

  const response = yield call(request, 'JABC/1.0.0/employee/token', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.type === 'ERROR') {
    return yield put(loginError(response.message));
  }
  const { employee } = response;
  yield put(
    setUser({
      token: response.token,
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      adminLevel: employee.adminLevel,
    }),
  );
  return yield put(setResource('employee', employee.id, employee));
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
