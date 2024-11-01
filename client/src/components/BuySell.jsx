import React, { useState } from "react";
import web3 from "../backend/contracts/web3";
import futures from "../backend/contracts/futures";
import token from "../backend/contracts/token";

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

const BuySell = () => {
  const [leverage, setLeverage] = useState(1);
  const [tokenAmount, setTokenAmount] = useState(null);
  const [selectedAction, setSelectedAction] = useState("Buy");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastType, setToastType] = useState('info');

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

  const handleTokenAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setTokenAmount(value);
    }
  };

  const handleExecute = async () => {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
      showToast("Please enter a valid token amount", "error");
      return;
    }

    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        showToast("No accounts found. Please connect your wallet.", "error");
        return;
      }

      showToast("Please approve the token transfer in your wallet", "info");

      await token.methods
      .approve(
        futures.options.address,
        web3.utils.toWei(tokenAmount, "ether") * 1.05
      )
      .send({ from: accounts[0],
        gasPrice: web3.utils.toWei("200","gwei"),  // do 150 gwei for fast testing
        gas : 300000});
    
        showToast("Please confirm the transaction in your wallet", "info");

  await futures.methods
    .openPosition(leverage, web3.utils.toWei(tokenAmount, "ether"), selectedAction=="Buy")
    .send({
      from: accounts[0],
      gasPrice: web3.utils.toWei("200","gwei"),  // do 150 gwei for fast testing
      gas : 1000000 // do 150 gwei for fast testing
  });

      showToast(`${selectedAction} position opened successfully!`, "success");
      setTokenAmount("");
    } catch (error) {
      console.error("Error executing trade:", error);
      showToast(`Error: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex flex-col text-white rounded-lg shadow-2xl space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Buy/Sell Futures</h2>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedAction("Buy")}
          className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${
            selectedAction === "Buy"
              ? "border-green-500 text-white bg-green-500/20"
              : "border-green-300 text-green-300"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSelectedAction("Sell")}
          className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${
            selectedAction === "Sell"
              ? "border-red-500 text-white bg-red-500/20"
              : "border-red-300 text-red-300"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" htmlFor="leverage">
          Leverage: <span className="font-bold">{leverage}x</span>
        </label>
        <input
          type="range"
          id="leverage"
          value={leverage}
          onChange={(e) => setLeverage(parseInt(e.target.value))}
          min="1"
          max="100"
          className="w-full h-2 bg-blue-500 rounded-lg cursor-pointer transition-all accent-blue-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" htmlFor="tokenAmount">
          Token Amount:
        </label>
        <input
          type="number"
          id="tokenAmount"
          value={tokenAmount}
          onChange={handleTokenAmountChange}
          placeholder="Enter token amount"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={handleExecute}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : `Execute ${selectedAction}`}
      </button>

      <style jsx>{`
        /* Custom style to remove arrows on number input */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield; /* Firefox */
        }
      `}</style>
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

export default BuySell;