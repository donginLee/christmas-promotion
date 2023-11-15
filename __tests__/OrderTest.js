import Order from '../src/Order.js';
import Menu from '../src/Menu.js';

describe('Order 클래스 테스트', () => {
  test('올바르게 주문한 경우', async () => {
    const orderInput = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    const order = new Order(Menu, orderInput);

    expect(order.ORDER).toEqual({ '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1});
    expect(order.MENU).toEqual(Menu);
  });
});

describe('예외 테스트', () => {
  test('주문량이 20 초과인 경우', async () => {
      const orderInput = '타파스-5,레드와인-10,크리스마스파스타-6';
      expect(() => new Order(Menu, orderInput)).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    });
  test('중복된 메뉴를 주문한 경우', async () => {
    const orderInput = '타파스-1,타파스-2';
    expect(() => new Order(Menu, orderInput)).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });
  test('주문에 없는 메뉴를 주문한 경우', async () => {
    const orderInput = '알리오올리오-1,크리스마스파스타-1';
    expect(() => new Order(Menu, orderInput)).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });
  test('0개의 메뉴를 주문한 경우', async () => {
    const orderInput = '크리스마스파스타-0';
    expect(() => new Order(Menu, orderInput)).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });
  test('수량을 적지 않은 경우 1', async () => {
    const orderInput = '레드와인,크리스마스파스타-2';
    expect(() => new Order(Menu, orderInput)).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });
  test('수량을 적지 않은 경우 2', async () => {
    const orderInput = '레드와인-,크리스마스파스타-3';
    expect(() => new Order(Menu, orderInput)).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });
  test('음료만 주문한 경우', async () => {
    const orderInput = '레드와인-2,제로콜라-1,샴페인-1';
    expect(() => new Order(Menu, orderInput)).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  });
});
