import { Console } from "@woowacourse/mission-utils";
import wrapTitle from "./wrapTitle.js";
import formatCurrency from './FormatCurrency.js';
const OutputView = {
  showIntroduction() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
    // ...
  },
  showBenefitPreviewTitle() {
    Console.print('12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!');
  },
  showOrder(title,order) {
    Console.print(wrapTitle(title));
    Object.keys(order).forEach( menu => {
      const count = order[menu];
      Console.print(`${menu} ${count}개`);
    });
    Console.print('\n');
  },
  showTotalOrderAmountBeforeDiscount(title, number) {
    Console.print(wrapTitle(title));
    Console.print(formatCurrency(number));
    Console.print('\n');
  },
  showGiftMenu(title, bill){
    Console.print(wrapTitle(title));
    if(bill.willProvideGift) {
      Object.keys(bill.Gift).forEach( menu => {
        const count = bill.Gift[menu];
        Console.print(`${menu} ${count}개`);
      });
      return;
    }
    Console.print('없음');
  },
  showDiscountHistory(title, totalDiscount, discountHistory) {
    Console.print(wrapTitle(title));
    if(totalDiscount === 0) {Console.print('없음'); return;}
    Object.keys(discountHistory).forEach( title => {
      Console.print(`${title}: -${formatCurrency(discountHistory[title])}`);
    });
  },
  showTotalDiscount(title,totalDiscount) {
    Console.print(wrapTitle(title));
    Console.print(`-${formatCurrency(totalDiscount)}`);
    Console.print('\n');
  },
  showFinalPaymentAmount(title,finalPaymentAmount) {
    Console.print(wrapTitle(title));
    Console.print(`${formatCurrency(finalPaymentAmount)}`);
    Console.print('\n');
  },
  showDecemberPromotionBadge(title, decemberPromotionBadge) {
    Console.print(wrapTitle(title));
    Console.print(decemberPromotionBadge);
    Console.print('\n');
  }
  // ...
};
export default OutputView;
