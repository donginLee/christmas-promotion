import Date from '../src/Date.js';

describe('Date 클래스 테스트', () => {
  test('올바른 날짜를 입력한 경우', async () => {
    const date = new Date('17');

    expect(date.date).toEqual(17);
  });
});

describe('예외 테스트', () => {
  test('입력 값이 문자열이 아닌 경우', async () => {
      const dateInput = 17;
      expect(() => new Date(dateInput)).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });
  test('입력 값이 숫자로만 이루어지지 않은 경우', async () => {
      const dateInput = '17j';
      expect(() => new Date(dateInput)).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });
  test('음수 문자열인 경우', async () => {
      const dateInput = '-1';
      expect(() => new Date(dateInput)).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });
  test('0 문자열인 경우', async () => {
      const dateInput = '0';
      expect(() => new Date(dateInput)).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });
  test('31 초과 문자열인 경우', async () => {
      const dateInput = '32';
      expect(() => new Date(dateInput)).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });
});
