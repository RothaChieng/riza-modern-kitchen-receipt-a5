import { useState } from "react";

export default function ReceiptForm({ onChange }) {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const updated = [...items, { name: "", qty: 1, price: 0 }];
    setItems(updated);
    onChange({ items: updated });
  };

  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
    onChange({ items: updated });
  };

  return (
    <div className="bg-white p-4 rounded shadow max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-lg font-bold text-brand mb-3">Receipt Input</h2>
      <div className="space-y-2 mb-4">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-3 gap-2">
            <input className="border p-1 rounded" placeholder="Item"
              onChange={e => updateItem(i, "name", e.target.value)} />
            <input type="number" className="border p-1 rounded" placeholder="Qty"
              onChange={e => updateItem(i, "qty", Number(e.target.value) || 0)} />
            <input type="number" className="border p-1 rounded" placeholder="Price"
              onChange={e => updateItem(i, "price", Number(e.target.value) || 0)} />
          </div>
        ))}
      </div>
      <button onClick={addItem}
        className="w-full bg-brand text-white px-3 py-2 rounded hover:bg-pink-600">
        + Add Item
      </button>
    </div>
  );
}
