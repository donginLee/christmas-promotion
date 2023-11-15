const formatCurrency = function formatCurrencyToWon(number) {
  if(typeof number !== 'number') throw new Error('[ERROR] 잘못된 형태의 숫자입니다. 관리자에게 문의해 주세요.');
  const numberCurrency = number.toLocaleString();
  return `${numberCurrency}원`;
}
export default formatCurrency;