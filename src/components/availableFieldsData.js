const availableFieldsData = [
  {
    groupName: "Store Information",
    fields: [
      { id: 'store-logo', name: 'Store Logo', placeholder: '[Logo]' },
      { id: 'store-name', name: 'Store Name', placeholder: 'ACME Store' },
      { id: 'store-address', name: 'Store Address', placeholder: '123 Main St, City, Country' },
      { id: 'store-vat-number', name: 'Store VAT Number', placeholder: 'VAT: GB123456789' },
    ]
  },
  {
    groupName: "Order Details",
    fields: [
      { id: 'order-number', name: 'Order Number', placeholder: '#ORD-12345' },
      { id: 'order-source', name: 'Order Source', placeholder: 'In-Store' },
      { id: 'order-type', name: 'Order Type', placeholder: 'Eat In' },
      { id: 'table-number', name: 'Table Number', placeholder: 'Table 42' },
      { id: 'order-datetime', name: 'Order Date and Time', placeholder: '2023-05-20 14:30' },
    ]
  },
  {
    groupName: "Customer Information",
    fields: [
      { id: 'customer-name', name: 'Customer Name', placeholder: 'John Doe' },
      { id: 'delivery-address', name: 'Delivery Address', placeholder: '456 Elm St, City, Country' },
      { id: 'delivery-instructions', name: 'Delivery Instructions', placeholder: 'Leave at door' },
    ]
  },
  {
    groupName: "Order information",
    fields: [
      { id: 'grouped-deals-and-bundles', name: 'Grouped Deals + Bundles', placeholder: '2x Burger + £20.00\n....Ketchup\n....Well done\n2x Fries + £5.00\n1x Coke + £2.00' },
      { id: 'order-accessories', name: 'Order Accessories', placeholder: '1x Bag' },
      { id: 'order-note', name: 'Order Note', placeholder: 'No pickles, please' },
    ]
  },
  {
    groupName: "Payment Details",
    fields: [
      { id: 'subtotal', name: 'Subtotal', placeholder: '£13.98' },
      { id: 'delivery-fee', name: 'Delivery Fee', placeholder: '£2.00' },
      { id: 'service-charge', name: 'Service Charge', placeholder: '£1.00' },
      { id: 'discount', name: 'Discount', placeholder: '-£2.00' },
      { id: 'refunds', name: 'Refunds', placeholder: '£0.00' },
      { id: 'total', name: 'Total', placeholder: '£14.98' },
      { id: 'vat-amount', name: 'VAT Amount', placeholder: '£1.50' },
    ]
  },
  {
    groupName: "Formatting",
    fields: [
      { id: 'separator-line', name: 'Separator Line', placeholder: '----------------------' },
      { id: 'line-feed', name: 'Line Feed', placeholder: '\n' },
    ]
  },
];

export default availableFieldsData;