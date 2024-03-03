import axios from 'axios';

export const fetchBinancePrice = async (coinMask: string) => {
  try {
    const data = await axios.get('/api/binance/get-price', {
      params: { coin: coinMask },
    });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      console.log('Произошла ошибка при запросе к API');
    }
    return error;
  }
};
