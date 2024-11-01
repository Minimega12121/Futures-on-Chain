import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import web3 from '../backend/contracts/web3';
import futures from '../backend/contracts/futures';

const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all transform translate-x-0 
    ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} 
    text-white max-w-sm z-50 flex items-center justify-between`}>
    <span>{message}</span>
    <button 
      onClick={onClose} 
      className="ml-4 text-white hover:text-gray-200"
    >
      ×
    </button>
  </div>
);

const History = () => {
  const [openPositions, setOpenPositions] = useState([]);
  const [closedPositions, setClosedPositions] = useState([]);
  const [previousPnL, setPreviousPnL] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [marketPrice, setMarketPrice] = useState("0.00");
  const [activeTab, setActiveTab] = useState('live');
  const [toast, setToast] = useState(null);
  const [toastType, setToastType] = useState('info');

  const formatInternationalNumber = (number) => {
    return Number(number).toLocaleString('en-US');
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'info') => {
    setToast(message);
    setToastType(type);
  };

  const fetchPositions = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        console.error("No accounts found. Please connect your wallet.");
        setIsLoading(false);
        return;
      }
      const userAddress = accounts[0];
      const marketPrice = await futures.methods.currentMarketPrice().call();
      const newMarketPrice = (Number(marketPrice) / 1_000_000).toFixed(2);
      setMarketPrice(newMarketPrice);

      // Fetch Open Positions
      const openPosCount = Number(await futures.methods.positionsCount(userAddress, 0).call());
      let openPosArray = [];
      for (let i = 0; i < openPosCount; i++) {
        const pos = await futures.methods.openPositions(userAddress, i).call();
        const pnl = await futures.methods.calculatePnL(userAddress, i).call();
        const pnlValue = (Number(pnl) / 1e18)*(Number(pos[1]) / 1_000_000) ;
        
        openPosArray.push({
          index: i,
          leverage: Number(pos[0]),
          entryPrice: (Number(pos[1]) / 1_000_000).toFixed(2),
          tokenUnits: Number(pos[2])/1e18,
          collateral: Number(pos[3]),
          timestamp: new Date(Number(pos[4]) * 1000).toLocaleString(),
          isBuy: pos[5],
          pnl: pnlValue,
          previousPnl: previousPnL[i] || 0,
        });
      }
      setOpenPositions(openPosArray);
      setPreviousPnL(openPosArray.reduce((acc, pos) => ({ ...acc, [pos.index]: pos.pnl }), {}));

      // Fetch Closed Positions
      const closedPosCount = Number(await futures.methods.positionsCount(userAddress, 1).call());
      let closedPosArray = [];
      for (let i = 0; i < closedPosCount; i++) {
        const pos = await futures.methods.settledPositions(userAddress, i).call();
        const pnl = await futures.methods.pnlHistory(userAddress, i).call();
        const pnlValue = (Number(pnl) / 1e18)*(Number(pos[1]) / 1_000_000);

        closedPosArray.push({
          leverage: Number(pos[0]),
          entryPrice: (Number(pos[1]) / 1_000_000).toFixed(2),
          tokenUnits: Number(pos[2])/1e18,
          collateral: Number(pos[3]),
          timestamp: new Date(Number(pos[4]) * 1000).toLocaleString(),
          isBuy: pos[5],
          pnl: pnlValue,
        });
      }
      setClosedPositions(closedPosArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching positions:", error);
      setIsLoading(false);
    }
  };

  const handleClosePosition = async (positionIndex) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await futures.methods.closePosition(positionIndex).send({
        from: accounts[0],
        gasPrice: web3.utils.toWei("150", "gwei"),
        gas: 300000
      });
      showToast("Position closed successfully!", "success");
      fetchPositions(); // Refresh the positions after closing
    } catch (error) {
      console.error("Error closing position:", error);
      showToast(`Error: ${error.message}`, "error");
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchPositions, 200);
    return () => clearInterval(interval);
  }, []);

  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-700/30 rounded-full p-6 mb-4">
        <X size={32} className="text-gray-400" />
      </div>
      <p className="text-gray-400 text-lg font-medium">{message}</p>
    </div>
  );

  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg
        ${activeTab === id 
          ? 'bg-gray-700 text-white shadow-lg' 
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
        }`}
    >
      {label}
      {count > 0 && (
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full
          ${activeTab === id 
            ? 'bg-gray-600 text-white' 
            : 'bg-gray-700 text-gray-300'
          }`}>
          {count}
        </span>
      )}
    </button>
  );

  const PositionTable = ({ positions, isLive = false }) => (
    <div className="mb-12 animate-fadeIn">
      <div className="overflow-x-auto rounded-xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : positions.length > 0 ? (
          <table className="min-w-full table-auto bg-gray-800/50 backdrop-blur-sm rounded-lg border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-400 uppercase text-sm">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Entry Price</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Leverage</th>
                <th className="px-4 py-3 font-medium">Total invested</th>
                <th className="px-4 py-3 font-medium">PnL</th>
                {isLive && <th className="px-4 py-3 font-medium">Action</th>}
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr
                  key={index}
                  className="text-white bg-gray-700/40 backdrop-blur-sm hover:bg-gray-700/60 
                    transition-all duration-200 rounded-lg"
                >
                  <td className="px-4 py-3">{position.timestamp}</td>
                  <td className={`px-4 py-3 font-medium ${position.isBuy ? 'text-green-400' : 'text-red-400'}`}>
                    {position.isBuy ? 'Buy' : 'Sell'}
                  </td>
                  <td className="px-4 py-3">${formatInternationalNumber(position.entryPrice)}</td>
                  <td className="px-4 py-3">{formatInternationalNumber(position.tokenUnits)}</td>
                  <td className="px-4 py-3">{formatInternationalNumber(position.leverage)}x</td>
                  <td className="px-4 py-3">${formatInternationalNumber((position.collateral * position.entryPrice).toFixed(2))}</td>
                  <td className={`px-4 py-3 font-medium ${
                    position.pnl >= position.previousPnl ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ${formatInternationalNumber(position.pnl.toFixed(2))}
                  </td>
                  {isLive && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleClosePosition(position.index)}
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors 
                          duration-200 hover:shadow-lg group"
                        title="Close Position"
                      >
                        <X size={16} className="text-white group-hover:scale-110 transition-transform" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState message={`No ${isLive ? 'Open' : 'Closed'} Positions found`} />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-10 bg-black text-white">

      <div className="flex space-x-4 mb-8">
        <TabButton id="live" label="Live Positions" count={openPositions.length} />
        <TabButton id="history" label="Closed Positions" count={closedPositions.length} />
      </div>
      {activeTab === 'live' ? (
        <PositionTable positions={openPositions} isLive={true} />
      ) : (
        <PositionTable positions={closedPositions} />
      )}
      {toast && (
        <Toast 
          message={toast} 
          type={toastType} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default History;