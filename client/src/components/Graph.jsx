// import React, { useEffect, useState, useContext } from "react";
// import ReactApexChart from "react-apexcharts";
// import futures from "../backend/contracts/futures";

// const Graph = () => {
//   const [timeframe, setTimeframe] = useState("1");
//   const [dataArray, setDataArray] = useState([]);

//   const fetchData = async () => {
//     if (futures) {
//       try {
//         const data = await futures.methods.getOHLCVHistory().call(); // Assuming this returns an array of objects
//         const formattedData = data.map((item) => ({
//           blockNumber: Number(item.blockNumber),
//           open: Number(item.open) / 1_000_000,
//           high: Number(item.high) / 1_000_000,
//           low: Number(item.low) / 1_000_000,
//           close: Number(item.close) / 1_000_000,
//           volume: Number(item.volume),
//         }));
//         formattedData.reverse();
//         console.log(formattedData);
//         setDataArray(formattedData);
//       } catch (error) {
//         console.error("Error fetching OHLC data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const series = [
//     {
//       data: dataArray.map((data, index) => {
//         const currentTime = new Date();
//         const timestamp = new Date(currentTime.getTime() - (index * 5 * 60 * 1000));

//         return {
//           x: timestamp.getTime(),
//           y: [data.open, data.high, data.low, data.close],
//           volume: data.volume,
//           blockNumber: data.blockNumber,
//         };
//       }),
//     },
//   ];

//   const options = {
//     chart: {
//       type: 'candlestick',
//       height: 350,
//       toolbar: { show: false },
//       background: 'transparent',
//     },
//     title: {
//       text: 'ETH Token Price',
//       align: 'left',
//       style: {
//         fontSize: '22px',
//         fontWeight: 'bold',
//         color: '#ffffff',
//       },
//     },
//     xaxis: {
//       type: 'datetime',
//       labels: {
//         formatter: (value) => {
//           return new Date(value).toLocaleTimeString([], { 
//             hour: '2-digit', 
//             minute: '2-digit',
//             hour12: false
//           });
//         },
//         style: {
//           colors: '#a1a1aa',
//           fontSize: '12px',
//           fontWeight: '600',
//         },
//         datetimeUTC: false,
//       },
//       axisBorder: { color: '#4b5563' },
//       axisTicks: { color: '#4b5563' },
//       tickAmount: dataArray.length - 1,
//       min: new Date(Date.now() - (5 * 60 * 1000 * (dataArray.length - 1))).getTime(),
//       max: Date.now(),
//     },
//     yaxis: {
//       tooltip: { enabled: true },
//       labels: {
//         style: {
//           colors: '#a1a1aa',
//           fontSize: '12px',
//           fontWeight: '600',
//         },
//       },
//     },
//     plotOptions: {
//       candlestick: {
//         colors: {
//           upward: '#22c55e',
//           downward: '#ef4444',
//         },
//       },
//     },
//     tooltip: {
//       theme: 'dark',
//       custom: ({ seriesIndex, dataPointIndex, w }) => {
//         const data = w.config.series[seriesIndex].data[dataPointIndex];
//         const timestamp = new Date(data.x).toLocaleTimeString([], { 
//           hour: '2-digit', 
//           minute: '2-digit',
//           hour12: false 
//         });
//         const [open, high, low, close] = data.y;
//         const volume = data.volume;
        
//         return `
//           <div class="px-4 py-2">
//             <div class="text-xs text-gray-400">${timestamp}</div>
//             <div class="grid grid-cols-2 gap-2 mt-2">
//               <div>Open: <span class="text-white">${open.toFixed(2)}</span></div>
//               <div>High: <span class="text-white">${high.toFixed(2)}</span></div>
//               <div>Low: <span class="text-white">${low.toFixed(2)}</span></div>
//               <div>Close: <span class="text-white">${close.toFixed(2)}</span></div>
//               <div>Volume: <span class="text-white">${volume.toLocaleString()}</span></div>
//             </div>
//           </div>
//         `;
//       },
//     },
//   };

//   return (
//     <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 mt-4 text-white rounded-lg shadow-2xl shadow-gray-900">
//       <div className="flex items-center justify-start mb-6 space-x-4">
//         <select
//           className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition-all duration-200 ease-in-out cursor-pointer"
//           value={timeframe}
//           onChange={(e) => setTimeframe(e.target.value)}
//         >
//           <option value="1">1 Min</option>
//           <option value="240">4 Hours</option>
//         </select>
//         <h2 className="text-2xl font-bold text-gray-200">ETH Candlestick Chart</h2>
//       </div>
//       <div className="mixed-chart">
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="candlestick"
//           height={350}
//         />
//       </div>
//     </div>
//   );
// }

// export default Graph;

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import futures from "../backend/contracts/futures";

const Graph = () => {
  const [timeframe, setTimeframe] = useState("1");
  const [dataArray, setDataArray] = useState([]);

  const fetchData = async () => {
    if (futures) {
      try {
        const data = await futures.methods.getOHLCVHistory().call();
        const formattedData = data.map((item) => ({
          blockNumber: Number(item.blockNumber),
          open: Number(item.open) / 1_000_000,
          high: Number(item.high) / 1_000_000,
          low: Number(item.low) / 1_000_000,
          close: Number(item.close) / 1_000_000,
          volume: Number(item.volume),
        }));
        // Take only the last 30 points
        const last30Points = formattedData.slice(-30).reverse();
        console.log(last30Points);
        setDataArray(last30Points);
      } catch (error) {
        console.error("Error fetching OHLC data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const series = [
    {
      data: dataArray.map((data, index) => {
        const currentTime = new Date();
        const timestamp = new Date(currentTime.getTime() - (index * 5 * 60 * 1000));

        return {
          x: timestamp.getTime(),
          y: [data.open, data.high, data.low, data.close],
          volume: data.volume,
          blockNumber: data.blockNumber,
        };
      }),
    },
  ];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: false
      },
    },
    title: {
      text: 'ETH Token Price',
      align: 'left',
      style: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (value) => {
          const date = new Date(value);
          return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
        },
        style: {
          colors: '#a1a1aa',
          fontSize: '12px',
          fontWeight: '600',
        },
        datetimeUTC: false,
      },
      axisBorder: { color: '#4b5563' },
      axisTicks: { color: '#4b5563' },
      tickAmount: 6, // Show fewer ticks for better readability
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        style: {
          colors: '#a1a1aa',
          fontSize: '12px',
          fontWeight: '600',
        },
        formatter: (value) => value.toFixed(2)
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#22c55e',
          downward: '#ef4444',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const data = w.config.series[seriesIndex].data[dataPointIndex];
        const timestamp = new Date(data.x).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        const [open, high, low, close] = data.y;
        const volume = data.volume;
        
        return `
          <div class="px-4 py-2">
            <div class="text-xs text-gray-400">${timestamp}</div>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <div>Open: <span class="text-white">${open.toFixed(2)}</span></div>
              <div>High: <span class="text-white">${high.toFixed(2)}</span></div>
              <div>Low: <span class="text-white">${low.toFixed(2)}</span></div>
              <div>Close: <span class="text-white">${close.toFixed(2)}</span></div>
              <div>Volume: <span class="text-white">${volume.toLocaleString()}</span></div>
            </div>
          </div>
        `;
      },
    },
  };

  return (
    <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 mt-4 text-white rounded-lg shadow-2xl shadow-gray-900">
      <div className="flex items-center justify-start mb-6 space-x-4">
        <select
          className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition-all duration-200 ease-in-out cursor-pointer"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="1">1 Min</option>
          <option value="240">4 Hours</option>
        </select>
        <h2 className="text-2xl font-bold text-gray-200">ETH Candlestick Chart</h2>
      </div>
      <div className="mixed-chart">
        <ReactApexChart
          key={`chart-${dataArray.length}`}
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </div>
    </div>
  );
}

export default Graph;