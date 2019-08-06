export default {
  status: false,
  validation: false,
  fields: [
    "index",
    { key: "sn", label: "HSN/SAC" },
    { key: "item", label: "Item Description" },
    { key: "qty", label: "Quantity" },
    { key: "up", label: "Unit Price" },
    { key: "tot", label: "Total" }
  ],
  items: [{ sn: "998434", item: "Software Product", qty: 0, up: 200, tot: 0 }],
  cdetails: [
    {
      cname: "",
      street: "",
      town: "",
      address: "",
      phno: "",
      email: "",
      state_code: "",
      gst_no: ""
    }
  ],
  cldetails: [
    {
      date: new Date(),
      ino: "",
      po: "",
      name: "",
      clname: "",
      state_code: "",
      gst_no: "",
      address: ""
    }
  ],
  text1: "Thanks for your service",
  text2: "Payment terms: to be received in 5 days",
  customToolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }]
  ],
  footer: [
    {
      subTotalText: "Sub Total",
      subTotal: 0,
      newsubTotal: 0,
      discountText: "Discount",
      discount: 0,
      discountPercentage: 0,
      cgstText: "CGST",
      cgstPercentage: 9,
      cgst: 0,
      sgstText: "SGST",
      sgstPercentage: 9,
      sgst: 0,
      igstText: "IGST",
      igstPercentage: 18,
      igst: 0,
      kfcText: "KFC",
      kfcPercentage: 1,
      kfc: 0,
      grandTotalText: "Grand Total",
      grandTotal: 0
    }
  ]
};
