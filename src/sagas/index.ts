import { all, takeEvery, call } from 'redux-saga/effects';
import { CheckPlagRoutine } from './routines';
import axios from 'axios';

const apiClient = axios.create();

const BASE_URI = 'http://127.0.0.1:5000';

const client = axios.create({
    baseURL: BASE_URI,
    headers: {
        'Content-Type': 'application/json'
      }
});

function* checkTextForPlag(action: any) {
    try {
        const result = yield call(client.post, '/check', action.payload, {headers: {
            'Content-Type': 'application/json'
          }});
         console.log("res");
         console.log(result);
     } catch (error) {
         console.log("e");
         console.log(error);
     }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(CheckPlagRoutine.trigger, checkTextForPlag)
    ])
};