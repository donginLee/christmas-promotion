import App from '../src/App.js';
import Bill from '../src/Bill.js';
import Date from '../src/Date.js';
import Menu from '../src/Menu.js';

describe('Bill 클래스 테스트', () => {
  test('올바르게 주문한 경우 - 혜택을 받지 못하는 경우', () => {
    const dateInput = '24';
    const orderInput = '타파스-1,제로콜라-1'
    const date = new Date(dateInput);
  
    const bill = new Bill(date.date, Menu, orderInput);

    expect(bill.totalOrderAmountBeforeDiscount).toBe(8500);
    expect(bill.totalBenefit).toEqual(0);
    expect(bill.totalDiscount).toEqual(0);
    expect(bill.decemberPromotionBadge).toEqual('없음');
    expect(bill.willProvideGift).toEqual(false);
    expect(bill.finalPaymentAmount).toEqual(8500);
  });
  test('올바르게 주문한 경우 - 혜택을 받는 경우', () => {
    const dateInput = '3';
    const orderInput = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1'
    const date = new Date(dateInput);
  
    const bill = new Bill(date.date, Menu, orderInput);

    expect(bill.totalOrderAmountBeforeDiscount).toBe(142000);
    expect(bill.totalBenefit).toEqual(31246);
    expect(bill.totalDiscount).toEqual(6246);
    expect(bill.decemberPromotionBadge).toEqual('산타');
    expect(bill.willProvideGift).toEqual(true);
    expect(bill.finalPaymentAmount).toEqual(135754);
  });
  test('올바르게 주문한 경우 - 만 원 이하로 주문한 경우', () => {
    const dateInput = '3';
    const orderInput = '양송이수프-1,제로콜라-1'
    const date = new Date(dateInput);
  
    const bill = new Bill(date.date, Menu, orderInput);

    expect(bill.totalOrderAmountBeforeDiscount).toBe(9000);
    expect(bill.totalBenefit).toEqual(0);
    expect(bill.totalDiscount).toEqual(0);
    expect(bill.decemberPromotionBadge).toEqual('없음');
    expect(bill.willProvideGift).toEqual(false);
    expect(bill.finalPaymentAmount).toEqual(9000);
  });
});

