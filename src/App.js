import InputView from './InputView.js';
import OutputView from './OutputView.js';

import Date from './Date.js';

import { Console } from '@woowacourse/mission-utils';
import retryUntilNoError from './RetryUntilNoError.js';
class App {
  async run() {
    OutputView.introduction();
    retryUntilNoError(async ()=>{
      const dateInput = await InputView.readDate();
      const date = new Date(dateInput);
    });
  }
}

export default App;
