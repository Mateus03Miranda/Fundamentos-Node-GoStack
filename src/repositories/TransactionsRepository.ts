/* eslint-disable class-methods-use-this */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const somar = (valoratual: number, proximovalor: number): number =>
      valoratual + proximovalor;
    const income = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });
    income.push(0);
    const outcome = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });
    outcome.push(0);
    const balance = {
      income: income.reduce(somar),
      outcome: outcome.reduce(somar),
      total: income.reduce(somar) - outcome.reduce(somar),
    };
    return balance;
  }

  // eslint-disable-next-line class-methods-use-this
  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
