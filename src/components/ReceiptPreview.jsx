import { forwardRef } from "react";
import logo from "../assets/riza-logo.png";
import abaLogo from "../assets/ABA-Logo.png";
import aba from "../assets/aba.jpg";
import l1 from "../assets/L1.png";

const ReceiptPreview = forwardRef(({ data, items, addItem, updateItem, customerName, setCustomerName, phoneNumber, setPhoneNumber, orderDate, setOrderDate, pickupDate, setPickupDate, invoiceNumber, setInvoiceNumber, currentItemName, setCurrentItemName, currentItemQty, setCurrentItemQty, currentItemPrice, setCurrentItemPrice, deliveryFee, setDeliveryFee }, ref) => {
  const total = (data?.items || []).reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.price) || 0), 0);
  const deliveryFeeNum = Number(deliveryFee) || 0;
  const subTotal = total + deliveryFeeNum;

  return (
    <div ref={ref} className="bg-white w-full max-w-2xl mx-auto p-2 sm:p-4 print:p-2 text-sm relative">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2 print:mb-1.5 gap-2 sm:gap-4 print:gap-2">
        <img src={logo} alt="Riza Logo" className="h-20 sm:h-32 print:h-20 w-auto" />
        <div className="text-center flex-1">
          <h1 className="font-bold text-brand text-2xl sm:text-4xl print:text-2xl print:mb-0 leading-tight">
            Riza Modern Kitchen
          </h1>
          <p className="text-[10px] sm:text-xs print:text-[9px] mt-1 print:mt-0.5 leading-relaxed">Selling all kind of electric kitchen appliances.</p>
          <p className="text-[10px] sm:text-xs print:text-[9px] leading-relaxed">មានលក់សម្ភារៈផ្ទះបាយអគ្គិសនីទំនើបគ្រប់ប្រភេទ.</p>
        </div>
        <img src={l1} alt="L1" className="h-20 sm:h-32 print:h-20 w-auto" />
      </div>

      <div className="flex flex-col sm:flex-row mb-3 print:mb-1.5 gap-2 sm:gap-0">
        <div className="space-y-1 print:space-y-0.5 text-xs w-full sm:w-1/3">
          <div className="flex items-center gap-1">
            <label className="text-[10px] print:text-[9px] whitespace-nowrap min-w-max">ឈ្មោះអតិថិជន:</label>
            <span className="hidden print:inline text-[10px] print:text-[9px]">{customerName || '____________'}</span>
            <input 
              type="text" 
              className="border p-0.5 rounded w-full sm:w-32 text-[10px] print:hidden flex-1" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-[10px] print:text-[9px] whitespace-nowrap min-w-max">លេខទូរស័ព្ទ:</label>
            <span className="hidden print:inline text-[10px] print:text-[9px]">{phoneNumber || '____________'}</span>
            <input 
              type="text" 
              className="border p-0.5 rounded w-full sm:w-32 text-[10px] print:hidden flex-1" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-[10px] print:text-[9px] whitespace-nowrap min-w-max">កាត់ថ្ងៃទី:</label>
            <span className="hidden print:inline text-[10px] print:text-[9px]">{orderDate || '____________'}</span>
            <input 
              type="text" 
              placeholder="DD-MM-YYYY"
              className="border p-0.5 rounded w-full sm:w-32 text-[10px] print:hidden flex-1" 
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-[10px] print:text-[9px] whitespace-nowrap min-w-max">យកថ្ងៃទី:</label>
            <span className="hidden print:inline text-[10px] print:text-[9px]">{pickupDate || '____________'}</span>
            <input 
              type="date" 
              className="border p-0.5 rounded w-full sm:w-32 text-[10px] print:hidden flex-1" 
              value={pickupDate}
              onChange={(e) => {
                const dateObj = new Date(e.target.value);
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();
                setPickupDate(`${day}-${month}-${year}`);
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pl-0 sm:pl-16 print:pl-12 pr-0 sm:pr-4">
          <div className="text-lg sm:text-xl print:text-base font-bold text-brand underline leading-tight">
            <div>វិក័យប័ត្រ</div>
            <div>Invoice</div>
          </div>
          <div className="text-xs print:text-[9px] text-right font-mono leading-relaxed w-full sm:w-auto">
            <div>097 7777 662</div>
            <div>096 4676 666</div>
            <div className="mt-1 pt-1 border-t border-black font-bold">
              INV: <span className="hidden print:inline text-[10px] print:text-[9px] ml-1">{invoiceNumber || '___'}</span>
              <input 
                type="text" 
                className="border p-0.5 rounded w-16 text-[10px] ml-1 print:hidden" 
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse border border-black text-sm min-w-[500px]">
        <thead>
          <tr className="bg-gray-50 print:bg-gray-100">
            <th className="w-[8%] text-center px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] border border-black font-bold">ល.រ / No</th>
            <th className="w-[34%] text-left px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] leading-tight border border-black font-bold">
              <span className="block">ឈ្មោះមុខទំនិញ</span>
              <span className="block">Description</span>
            </th>
            <th className="w-[13%] text-center px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] border border-black font-bold">
              <span className="block">ចំនួន</span>
              <span className="block">Quantity</span>
            </th>
            <th className="w-[18%] text-right px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] leading-tight border border-black font-bold">
              <span className="block">តម្លៃរាយ</span>
              <span className="block">Unit Price</span>
            </th>
            <th className="w-[27%] text-right px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] leading-tight border border-black font-bold">
              <span className="block">តម្លៃសរុប</span>
              <span className="block">Amount</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {(data?.items || []).map((i, idx) => (
            <tr key={idx} className="border border-black">
              <td className="px-2 py-1 print:px-1 print:py-0.5 text-center font-mono text-[10px] print:text-[8px] border border-black">{idx + 1}</td>
              <td className="px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] truncate border border-black">{i.name}</td>
              <td className="px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] text-center font-mono border border-black">{Number(i.qty) || 0}</td>
              <td className="px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] text-right font-mono border border-black">${(Number(i.price) || 0).toFixed(2)}</td>
              <td className="px-2 py-1 print:px-1 print:py-0.5 text-[10px] print:text-[8px] text-right font-mono border border-black">${((Number(i.qty) || 0) * (Number(i.price) || 0)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="mt-3 print:mt-1.5">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 print:gap-2">
          <div className="flex flex-col items-start gap-1 print:gap-0.5 w-full sm:w-auto">
            <div className="flex items-center gap-2 print:gap-1">
              <img src={abaLogo} alt="ABA Logo" className="h-24 sm:h-40 print:h-32 w-auto" />
              <img src={aba} alt="ABA" className="h-24 sm:h-40 print:h-32 w-auto" />
            </div>
            <p className="text-xs print:text-[9px] font-medium text-left ml-24 sm:ml-44 print:ml-16">អគុណសំរាប់ការគាំទ្រ</p>
          </div>
          <div className="text-right text-xs print:text-[9px] font-mono w-full sm:w-auto">
            <div className="flex justify-between gap-4 print:gap-2 mb-1 font-bold border-b-2 border-black pb-1">
              <span className="whitespace-nowrap">សរុបៗ / Sub Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4 print:gap-2 mb-1">
              <label className="whitespace-nowrap">ដឹកជញ្ជូន / Delivery Fee:</label>
              <div className="flex items-center">
                <span>$</span>
                <span className="hidden print:inline text-right w-12">{(Number(deliveryFee) || 0).toFixed(2)}</span>
                <input 
                  type="number" 
                  className="w-12 border p-0.5 rounded text-[10px] text-right print:hidden" 
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between gap-4 print:gap-2 font-bold border-t-2 border-black pt-1">
              <span className="whitespace-nowrap">សរុប / Total Price:</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t print:hidden">
        <h2 className="text-sm font-bold text-brand mb-2">Receipt Input</h2>
        <div className="space-y-1 mb-2">
          <div className="grid grid-cols-3 gap-2">
            <input className="border p-1 rounded text-xs" placeholder="ឈ្មោះមុខទំនិញ"
              value={currentItemName}
              onChange={e => setCurrentItemName(e.target.value)} />
            <input type="number" className="border p-1 rounded text-xs" placeholder="ចំនួន" min="0"
              value={currentItemQty}
              onChange={e => {
                const v = e.target.value;
                if (v === "") {
                  setCurrentItemQty("");
                } else {
                  setCurrentItemQty(Math.max(0, Number(v) || 0));
                }
              }} />
            <input type="number" className="border p-1 rounded text-xs" placeholder="តម្លៃរាយ" min="0"
              value={currentItemPrice}
              onChange={e => {
                const v = e.target.value;
                if (v === "") {
                  setCurrentItemPrice("");
                } else {
                  setCurrentItemPrice(Math.max(0, Number(v) || 0));
                }
              }} />
          </div>
        </div>
        <button onClick={addItem}
          className="block max-w-[160px] w-full mx-auto bg-brand text-white px-3 py-1 rounded hover:bg-pink-600 text-xs">
          + Add Item
        </button>
      </div>

      <div className="hidden print:block mt-4 pt-2 border-t border-black text-center text-[9px] leading-relaxed">
        <p className="font-semibold">Riza Modern Kitchen</p>
        <p>No.27 Borey Peng Huot Beoung Snor Chbar Om Pov, Phnom Penh, Cambodia</p>
        <p className="mt-1">Thank you for your support!</p>
      </div>

    </div>
  );
});

ReceiptPreview.displayName = 'ReceiptPreview';

export default ReceiptPreview;
