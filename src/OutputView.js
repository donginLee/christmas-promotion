import { Console } from "@woowacourse/mission-utils";
import wrapTitle from "./wrapTitle.js";
import formatCurrency from './FormatCurrency.js';
const OutputView = {
  showIntroduction() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
    // ...
  },
  showBenefitPreviewTitle() {
    Console.print('12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n');
  },
  showOrder(title,order) {
    Console.print(wrapTitle(title));
    Object.keys(order).forEach( menu => {
      const count = order[menu];
      Console.print(`${menu} ${count}개`);
    });
  },
  showTotalOrderAmountBeforeDiscount(title, number) {
    Console.print(`\n${wrapTitle(title)}`);
    Console.print(formatCurrency(number));

  },
  showGiftMenu(title, bill){
    Console.print(`\n${wrapTitle(title)}`);
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
    Console.print(`\n${wrapTitle(title)}`);
    if(totalDiscount === 0) {Console.print('없음\n');return;}
    Object.keys(discountHistory).forEach( title => {
      Console.print(`${title}: -${formatCurrency(discountHistory[title])}`);
    });
  },
  showTotalDiscount(title,totalDiscount) {
    Console.print(`\n${wrapTitle(title)}`);
    if(totalDiscount === 0){
      Console.print(`${formatCurrency(totalDiscount)}\n`);
      return;
    }
    Console.print(`-${formatCurrency(totalDiscount)}\n`);
  },
  showFinalPaymentAmount(title,finalPaymentAmount) {
    Console.print(wrapTitle(title));
    Console.print(`${formatCurrency(finalPaymentAmount)}\n`);
  },
  showDecemberPromotionBadge(title, decemberPromotionBadge) {
    Console.print(wrapTitle(title));
    Console.print(decemberPromotionBadge);
  }
  // ...
};
export default OutputView;
