import { TransactionType } from "features/transactions/model/TransactionType";


const TopPerformerData: TransactionType[] = [
  {
    id: '2',
    type: 'Saída',
    time: '13:53',
    paymentMethod: 'Boleto',
    value: '1.500,00',
  },
  {
    id: '3',
    type: 'Saída',
    time: '10:25',
    paymentMethod: 'Cartão de Crédito',
    value: '2.000',
  },
  {
    id: '4',
    type: 'Saída',
    time: '7:32',
    paymentMethod: 'PIX',
    value: '150.00',
  },
];

export default TopPerformerData;
