const log = (...log) => console.log(...log)

const transactionsUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

log(incomeDisplay, expenseDisplay, balanceDisplay)

const dummyTransctions = [
    {id: 1, name: 'Bolo', amount: -20},
    {id: 2, name: 'Salário', amount: 300},
    {id: 3, name: 'Violão', amount: 150},
    {id: 4, name: 'Cerveja', amount: -30},
]

const addTransactionToDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const name = transaction.name;
    
    const li = document.createElement('li')
    const classCSS = transaction.amount > 0 ? 'plus' : 'minus'
   
    
    li.classList.add(classCSS)
   
    li.innerHTML = `
    ${name} <span> ${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>`
    
    transactionsUL.append(li)
}


const updateBalance = (transactions) => {

    const transactionsAmount = transactions.map((transaction) => transaction.amount)
    const total = transactionsAmount.reduce((acc, transaction) => acc + transaction, 0)

    const expenses = Math.abs(transactionsAmount
        .filter((value) => value < 0)
        .reduce((acc, value) => acc + value, 0))
        .toFixed(2)

    const income = transactionsAmount
        .filter((value) => value > 0)
        .reduce((acc, value) => acc + value, 0)
        .toFixed(2)

    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expenses}`
    balanceDisplay.textContent = `R$ ${total}`
    
    log('transaction', transactionsAmount)
    log('total', total)
    log('income', income)
    log('expenses', expenses)
}



const init = () => {
    dummyTransctions.forEach(addTransactionToDom)
    updateBalance(dummyTransctions);
}

init(); 




// to do:
// income em updateblaance ->  expenses em updateblaance -> refactor functions to modules