const posKitchenScreens = {
    FSR: [
        {
          "name": "Salad Bar",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "bundleStatus": [
              "confirmed",
              "in-production"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "kiosk",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "ready-to-collect",
                "transition": "done"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "One screen (two bumps)",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "ready-to-collect",
                "transition": "done"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "ready-to-collect",
                "to": "collected",
                "transition": "anyToCollected"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "One screen (one bump)",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production",
              "ready-for-bagging"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "ready-to-collect",
                "transition": "done"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "Kitchen Screen",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "in-production",
                "transition": "prepare"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "in-production",
                "to": "ready-to-collect",
                "transition": "done"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "Front of House",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "in-production",
                "transition": "prepare"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "in-production",
                "to": "ready-to-collect",
                "transition": "done"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "ready-to-collect",
                "to": "collected",
                "transition": "collect"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "Finished Orders",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "collected"
            ],
            "status": [
              "collected",
              "ready-to-collect",
              "ready-for-bagging",
              "in-production",
              "confirmed"
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
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "collected",
                "to": "confirmed",
                "transition": "anyToConfirmed"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            }
          }
        }
      ],
    QSR: [
        {
          "name": "Salad Bar",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "bundleStatus": [
              "confirmed",
              "in-production"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
            ],
            "types": [
              "takeaway",
              "delivery",
              "eatIn"
            ],
            "channels": [
              "online",
              "delivery",
              "kiosk",
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "ready-to-collect",
                "transition": "done"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "One screen (two bumps)",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "ready-to-collect",
                "transition": "done"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "ready-to-collect",
                "to": "collected",
                "transition": "anyToCollected"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "One screen (one bump)",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production",
              "ready-for-bagging"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "ready-to-collect",
                "transition": "done"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "Kitchen Screen",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "in-production",
                "transition": "prepare"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "in-production",
                "to": "ready-to-collect",
                "transition": "done"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "Front of House",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect"
            ],
            "status": [
              "confirmed",
              "in-production",
              "ready-for-bagging",
              "ready-to-collect",
              "collected"
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
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "confirmed",
                "to": "in-production",
                "transition": "prepare"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "in-production",
                "to": "ready-to-collect",
                "transition": "done"
              },
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "ready-to-collect",
                "to": "collected",
                "transition": "collect"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            },
            "kitchenStations": []
          }
        },
        {
          "name": "Finished Orders",
          "config": {
            "layout": "flex",
            "autoPrintConfigRef": "off",
            "manualPrintTemplate": "allInOne",
            "bundleStatus": [
              "collected"
            ],
            "status": [
              "collected",
              "ready-to-collect",
              "ready-for-bagging",
              "in-production",
              "confirmed"
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
              "deliveroo",
              "uberEats",
              "justEat"
            ],
            "displayDetails": [
              "ORDER_NUMBER",
              "ORDER_TABLE_NUMBER",
              "ORDER_SEATS",
              "ORDER_PICKUP_TIME",
              "ORDER_UPDATED_AT",
              "ORDER_TYPE",
              "ORDER_NOTE",
              "ORDER_CHANNEL",
              "ORDER_BRAND",
              "CUSTOMER_NAME",
              "CUSTOMER_DELIVERY_NOTE",
              "CUSTOMER_DELIVERY_STATUS",
              "BUNDLE_NOTE",
              "BUNDLE_LIST",
              "BUNDLE_ITEMS",
              "ORDER_PRINT_BUTTON"
            ],
            "bumpActions": [
              {
                "trigger": "SINGLE_CLICK",
                "type": "bundle",
                "from": "collected",
                "to": "confirmed",
                "transition": "anyToConfirmed"
              }
            ],
            "theme": {
              "bundle": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              },
              "header": {
                "in-production": {
                  "color": "#728FCE"
                },
                "ready-for-bagging": {
                  "color": "#FAF884"
                },
                "ready-to-collect": {
                  "color": "#50C878"
                },
                "collected": {
                  "color": "#F8B88B"
                }
              }
            },
            "sound": {
              "duration": 8,
              "url": "https://s3.eu-west-1.amazonaws.com/multitenant.vmos-static.com/339812__inspectorj__hand-bells-e-single.mp3"
            },
            "bundleSorting": {
              "groupExactBundles": true,
              "groupByDeals": false,
              "pipe": [
                "sortByKitchenStation"
              ]
            },
            "ticketSorting": {
              "pipe": [
                [
                  "",
                  {
                    "sortBy": {
                      "key": "fireTime",
                      "direction": "ascending"
                    }
                  }
                ]
              ]
            },
            "timeRange": {
              "to": 720,
              "from": 720,
              "type": "relative"
            }
          }
        }
      ]
  };

export default posKitchenScreens;