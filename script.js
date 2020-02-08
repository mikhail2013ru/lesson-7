'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function() {
  do {
    money = +prompt('“Ваш месячный доход?”');
  
    } while (!isNumber(parseFloat(money)));
};

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  addExpenses: [],
  income: {},
  addIncome: [],
  expenses: {},
  deposit: false,
  mission: 100000,
  period: 8,

  asking: function(){ 
    let addExpenses = prompt('“Перечислите возможные расходы за рассчитываемый период через запятую”'),
        deposit = confirm('“Есть ли у вас депозит в банке?”');

    for (let i = 0; i < 2; i++) {
      let expenses = prompt('“Введите обязательную статью расходов?”'),
          amount;

          do {
            amount = +prompt('“Во сколько это обойдется?”');
          } while (!isNumber(amount));

          appData.expenses[expenses] = amount;
          //console.log('Во сколько это обойдется? ' + (appData.amount));
           
      }
  },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function(){
    return (Math.ceil(appData.mission / appData.budgetMonth));
  },

  getStatusIncome: function(){
    if (appData.budgetDay >= 1200) {
      console.log('“У вас высокий уровень дохода”');
    } else if (appData.budgetDay >= 600) {
      console.log('“У вас средний уровень дохода”');
    } else if (appData.budgetDay < 600) {
      console.log('“К сожалению у вас уровень дохода ниже среднего”');
    } else if (appData.budgetDay < 0) {
      console.log('“Что то пошло не так”');
    }
  }  
};

appData.asking();

// appData.getAccumulatedMonth();
appData.getExpensesMonth();

appData.getBudget();

appData.getTargetMonth();

console.log(appData.budgetMonth);
console.log(appData.budget);
console.log(appData.budgetDay);


console.log(`Расходы за месяц: ${appData.expensesMonth} `);
console.log(`За какой период будет достигнута цель (в месяцах): ${appData.mission / appData.budgetMonth}`);

appData.getStatusIncome();

for (let key in appData) {
  //appData.expensesMonth += appData.expenses[key];
  console.log(`"Наша программа включает в себя данные: " ${appData[key]}`);
}