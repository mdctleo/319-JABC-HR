import { takeLatest, put } from 'redux-saga/effects';
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

    yield put(setResource('employee', employee.id, employee));
    yield put(
      setUser({
        id: employee.id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        adminLevel: employee.adminLevel,
      }),
    );
  } catch (e) {
    yield put(loginError(e.response.body.message));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
