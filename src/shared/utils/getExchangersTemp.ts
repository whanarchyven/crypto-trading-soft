export interface exchangerInterface {
  name: 'binance' | 'okx' | 'bybit' | 'huobi' | 'mexc' | 'kucoin';
}

export const getExchangers = () => {
  const exchangers: Array<exchangerInterface['name']> = [
    'binance',
    'bybit',
    'okx',
    'huobi',
    'mexc',
    'kucoin',
  ];
  return exchangers;
};

export const getExchangerColor = (exchanger: exchangerInterface['name']) => {
  switch (exchanger) {
    case 'binance':
      return '#FF0000';
    case 'kucoin':
      return '#1240AB';
    case 'bybit':
      return '#FFD300';
    case 'okx':
      return '#00CC00';
    case 'huobi':
      return '#B40097';
    case 'mexc':
      return '#FF7400';
  }
};

export default getExchangers();
