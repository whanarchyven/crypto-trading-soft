'use client';
import { FC, useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getLast24Hours } from '@/widgets/actives-graph/utils/getLast24Hours';
import {
  getExchangerColor,
  getExchangers,
} from '@/shared/utils/getExchangersTemp';
import { getRandomValue } from '@/shared/utils/getRandomValue';
import { cva } from 'class-variance-authority';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const cvaGraphRoot = cva(['border-2 border-cPurple p-1']);
const ActivesGraph: FC = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Активы за последние 24 часа',
        color: '#6C34F7',
        font: {
          size: 24,
        },
      },
    },
  };

  const labels = getLast24Hours();
  const exchangers = getExchangers();

  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels,
    datasets: exchangers.map((exchanger) => {
      return {
        label: exchanger,
        data: labels.map(() => getRandomValue(0, 10)),
        borderColor: getExchangerColor(exchanger),
        backgroundColor: getExchangerColor(exchanger),
      };
    }),
  });

  const getTotal = () => {
    const total: Array<number> = [];
    labels.map((label, counter) => {
      let labelSumm = 0;
      chartData.datasets.map((exchanger) => {
        if (exchanger.label != 'total') labelSumm += exchanger.data[counter];
      });
      total.push(labelSumm);
    });
    return total;
  };

  useEffect(() => {
    const temp = { ...chartData };
    const newDatasets = [
      ...chartData.datasets,
      {
        label: 'total',
        data: getTotal(),
        backgroundColor: '#6C34F7',
        borderColor: '#6C34F7',
      },
    ];
    temp.datasets = newDatasets;
    setChartData(temp);
  }, []);

  return (
    <div className={cvaGraphRoot()}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ActivesGraph;
