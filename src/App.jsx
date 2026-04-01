import { useRef, useState, useEffect } from "react";
import ReceiptPreview from "./components/ReceiptPreview";
import PrintButton from "./components/PrintButton";

export default function App() {
  const ref = useRef();
  const [items, setItems] = useState([]);
  const [currentItemName, setCurrentItemName] = useState("");
  const [currentItemQty, setCurrentItemQty] = useState("");
  const [currentItemPrice, setCurrentItemPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  
  // Get current date in DD-MM-YYYY format
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const [orderDate, setOrderDate] = useState(getTodayDate());
  const [pickupDate, setPickupDate] = useState("");
  
  // Load invoice number from localStorage
  const [invoiceNumber, setInvoiceNumber] = useState(() => {
    const saved = localStorage.getItem("lastInvoiceNumber");
    return saved || "001";
  });
  
  const [deliveryFee, setDeliveryFee] = useState("");

  // Save invoice number to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lastInvoiceNumber", invoiceNumber);
  }, [invoiceNumber]);

  const incrementInvoiceNumber = () => {
    const num = parseInt(invoiceNumber, 10);
    if (!Number.isNaN(num)) {
      const width = Math.max(String(invoiceNumber).length, 3);
      const next = num + 1;
      const nextInvoice = String(next).padStart(width, "0");
      setInvoiceNumber(nextInvoice);
      
      // Save invoice to history
      const invoice = {
        invoiceNumber,
        date: new Date().toISOString(),
        customerName,
        phoneNumber,
        customerAddress,
        orderDate,
        pickupDate,
        items,
        deliveryFee,
        total: items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.price) || 0), 0),
        grandTotal: items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.price) || 0), 0) + (Number(deliveryFee) || 0)
      };
      
      const history = JSON.parse(localStorage.getItem("invoiceHistory") || "[]");
      history.push(invoice);
      // Keep only last 50 invoices
      if (history.length > 50) history.shift();
      localStorage.setItem("invoiceHistory", JSON.stringify(history));
    }
  };

  const addItem = () => {
    if (currentItemName.trim()) {
      const qty = currentItemQty === "" ? 0 : currentItemQty;
      const price = currentItemPrice === "" ? 0 : currentItemPrice;
      setItems([...items, { name: currentItemName, qty, price }]);
      setCurrentItemName("");
      setCurrentItemQty("");
      setCurrentItemPrice("");
    }
  };

  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-2">
        <ReceiptPreview 
          ref={ref} 
          data={{ items }} 
          items={items}
          addItem={addItem}
          updateItem={updateItem}
          customerName={customerName}
          setCustomerName={setCustomerName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          customerAddress={customerAddress}
          setCustomerAddress={setCustomerAddress}
          orderDate={orderDate}
          currentItemName={currentItemName}
          setCurrentItemName={setCurrentItemName}
          currentItemQty={currentItemQty}
          setCurrentItemQty={setCurrentItemQty}
          currentItemPrice={currentItemPrice}
          setCurrentItemPrice={setCurrentItemPrice}
          setOrderDate={setOrderDate}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          deliveryFee={deliveryFee}
          setDeliveryFee={setDeliveryFee}
        />
        
        <PrintButton targetRef={ref} onAfterPrint={incrementInvoiceNumber} />

        <footer className="text-center text-xs text-gray-600 py-4">
          No.27 Borey Peng Huot Beoung Snor Chbar Om Pov, Phnom Penh, Cambodia
        </footer>
      </div>
    </div>
  );
}
