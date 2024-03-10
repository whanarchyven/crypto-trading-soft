import TradingSettings from '@/widgets/trading-settings';
import OperationsHistory from '@/widgets/operations-history';
import ActivesGraph from '@/widgets/actives-graph/actives-graph';
import BudgetSummary from '@/widgets/budget-summary';
import BinancePriceTable from '@/widgets/price-table/binance-price-table';

export default function Home() {
  return (
    <>
      <main className={'p-4'}>
        <h1>Панель управления автоматическими торгами</h1>
        <TradingSettings />
        <div className={'grid grid-cols-2 w-full gap-2'}>
          <OperationsHistory />
          <div className={'flex flex-col gap-2'}>
            <ActivesGraph />
            <BudgetSummary />
          </div>
        </div>
        <div className={'w-full flex'}>
          <BinancePriceTable />
        </div>
      </main>
    </>
  );
}
