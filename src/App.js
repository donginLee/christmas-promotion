import InputView from './InputView.js';
import OutputView from './OutputView.js';

import Date from './Date.js';
import Menu from './Menu.js';
import Order from './Order.js';
import Bill from './Bill.js';
import { Console } from '@woowacourse/mission-utils';
import retryUntilNoError from './RetryUntilNoError.js';
class App {
  async run() {
    
    OutputView.showIntroduction();
    
    let date;
    await retryUntilNoError(async ()=>{
      const dateInput = await InputView.readDate();
      date = new Date(dateInput);
    });

    let bill;
    await retryUntilNoError(async ()=>{
      const orderInput = await InputView.readOrder();
      bill = new Bill(date.date, Menu, orderInput);
    });

    OutputView.showBenefitPreviewTitle();

    OutputView.showOrder('주문 메뉴',bill.order.ORDER);

    OutputView.showTotalOrderAmountBeforeDiscount('할인 전 총주문 금액',bill.totalOrderAmountBeforeDiscount);

    OutputView.showGiftMenu('증정 메뉴', bill);
    
    OutputView.showDiscountHistory('혜택 내역', bill.totalDiscount, bill.discountHistory);
    
    OutputView.showTotalDiscount('총혜택 금액', bill.totalBenefit);

    OutputView.showFinalPaymentAmount('할인 후 예상 결제 금액', bill.finalPaymentAmount);

    OutputView.showDecemberPromotionBadge('12월 이벤트 배지', bill.decemberPromotionBadge);

  }
}

export default App;
