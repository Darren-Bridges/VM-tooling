const StoreSettingConfig = {
    storeSettings: async () => {
      const displayRecentOrders = JSON.stringify({"default":{"maxNumberOfOrders":5,"maxNumberOfDays":21},"kiosk":{}});
      const orderAccessories = JSON.stringify({"default":[{"name":"Bag"},{"name":"Cutlery"}]});
      const orderCancellation = JSON.stringify({
        "online": { "default": { "days": 2, "time": "17:30" } },
        "delivery": { "default": { "days": 2, "time": "17:30" } }
      });
  
      return [
        {"name": "kds.stock.allowPermanentDeactivation", "value": "1", "uuid":"d47ecba1-cc08-4988-b66d-e586b99123bf"},
        {"name": "kds.screens.orderHistory", "value": "1", "uuid":"e38682c3-abbb-11ea-955f-068e677b3ba4"},
        {"name": "redash.report.url", "value": "https://vmos2.vmos.io/report/dashboard/store-level", "uuid":"b32101a5-30a8-11ea-975d-06dea2640edc"},
        {"name": "homepage.displayRecentOrders", "value": displayRecentOrders, "uuid":"eb846f1c-10e5-4bc8-bca8-882b288d7308"},
        {"name": "epos.receipt.mergeReceipts", "value": "1", "uuid":"ad3e896c-c2c8-11ea-955f-068e677b3ba4"},
        {"name": "order.accessories", "value": orderAccessories, "uuid":"8e187984-d9c5-48db-8882-e289b645e6de"},
        {"name": "order.cancellation", "value": orderCancellation, "uuid":"24f4d68c-6266-4950-a93f-3c0d2361e9d7"}
      ];
    },
  
    ccStoreSettings: async () => {
      const collectOrdersPerSlot = JSON.stringify({"on": 5, "busy": 4, "very-busy": 3});
      return [
        {"name": "timeslot.shift", "value": "15", "uuid":"a4f6ae4b-02f2-11ea-b645-06dea2640edc"},
        {"name": "preorder.clickAndCollect.availableDays", "value": "1", "uuid":"45d83e74-509b-4d38-a4e8-eb2c7f9b3eda"},
        {"name": "preorder.clickAndCollect.ordersPerSlot", "value": collectOrdersPerSlot, "uuid":"c4db0acb-9a2b-47d9-8035-72019bd61da3"}
      ];
    },
  
    opatStoreSettings: async () => {
      const busyModeBanner = JSON.stringify({"busy":"10","very-busy":"15"});
      return [
        {"name": "hasOpat", "value": "1", "uuid":"5d94ba72-229c-449c-8530-e09419a33f0adsdsd"},
        {"name": "busyMode.banner", "value": busyModeBanner, "uuid":"d59bd551-63db-40b5-a36b-7de0c16fb4f7"}
      ];
    },
  
    deliveryStoreSettings: async () => {
      const deliveryFee = JSON.stringify([{ "amount": [0], "radius": [{ "distance": [0], "fee": 2.5 }] }]);
      const orderPriceRestriction = JSON.stringify({"delivery":{"minPrice":10,"maxPrice":1000}});
      return [
        {"name": "preorder.delivery.window.length", "value": "30", "uuid":"e23d3642-e60c-11ea-a79c-0680387720c2"},
        {"name": "preorder.delivery.timeslot.shift", "value": "30", "uuid":"e16c7c79-e60c-11ea-a79c-0680387720c2"},
        {"name": "preorder.delivery.polygon", "value": "1", "uuid":"5f1cca8f-758e-4e4e-9869-fc385c001cd8"},
        {"name": "preorder.delivery.ordersPerSlot", "value": "3", "uuid":"e1f9a824-e60c-11ea-a79c-0680387720c2"},
        {"name": "preorder.delivery.availableDays", "value": "7", "uuid":"e127a188-e60c-11ea-a79c-0680387720c2"},
        {"name": "preorder.delivery.asap.enabled", "value": "1", "uuid":"e28a4a44-e60c-11ea-a79c-0680387720c2"},
        {"name": "preorder.delivery.fee", "value": deliveryFee, "uuid":"b381a0a4-7297-11ea-b7ad-06013dcb6ef2"},
        {"name": "hide.stores.delivery.unavailable", "value": "1", "uuid":"f346efc9-3386-4bc6-b640-0ac106a1b042"},
        {"name": "order.price.restriction", "value": orderPriceRestriction, "uuid":"96416d0a-7295-11ea-b7ad-06013dcb6ef2"}
      ];
    },
  
    kioskStoreSettings: async () => {
      return [
        {"name": "hasEatIn", "value": "1", "uuid":"90c062a1-f2e7-4e9a-8091-c3a230f5cedb"},
        {"name": "kiosk.dining-type-page.enabled", "value": "1", "uuid":"d5c9912b-2bc3-11ea-975d-06dea2640edc"}
      ];
    },
  
    eposStoreSettings: async () => {
      return []; // Add EPOS-specific settings if needed
    }
  };
  
  export default StoreSettingConfig;