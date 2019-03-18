import { takeLatest, put, all } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { setUser } from 'containers/App/actions';
import { loginError } from './actions';
import { setResource } from 'api/actions';
import { ApiClient, EmployeeApi, ILogin } from 'api/swagger-api';
const defaultClient = ApiClient.instance;
const { AuthToken } = defaultClient.authentications;
const employeeApi = new EmployeeApi();

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

export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
