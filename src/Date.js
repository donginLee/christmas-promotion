class Date {
  date;
  constructor(dateInput) {
    this.#validate(dateInput);
    this.date = dateInput;
  }
  #isPositiveNumber(dateInput) {
    if(!dateInput) return false;
    for (let i = 0; i< dateInput.length; i+=1){
      if(dateInput[i] < '1' || dateInput[i] > '9') return false;
    }
    return true;
  }
  #validate(dateInput) {
    if(!this.#isPositiveNumber(dateInput)) {throw new Error('[ERROR] 유효한 날짜가 아닙니다.');}
    const dateNumber = parseInt(dateInput);
    if(dateNumber < 1 || dateNumber > 31) {throw new Error('[ERROR] 유효한 날짜가 아닙니다.');}
  };
}
export default Date;