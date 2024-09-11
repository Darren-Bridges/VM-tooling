
const generateGroupedDealsBundlesXML = () => {
  return `
  {{#each groupedDeals}} 
  
  <align mode="center">
    <bold>
      <text size="0:0">{{spacer (truncate (concat this.quantity " x " this.name) 35) (formatCurrency this.totalPrice) 0 42}}</text>
    </bold>
    <line-feed />
  </align> {{#each this.bundles}} 
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat this.quantity " x " this.bundleName) 35) " " 0 42}}</text>
    <line-feed />
  </align> {{#if this.bundleSize}} 
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat "- " this.bundleSize) 35 ) " " 0 42}}</text>
    <line-feed />
  </align> {{/if}} {{#each this.regular}} {{#if this.finalPrice}} 
  
  <align mode="center">
    <text>{{spacer (truncate (concat "- " this.name) 35) (formatCurrency this.finalPrice) 0 42}}</text>
    <line-feed />
  </align> {{else}} 
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat "- " this.name) 35) " " 0 42}}</text>
    <line-feed />
  </align> {{/if}} {{/each}} {{/each}} 
  
  <line-feed /> {{/each}} 
  
  {{#each groupedBundles}} {{#if (eq this.dealName "")}} 
  
  <align mode="center">
    <bold>
      <text size="0:0">{{spacer (truncate (concat this.quantity " x " this.bundleName) 35) (formatCurrency this.price) 0 42}}</text>
      <line-feed />
    </bold>
  </align> {{#if this.bundleSize}} 
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat "- " this.bundleSize) 35 ) " " 0 42}}</text>
    <line-feed />
  </align> {{/if}} {{#each this.regular}} {{#if this.finalPrice}} {{#if unitsName}} 
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat "- " this.name " (" this.units ")") 35) (formatCurrency this.finalPrice) 0 42}}</text>
    <line-feed />
  </align> {{else}} 
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat "- " this.name) 35) (formatCurrency this.finalPrice) 0 42}}</text>
    <line-feed />
  </align> {{/if}} {{else}} {{#if unitsName}}
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat "- " this.name " (" this.units ")") 35) " " 0 42}}</text>
    <line-feed />
  </align> {{else}} 
  
  <align mode="center">
    <text size="0:0">{{spacer (truncate (concat "- " this.name) 35) " " 0 42}}</text>
    <line-feed />
  </align>{{/if}} {{/if}} {{/each}} {{#if this.bundle.note}} 
  
  <align mode="center">
    <bold>
      <line-feed />
      <text size="0:0">{{spacer (truncate (concat "Note: " this.bundle.note) 35) " " 0 42}}</text>
      <line-feed />
    </bold>
  </align> {{/if}} 
  
  <line-feed /> {{/if}} {{/each}} 
  `;
};


const generateXML = (template) => {
  let xmlTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<document>`;

  template.forEach(field => {
    let fieldXML = '';
    const sizeAttr = field.size ? ` size="${field.size}"` : '';
    switch (field.id) {
      case 'store-logo':
        fieldXML = `
  <logo kc1=32 kc2=32 scaleWidth=1 scaleHeight=1 />
  <line-feed />`;
        break;
      case 'store-name':
        fieldXML = `
    <text${sizeAttr}>{{store.name}}</text>
  <line-feed />`;
        break;
      case 'store-address':
        fieldXML = `
    <text${sizeAttr}>{{store.address}}</text>
  <line-feed />`;
        break;
      case 'store-vat-number':
        fieldXML = `
  {{#if store.vatNumber}}
    <text${sizeAttr}>{{concat "VAT NO: " store.vatNumber}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'order-number':
        fieldXML = `
    <text${sizeAttr}>{{concat "&nbsp;#&nbsp;" order.serialNumber "&nbsp;" }}</text>
  <line-feed />`;
        break;
      case 'order-source':
        fieldXML = `
    <text${sizeAttr}>{{order.source}}</text>
  <line-feed />`;
        break;
      case 'order-type':
        fieldXML = `
    <text${sizeAttr}>{{#if order.takeaway}}TAKEAWAY{{else}}EAT IN{{/if}}</text>
  <line-feed />`;
        break;
      case 'table-number':
        fieldXML = `
  {{#if order.table}}
    <text${sizeAttr}>{{concat "Table No: " order.table}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'customer-name':
        fieldXML = `
  {{#if order.user.name}}
    <text${sizeAttr}>{{truncate order.user.name}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'delivery-address':
        fieldXML = `
  {{#if deliveryAddress}}
    <text${sizeAttr}>Delivery address: {{deliveryAddress}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'delivery-instructions':
        fieldXML = `
  {{#if deliveryInstructions}}
    <text${sizeAttr}>Instructions: {{deliveryInstructions}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'grouped-deals-and-bundles':
        fieldXML = generateGroupedDealsBundlesXML();
        break;
      case 'order-accessories':
        fieldXML = `
  {{#each order.accessories}}
    <text${sizeAttr}>{{spacer (truncate this.name 35 ) " " 0 42}}</text>
    <line-feed />
  {{/each}}`;
        break;
      case 'order-note':
        fieldXML = `
  {{#if order.note}}
    <text${sizeAttr}>{{spacer (truncate order.note 35 ) " " 0 42}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'order-datetime':
        fieldXML = `
    <text${sizeAttr}>{{concat "Ordered at: " (formatTime order.createdAt)}}</text>
  <line-feed />`;
        break;
      case 'subtotal':
        fieldXML = `
    <text${sizeAttr}>{{spacer "Subtotal:" (formatCurrency order.payment.price) 0 42}}</text>
  <line-feed />`;
        break;
      case 'service-charge':
        fieldXML = `
  {{#if order.payment.serviceCharge}}
    <text${sizeAttr}>{{spacer "Service Charge" (formatCurrency order.payment.serviceCharge) 0 42}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'discount':
        fieldXML = `
  {{#if order.payment.discount}}
    <text${sizeAttr}>{{spacer "Discount" (formatCurrency order.payment.discount) 0 42}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'delivery-fee':
        fieldXML = `
  {{#if order.payment.deliveryFee}}
    <text${sizeAttr}>{{spacer "Delivery Fee" (formatCurrency order.payment.deliveryFee) 0 42}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'refunds':
        fieldXML = `
  {{#if order.payment.refundSumUp}}
    <text${sizeAttr}>{{spacer "Refunds" (formatCurrency order.payment.refundSumUp) 0 42}}</text>
    <line-feed />
  {{/if}}`;
        break;
      case 'total':
        fieldXML = `
    <text${sizeAttr}>{{spacer "Total" (formatCurrency order.payment.totalAmount) 0 42}}</text>
  <line-feed />`;
        break;
      case 'vat-amount':
        fieldXML = `
    <text${sizeAttr}>{{spacer "VAT" (formatCurrency order.payment.vatAmount) 0 42}}</text>
  <line-feed />`;
        break;
      case 'separator-line':
        fieldXML = `
  <align mode="center">
    <text size="0:0">{{line "-"}}</text>
  </align>
  <line-feed />`;
        break;
      case 'line-feed':
        fieldXML = `
  <line-feed />`;
        break;
      default:
        fieldXML = `
    <text${sizeAttr}>{{${field.id}}}</text>
  <line-feed />`;
    }

    if (field.alignment && field.id !== 'separator-line' && field.id !== 'line-feed') {
      fieldXML = `
  <align mode="${field.alignment}">
${fieldXML}
  </align>`;
    }

    if (field.isBold && field.id !== 'store-logo' && field.id !== 'separator-line' && field.id !== 'line-feed') {
      fieldXML = `
  <bold>${fieldXML.trim()}</bold>`;
    }

    xmlTemplate += fieldXML;
  });

  xmlTemplate += `
  <paper-cut />
</document>`;

  return xmlTemplate;
};

export default generateXML;