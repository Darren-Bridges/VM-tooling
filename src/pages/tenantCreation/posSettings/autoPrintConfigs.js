const autoPrintConfigs = {
    FSR: {
        "confirmedPrintAndBump": {
          "printTemplateName": "allInOne",
          "postPrintAction": {
            "type": "bundle",
            "from": "confirmed",
            "to": "ready-to-collect",
            "transition": "done"
          },
          "filter": {
            "bundleStatus": [
              "confirmed",
              "in-production"
            ],
            "status": [
              "confirmed",
              "in-production"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "pos",
              "kiosk",
              "opat",
              "delivery",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "confirmedPrint": {
          "printTemplateName": "allInOne",
          "voidedBundlesTemplateName": "voidedBundles",
          "filter": {
            "bundleStatus": [
              "confirmed",
              "in-production"
            ],
            "status": [
              "confirmed",
              "in-production"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "inProductionPrint": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "in-production"
            ],
            "status": [
              "in-production"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "readyForBaggingPrint": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "ready-for-bagging"
            ],
            "status": [
              "ready-for-bagging"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "readyToCollectPrint": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "ready-to-collect"
            ],
            "status": [
              "ready-to-collect"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "readyToCollectPrintWaiterGF": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "ready-to-collect"
            ],
            "status": [
              "ready-to-collect"
            ],
            "types": [
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": [],
            "floors": [
              {
                "name": "Ground Floor",
                "uuid": "65cb2599-9f48-4329-bf9e-2c73a98e789d"
              }
            ]
          }
        },
        "readyToCollectPrintWaiterFF": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "ready-to-collect"
            ],
            "status": [
              "ready-to-collect"
            ],
            "types": [
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": [],
            "floors": [
              {
                "name": "First Floor",
                "uuid": "474a69a4-31a0-412f-b25e-b7dd55ade5c0"
              }
            ]
          }
        }
      },
    QSR: {
        "confirmedPrintAndBump": {
          "printTemplateName": "allInOne",
          "postPrintAction": {
            "type": "bundle",
            "from": "confirmed",
            "to": "ready-to-collect",
            "transition": "done"
          },
          "filter": {
            "bundleStatus": [
              "confirmed"
            ],
            "status": [
              "confirmed"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "confirmedPrint": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "confirmed"
            ],
            "status": [
              "confirmed"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "inProductionPrint": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "in-production"
            ],
            "status": [
              "in-production"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "readyForBaggingPrint": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "ready-for-bagging"
            ],
            "status": [
              "ready-for-bagging"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        },
        "readyToCollectPrint": {
          "printTemplateName": "allInOne",
          "filter": {
            "bundleStatus": [
              "ready-to-collect"
            ],
            "status": [
              "ready-to-collect"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "pos",
              "kiosk",
              "opat",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "kitchenStations": []
          }
        }
      }
};

export default autoPrintConfigs;