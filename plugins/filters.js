import Vue from 'vue';

function price(price) {
  var moneyNum = Number(price);

  return moneyNum.toFixed(2);
}

Vue.filter(`price`, price);


export default {
  price
};
