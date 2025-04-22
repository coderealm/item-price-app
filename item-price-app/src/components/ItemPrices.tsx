import { useEffect, useState } from "react";
import { Item } from "../types/item";
import "../app.css";
import ItemWithChange from "../types/ItemWithChange";
import PriceChange from "../types/PriceChange";
import UseSignalR from "../signalr/useSignalR";

export const ItemPrices = () => {
  const connection = UseSignalR();
  const [items, setItems] = useState<ItemWithChange[]>([]);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!connection) return;

    const handlePriceUpdate = (updates: Item[]) => {
      setItems((prevItems) =>
        updates.map((update) => {
          const prev = prevItems.find((p) => p.id === update.id);
          const change: PriceChange = !prev
            ? "same"
            : update.price > prev.price
            ? "up"
            : update.price < prev.price
            ? "down"
            : "same";

          return {
            ...update,
            updatedAt: new Date().toISOString(),
            change,
          };
        })
      );
    };

    connection.on("PriceUpdate", handlePriceUpdate);

    return () => {
      connection.off("PriceUpdate", handlePriceUpdate);
    };
  }, [connection]);

  const handleSubscribe = async () => {
    if (connection) {
      await connection.invoke("Subscribe");
      setSubscribed(true);
    }
  };

  const handleUnsubscribe = async () => {
    if (connection) {
      await connection.invoke("Unsubscribe");
      setSubscribed(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex space-x-6">
        <button
          onClick={handleSubscribe}
          disabled={subscribed}
          className="px-4 py-2 bg-green-600 text-white rounded mr-30"
        >
          Subscribe
        </button>
        <button
          onClick={handleUnsubscribe}
          disabled={!subscribed}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Unsubscribe
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-gray-500">
          Click subscibe for data from server...
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Item Price Updates</h1>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Price (£)</th>
                <th className="border px-2 py-1">Change</th>
                <th className="border px-2 py-1">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const changeColor =
                  item.change === "up"
                    ? "text-green-600"
                    : item.change === "down"
                    ? "text-red-600"
                    : "text-gray-600";
                const changeSymbol =
                  item.change === "up"
                    ? "▲"
                    : item.change === "down"
                    ? "▼"
                    : "–";

                return (
                  <tr key={item.id}>
                    <td className="border px-2 py-1">{item.id}</td>
                    <td className="border px-2 py-1">{item.name}</td>
                    <td className="border px-2 py-1">
                      {item.price.toFixed(2)}
                    </td>
                    <td className={`border px-2 py-1 ${changeColor}`}>
                      {changeSymbol}
                    </td>
                    <td className="border px-2 py-1">
                      {new Date(item.updatedAt).toLocaleTimeString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
