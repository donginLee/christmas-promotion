class Order {
  ORDER={};
  MENU;
  constructor(menu,orderInput) {
    
    this.#validate(menu,orderInput);
  }
  #validate(menu,orderInput) {
    this.#menuValidate(menu);
    this.MENU = menu;
    this.#orderInputValidate(orderInput);
  }
  #menuValidate(menu) {
    if(!menu) throw new Error('[ERROR] 유효하지 않은 메뉴입니다. 관리자에게 문의하세요. 0');
    return menu;
  }
  #orderInputValidate(orderInput) {
    const order = this.#sliceOrderInput(orderInput);
    return order;
  }
  #eachValidate(menu,count) {
    if(!this.#isNumber(count)) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해주세요. 0');
    const countInNumber = parseInt(count);
    if(countInNumber < 0 || countInNumber > 20)throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해주세요.1');
    if(!((this.MENU)[menu])) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해주세요.2');
    return;
  }
  #totalValidate(itemCounts){
    if(itemCounts.length > 20) throw new Error('[ERROR] 주문은 최대 20개까지 가능합니다. 다시 입력해 주세요.3')
    let totalOrderCount = 0;
    itemCounts.forEach(itemCount => {
      const itemAndCount = itemCount.split('-');
      if(itemAndCount.length != 2) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.4');
      const [menu, count] = itemAndCount;
      this.#eachValidate(menu,count);
      if((this.ORDER)[menu]) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.5');
      const countInNumber = parseInt(count);
      (this.ORDER)[menu] =countInNumber;
      totalOrderCount += countInNumber;
      if(totalOrderCount > 20) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.6');
    });
  }
  #isNumber(str){
    if(!str) return false;
    for(let i = 0;i < str.length; i += 1){
      if(str[i] < '0' || str[i] > '9') return false;
    }
    return true;
  }
  #sliceOrderInput(orderInput){

    const itemCounts = orderInput.split(",");
    const totalOrderCount = 0;
    this.#totalValidate(itemCounts);

  }
};

export default Order;
