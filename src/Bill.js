import Order from "./Order.js";
class Bill {
  date;

  order;

  totalOrderAmountBeforeDiscount;
  
  Gift={
    '샴페인':1
  };
  willProvideGift;

  discountHistory = {
    '크리스마스 디데이 할인': 0,
    '평일 할인': 0,
    '주말 할인': 0,
    '특별 할인': 0,
    '증정 이벤트': 0
  };

  totalDiscount;
  totalBenefit;

  finalPaymentAmount;

  decemberPromotionBadge;

  test = {
    chooseDecemberPromotionBadge : function(amount) {
      return this.#chooseDecemberPromotionBadge(amount);
     },
    calculateTotalOrderAmountBeforeDiscount : function(order) {
      return this.#calculateTotalOrderAmountBeforeDiscount(order);
     },
    calculateXmasDdayDiscount : function(amount, date) {
      return this.#calculateXmasDdayDiscount(date);
     },
    dateToDay : function(a) {
      return this.#dateToDay(a);
     },
    checkWhetherWeekendOrNot : function(date) {
      return this.#checkWhetherWeekendOrNot(date);
     },
    categoryDiscount : function(amount, category, eachDiscount) {
      return this.#categoryDiscount(category, eachDiscount);
     },
    calculateWeekdayOrWeekendDiscount : function(date) {
      return this.#calculateWeekdayOrWeekendDiscount(date);
     },
    checkwhetherSpecialDayOrNot: function(a) {
      return this.#checkwhetherSpecialDayOrNot(a);
     },
    calculateSpecialDiscount : function(amount, date) {
      return this.#calculateSpecialDiscount(date);
     },
    calculateGiftMenuPrice: function(gift) {
      return this.#calculateGiftMenuPrice(gift);
     },
    calculateGiftMenuDiscount: function(amount) {
      return this.#calculateGiftMenuDiscount(amount);
    }
  };

  constructor(date, menu, orderInput) {
    this.date = date;
    this.#validate(menu, orderInput);
    this.#makeBill(this.order);
  }

  #validate(menu, orderInput) {
    this.order = new Order(menu, orderInput);
  }

  #makeBill(order) {
    this.totalOrderAmountBeforeDiscount = this.#calculateTotalOrderAmountBeforeDiscount(order);
    this.#calculateTotalDiscount();
    this.finalPaymentAmount = this.totalOrderAmountBeforeDiscount - this.totalDiscount;
    this.#chooseDecemberPromotionBadge(this.totalBenefit);
  }
  #chooseDecemberPromotionBadge(totalBenefit){
    if(totalBenefit >= 20000) {this.decemberPromotionBadge = '산타'; return;}
    if(totalBenefit >= 10000) {this.decemberPromotionBadge = '트리'; return;}
    if(totalBenefit >= 5000) {this.decemberPromotionBadge = '별'; return;}
    this.decemberPromotionBadge = '없음';
  }
  #calculateTotalOrderAmountBeforeDiscount(order) {
    let resultAmount = 0;
    Object.keys(order.ORDER).forEach( menu => {
      if ((order.MENU)[menu]) {
        resultAmount += (order.MENU)[menu]['가격'] * (order.ORDER)[menu];
      }
    });
    return resultAmount;
  }

  #calculateXmasDdayDiscount(amount, date) {
    if(amount < 10000) return 0;
    if(date > 25) return 0;
    if(date <= 25) return 1000 + 100 * (date - 1);
  }
  
  #dateToDay(a){
    let remainder = a % 7;
    if(remainder === 0) return '목';
    if(remainder === 1) return '금';
    if(remainder === 2) return '토';
    if(remainder === 3) return '일';
    if(remainder === 4) return '월';
    if(remainder === 5) return '화';
    if(remainder === 6) return '수';
   
  }
  #checkWhetherWeekendOrNot(date) {
    const day = this.#dateToDay(date);
    if(day === '금'||day === '토') return true;
    return false;
  }

  #categoryDiscount(category, eachDiscount) {
    
    let totalCategoryDiscount = 0;
    const orderInfo = this.order.ORDER;
    Object.keys(orderInfo).forEach( menu => {
      const menuInfo = this.order.MENU[menu];
      if(menuInfo['종류'] === category){
        totalCategoryDiscount += (eachDiscount * orderInfo[menu]);
      }
    });
    return totalCategoryDiscount;
  }

  #calculateWeekdayOrWeekendDiscount(amount, date) {
    if(amount < 10000) return [0,0];
    const isWeekend = this.#checkWhetherWeekendOrNot(date);
    if(isWeekend) {
      return [this.#categoryDiscount('메인',2023), 0];
    }
    return [0, this.#categoryDiscount('디저트',2023)];
  }

  #checkwhetherSpecialDayOrNot(a) {

    if(this.#dateToDay(a) === '일' || a === 25) return true;
  } 

  #calculateSpecialDiscount(amount, date) {
    if(amount < 10000) return 0;
    const isSpecialDay = this.#checkwhetherSpecialDayOrNot(date);
    if(isSpecialDay) return 1000;
    return 0;
  }

  #calculateGiftMenuPrice(gift) {
    let totalPrice = 0;
    Object.keys(gift).forEach( menu => {
      totalPrice += (gift[menu] * this.order.MENU[menu]['가격']);
    });
    return totalPrice;
  }
  #calculateGiftMenuDiscount(amount) {
    if(amount >= 120000)this.willProvideGift = true;
    if(amount < 120000)this.willProvideGift = false;
    if(this.willProvideGift) {
      return this.#calculateGiftMenuPrice(this.Gift);
    }
    return 0;
  }

  #sumArray(arr) {
    return arr.reduce((acc, current) => acc + current, 0);
  }
  #calculateTotalDiscount() {
    this.discountHistory['크리스마스 디데이 할인'] = this.#calculateXmasDdayDiscount(this.totalOrderAmountBeforeDiscount,this.date);
    [this.discountHistory['주말 할인'], this.discountHistory['평일 할인']] = this.#calculateWeekdayOrWeekendDiscount(this.totalOrderAmountBeforeDiscount, this.date);
    this.discountHistory['특별 할인'] = this.#calculateSpecialDiscount(this.totalOrderAmountBeforeDiscount, this.date);
    this.discountHistory['증정 이벤트'] = this.#calculateGiftMenuDiscount(this.totalOrderAmountBeforeDiscount);

    this.totalBenefit = Object.keys(this.discountHistory).reduce((acc, key) => acc + this.discountHistory[key], 0);
    this.totalDiscount = this.totalBenefit - this.discountHistory['증정 이벤트'];
  }
}

export default Bill;
