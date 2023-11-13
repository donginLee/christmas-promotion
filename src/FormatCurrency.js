const formatCurrency = function formatCurrencyToWon(number) {
  return number.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
}
return formatCurrency;