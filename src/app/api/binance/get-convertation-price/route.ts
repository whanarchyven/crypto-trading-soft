import axios from 'axios';
import { apiKey, secretKey } from '@/app/api/env';
import { subDays } from 'date-fns';
import * as querystring from 'querystring';
import * as crypto from 'crypto';

// Определяем тип для данных ответа от API
export async function GET() {
  try {
    const time = await axios.get('https://api.binance.com/api/v3/time');

    const data = {
      recvWindow: 20000,
      timestamp: time.data.serverTime,
      startTime: subDays(new Date(time.data.serverTime), 1).getTime(),
      endTime: time.data.serverTime,
    };

    const dataQueryString = querystring.stringify(data);
    const buildSign = () => {
      return crypto
        .createHmac('sha256', secretKey)
        .update(dataQueryString)
        .digest('hex');
    };

    const result = await axios.get(
      'https://api.binance.com/sapi/v1/convert/tradeFlow',
      {
        headers: {
          'X-MBX-APIKEY': apiKey,
        },
        params: {
          signature: buildSign(),
          recvWindow: 20000,
          timestamp: time.data.serverTime,
          startTime: subDays(new Date(time.data.serverTime), 1).getTime(),
          endTime: time.data.serverTime,
        },
      }
    );

    return new Response(JSON.stringify(result.data), {
      status: 200,
    });
  } catch (error) {
    // Предполагаем, что ошибка имеет тип any, поскольку AxiosError может иметь различные формы
    if (axios.isAxiosError(error)) {
      // Обрабатываем ошибку Axios специфическим образом, если нужно
      console.log(error);
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    } else {
      // Общий случай для других типов ошибок
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }
  }
}
