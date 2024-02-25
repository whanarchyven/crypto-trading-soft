import React, { FC } from 'react';
import { getExchangers } from '@/shared/utils/getExchangersTemp';
import { getRandomValue } from '@/shared/utils/getRandomValue';
import { cva } from 'class-variance-authority';

const cvaTableRoot = cva([
  'border-collapse w-full border table-fixed border-slate-500',
]);
const cvaTableSection = cva(['border p-1 border-cPurple']);
const BudgetSummary: FC = () => {
  const budget = getExchangers().map((exchanger) => {
    return {
      name: exchanger,
      budget: getRandomValue(35, 999),
      profit: getRandomValue(0.01, 0.99),
    };
  });

  return (
    <div>
      <table className={cvaTableRoot()}>
        <thead>
          <tr>
            <th className={cvaTableSection()}>Биржа</th>
            <th className={cvaTableSection()}>Бюджет (USDT)</th>
            <th className={cvaTableSection()}>% изменения</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((exchanger, counter) => (
            <tr key={counter}>
              <td className={cvaTableSection()}>{exchanger.name}</td>
              <td className={cvaTableSection()}>
                ${exchanger.budget.toFixed(2)}
              </td>
              <td className={cvaTableSection()}>
                {(exchanger.profit * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetSummary;
