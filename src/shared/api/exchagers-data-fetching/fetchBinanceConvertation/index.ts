import axios from 'axios';

export const fetchBinanceConvertation = async () => {
  try {
    const data = await axios.get('/api/binance/get-convertation-price');
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
