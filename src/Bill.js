import Order from "./Order.js";
class Bill {
  date;

  order;

  totalAmaountBeforeDiscount;
  
  Gift={
    '샴페인':1
  };
  willProvideGift;

  XmasDdayDiscount;
  WeekdayOrWeekendDiscount;
  SpecialDiscount;
  GiftMenuDiscount;

  TotalDiscount;

  FinalPaymentAmount;

  DecemberPromotionBadge;

  constructor(date, menu, orderInput) {
    this.date = date;
    this.#validate(menu, orderInput);
    this.#makeBill(this.order);
  }

  #validate(menu, orderInput) {
    this.order = new Order(menu, orderInput);
  }

  #makeBill(order) {
    this.totalAmountBeforeDiscount = this.#calculateTotalOrderAmountBeforeDiscount(order);
    this.#calculateTotalDiscount();
    this.FinalPaymentAmount = this.totalAmaountBeforeDiscount - this.TotalDiscount;
    this.#chooseDecemberPromotionBadge();
  }
  #chooseDecemberPromotionBadge(){
    if(this.TotalDiscount >= 20000) this.DecemberPromotionBadge = '산타';
    if(this.TotalDiscount >= 10000) this.DecemberPromotionBadge = '트리';
    if(this.TotalDiscount >= 5000) this.DecemberPromotionBadge = '별';
    this.DecemberPromotionBadge = '없음';
  }
  #calculateTotalOrderAmountBeforeDiscount(order) {
    let resultAmount = 0;
    Object.keys(order.ORDER).forEach( menu => {
      if (order.MENU[menu]) {
        resultAmount += order.MENU[menu].가격 * order.ORDER[menu];
      }
    });
    return resultAmount;
  }

  #calculateXmasDday() {
    if(this.date > 25) return 0;
    if(this.date <= 25) return 1000 + 100 * (this.date - 1);
  }
  
  #dateToDay(a){
    let remainder = a % 7;
    if(a === 0) remainder = 7;
    if(remainder === 1) return '금';
    if(remainder === 2) return '토';
    if(remainder === 3) return '일';
    if(remainder === 4) return '월';
    if(remainder === 5) return '화';
    if(remainder === 6) return '수';
    if(remainder === 7) return '목';
  }
  #checkWhetherWeekendOrNot(date) {
    const day = this.#dateToDay(date);
    if(day === '금'||day === '토') return true;
    return false;
  }

  #categoryDiscount(category,eachDiscount) {
    let totalCategoryDiscount = 0;
    const orderInfo = this.order.ORDER;
    Object.keys(orderInfo).forEach( menu => {
      const menuInfo = this.order.MENU[menu];
      if(menuInfo['종류'] === category){
        totalCategoryDiscount += (menuInfo['가격'] * orderInfo[menu]);
      }
    });
    return totalCategoryDiscount;
  }

  #calculateWeekdayOrWeekendDiscount() {
    const isWeekend = this.#checkWhetherWeekendOrNot(this.date);
    if(isWeekend) {
      return this.#categoryDiscount('메인',2023);
    }
    return this.#categoryDiscount('디저트',2023);
  }

  #checkwhetherSpecialDayOrNot(a) {
    if(this.#dateToDay(a) === '일' || a === 25) return true;
  }

  #calculateSpecialDiscount() {
    const isSpecialDay = this.#checkwhetherSpecialDayOrNot();
    if(isSpecialDay) return 1000;
    return 0;
  }

  #calculateGiftMenuPrice() {
    let totalPrice = 0;
    Object.keys(this.Gift).forEach( menu => {
      totalPrice += (this.Gift[menu] * this.Order.MENU[menu]['가격']);
    });
    return totalPrice;
  }
  #calculateGiftMenuDiscount() {
    this.willProvideGift = this.totalAmaountBeforeDiscount >= 120000;
    if(this.willProvideGift) {
      this.#calculateGiftMenuPrice();
    }
    return 0;
  }

  #sumArray(arr) {
    return arr.reduce((acc, current) => acc + current, 0);
  }
  #calculateTotalDiscount() {
    this.XmasDdayDiscount = this.#calculateXmasDday();
    this.WeekdayOrWeekendDiscount = this.#calculateWeekdayOrWeekendDiscount();
    this.SpecialDiscount = this.#calculateSpecialDiscount();
    this.GiftMenuDiscount = this.#calculateGiftMenuDiscount();

    this.TotalDiscount = this.#sumArray([this.XmasDdayDiscount,this.WeekdayOrWeekendDiscount,this.SpecialDiscount,this.GiftMenuDiscount]);
  }
}

export default Bill;
