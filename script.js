const log = (...log) => console.log(...log)

const transactionsUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputFormName = document.querySelector('#text')
const inputFormAmount = document.querySelector('#amount')


const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))
let transactions  = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

const removeTransaction = ID => {
    const newTransactions = transactions.filter(transactions => transactions.id !== ID)
    transactions = newTransactions
    init()
    updateLocalStorage()
}

const addTransactionToDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const name = transaction.name;
    const ID = transaction.id
    
    const li = document.createElement('li')
    const classCSS = transaction.amount > 0 ? 'plus' : 'minus'
   
    
    li.classList.add(classCSS)
   
    li.innerHTML = `
    ${name} <span> ${operator} R$ ${amountWithoutOperator}
    </span><button onclick='removeTransaction(${ID})' 
    class="delete-btn">x</button>`
    
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
}

const init = () => {
    transactionsUL.textContent = ''
    transactions.forEach(addTransactionToDom)
    updateBalance(transactions);
}

init(); 

const getRandomID = () => Math.round(Math.random() * 1000)

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const handleFormSubmit = event => {
    event.preventDefault()
    const transactionName = inputFormName.value.trim()
    const transactionAmount = inputFormAmount.value.trim()
    if(transactionName === '' || transactionAmount === '') {
        alert('Preencha tanto nome quanto valor para transação')
        return
    }

    const transaction = {
        id: getRandomID(),
        name: transactionName,
        amount: Number(transactionAmount)
    }

   

    transactions.push(transaction)

    inputFormName.value = ''
    inputFormAmount.value = ''
    init();
    updateLocalStorage()
  
}

form.addEventListener('submit', handleFormSubmit)
