import { DOMParser } from 'xmldom';

const parseReceiptXML = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const fields = [];
  let consecutiveLineFeeds = 0;
  let currentAlignment = 'left'; // Default alignment
  let isBold = false;
  let textSize = '1:1'; // Default size
  let isInGroupedDeals = false;

  const addField = (id, alignment = currentAlignment, bold = isBold, size = textSize) => {
    fields.push({ id, alignment, bold, size });
    consecutiveLineFeeds = 0;
  };

  const parseNode = (node) => {
    if (node.nodeType === 1) { // Element node
      const nodeAlignment = node.getAttribute('mode');
      if (nodeAlignment) {
        currentAlignment = nodeAlignment;
      }

      const nodeSize = node.getAttribute('size');
      if (nodeSize) {
        textSize = nodeSize;
      }

      if (node.nodeName.toLowerCase() === 'bold') {
        isBold = true;
      }

      switch (node.nodeName.toLowerCase()) {
        case 'logo':
          addField('store-logo');
          break;
        case 'text':
          const content = node.textContent;
          if (content.includes('{{')) {
            const matches = content.match(/{{([^}]+)}}/g);
            if (matches) {
              matches.forEach(match => {
                const fieldContent = match.replace(/{{|}}/g, '').trim();
                if (fieldContent.includes('store.name')) addField('store-name');
                else if (fieldContent.includes('store.address')) addField('store-address');
                else if (fieldContent.includes('store.vatNumber')) addField('store-vat-number');
                else if (fieldContent.includes('order.serialNumber')) addField('order-number');
                else if (fieldContent.includes('order.source')) addField('order-source');
                else if (fieldContent.includes('order.takeaway')) addField('order-type');
                else if (fieldContent.includes('order.table')) addField('table-number');
                else if (fieldContent.includes('order.createdAt')) addField('order-datetime');
                else if (fieldContent.includes('order.payment.price')) addField('subtotal');
                else if (fieldContent.includes('order.payment.serviceCharge')) addField('service-charge');
                else if (fieldContent.includes('order.payment.totalAmount')) addField('total');
                else if (fieldContent.includes('line "-"')) addField('separator-line');
                else if (fieldContent.includes('order.accessories')) addField('order-accessories');
                else if (fieldContent.includes('order.note')) addField('order-note');
              });
            }
          }
          break;
        case 'line-feed':
          if (!isInGroupedDeals) {
            consecutiveLineFeeds++;
            if (consecutiveLineFeeds > 1) {
              addField('line-feed');
            }
          }
          break;
        case 'align':
          if (node.textContent.includes('{{#each groupedDeals}}')) {
            addField('grouped-deals-and-bundles');
            isInGroupedDeals = true;
          } else if (node.textContent.includes('{{/each}}')) {
            isInGroupedDeals = false;
          }
          break;
        default:
          consecutiveLineFeeds = 0;
          break;
      }

      if (node.nodeName.toLowerCase() === 'bold') {
        isBold = false;
      }
    }
    
    if (node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        parseNode(node.childNodes[i]);
      }
    }
  };

  parseNode(xmlDoc.documentElement);

  return fields;
};

export default parseReceiptXML;
