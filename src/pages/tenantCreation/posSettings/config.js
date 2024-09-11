const pos2config = {
    FSR: {
        "requiredFields": {
          "eatIn": [
            "EDIT_TABLE_NUMBER"
          ]
        },
        "defaultPaymentType": "card",
        "enableDebugMenu": false,
        "enableExpressPay": false,
        "useVoidComp": true,
        "showTransactionsOnPaymentScreen": true,
        "fulfillmentCutOffStatus": "in-production",
        "lockKDSDisplayOptions": true,
        "showChangeStoreNavBar": false,
        "eatInPayAtEnd": true,
        "rememberLastKDSScreen": true,
        "driveThroughPayAtEnd": false,
        "enableOfflineMode": true,
        "homeScreenAfterSignIn": "openOrders",
        "enableAutoMealDealDetection": true,
        "enableScanning": true,
        "newOrder": {
          "enabled": true,
          "icon": "star"
        },
        "openOrders": {
          "enabled": true,
          "icon": "star",
          "enablePaidUnpaid": true,
          "orderTypes": [
            "all",
            "eatIn",
            "takeaway",
            "delivery"
          ]
        },
        "ordersHistory": {
          "enabled": true,
          "icon": "star",
          "printTemplate": "customerReceipt"
        },
        "enableBillSplitting":{
          "byItems": true,
          "byCovers": true
        },
        "reporting": {
          "enabled": true
        },
        "stockQuantity": {
          "enabled": false,
          "icon": "star"
        },
        "stockManagementV2": {
          "enabled": true,
          "icon": "star"
        },
        "virtualBrandsControl": {
          "enabled": false,
          "icon": "star"
        },
        "floorPlan": {
          "enabled": true,
          "icon": "star"
        },
        "cashManagement": {
          "enabled": true,
          "icon": "star"
        },
        "reconciliation": {
          "enabled": true,
          "icon": "star"
        },
        "ordersHistoryList": {
          "enabled": true,
          "showCardDigits": true
        },
        "settingsV2": {
          "enabled": true,
          "icon": "star"
        },
        "theme": {
          "channelColors": {
            "online": "#880808",
            "pos": "#AB47BC",
            "kiosk": "#43A047",
            "opat": "#FBC02D",
            "deliveroo": "#4DB6AC",
            "justEat": "#FB8C00",
            "delivery": "#E64A19",
            "uberEats": "#263238",
            "preOrder": "#039BE5"
          }
        }
      },
    QSR: {
        "defaultPaymentType": "card",
        "enableDebugMenu": false,
        "enableExpressPay": true,
        "useVoidComp": false,
        "showTransactionsOnPaymentScreen": true,
        "fulfillmentCutOffStatus": "in-production",
        "lockKDSDisplayOptions": true,
        "showChangeStoreNavBar": false,
        "eatInPayAtEnd": false,
        "rememberLastKDSScreen": true,
        "driveThroughPayAtEnd": false,
        "enableAutoMealDealDetection": true,
        "enableScanning": true,
        "newOrder": {
          "enabled": true,
          "icon": "star"
        },
        "openOrders": {
          "enabled": false,
          "icon": "star",
          "enablePaidUnpaid": true,
          "orderTypes": [
            "all",
            "eatIn",
            "takeaway",
            "delivery"
          ]
        },
        "ordersHistory": {
          "enabled": true,
          "icon": "star",
          "printTemplate": "customerReceipt"
        },
        "reporting": {
          "enabled": true
        },
        "stockQuantity": {
          "enabled": false,
          "icon": "star"
        },
        "stockManagementV2": {
          "enabled": true,
          "icon": "star"
        },
        "virtualBrandsControl": {
          "enabled": false,
          "icon": "star"
        },
        "floorPlan": {
          "enabled": false,
          "icon": "star"
        },
        "cashManagement": {
          "enabled": true,
          "icon": "star"
        },
        "reconciliation": {
          "enabled": true,
          "icon": "star"
        },
        "ordersHistoryList": {
          "enabled": true,
          "showCardDigits": true
        },
        "settingsV2": {
          "enabled": true,
          "icon": "star"
        },
        "theme": {
          "channelColors": {
            "online": "#880808",
            "pos": "#AB47BC",
            "kiosk": "#43A047",
            "opat": "#FBC02D",
            "deliveroo": "#4DB6AC",
            "justEat": "#FB8C00",
            "delivery": "#E64A19",
            "uberEats": "#263238",
            "preOrder": "#039BE5"
          }
        }
      }
};

export default pos2config;