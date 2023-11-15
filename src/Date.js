class Date {
  date;
  constructor(dateInput) {
    this.#validate(dateInput);
    this.date = parseInt(dateInput);
  }
  #isPositiveNumber(dateInput) {
    if(!dateInput) return false;
    for (let i = 0; i< dateInput.length; i+=1){
      if(dateInput[i] < '1' || dateInput[i] > '9') return false;
    }
    return true;
  }
  #validate(dateInput) {
    if(typeof dateInput !== 'string') throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    if(!this.#isPositiveNumber(dateInput)) throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    const dateNumber = parseInt(dateInput);
    if(dateNumber < 1 || dateNumber > 31) throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  };
}
export default Date;