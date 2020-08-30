/* eslint-disable class-methods-use-this */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    // if (this.transactionsRepository.all()) throw Error('Total is menor que 0');
    const { total } = this.transactionsRepository.getBalance();
    if (total - value < 0 && type === 'outcome')
      throw Error('Total is menor que 0');
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
