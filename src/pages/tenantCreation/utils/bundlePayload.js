export function guid() {
    let d = new Date().getTime();
    if (
      typeof performance !== 'undefined' &&
      typeof performance.now === 'function'
    ) {
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  export function getBundlePayload(bundleName, bundlePrice) {
    const modifierUuid = guid();
    
    const payload = {
      "name": bundleName || "Test name",
      "isPrintable": true,
      "kitchenTicketName": bundleName || "Test kitchen ticket",
      "description": "<p>Test description</p>\n",
      "onlineDescription": "<p>Test short description</p>\n",
      "taxExempt": false,
      "meta": {
        "hasUpsellMealDeal": false,
        "hasMultipleSizes": false,
        "hasBase": false,
        "hasCategories": false,
        "showPriceAsPriceFrom": false
      },
      "hasEatInPrice": false,
      "upsellModalTitle": "",
      "upsellModalDescription": "",
      "upsellDeals": [],
      "hideFromOwnUpsellToDeal": false,
      "quantityLimit": null,
      "upsellCategories": [],
      "kitchenStation": {},
      "showFullPriceOnSize": false,
      "showFullCaloriesOnSize": false,
      "excludeFromServiceCharge": false,
      "upsellText": null,
      "externalCategory": {},
      "itemTypes": [
        {
          "name": "base item type",
          "minRestriction": 0,
          "maxRestriction": 1,
          "sortOrder": 9999,
          "items": [
            {
              "taxExempt": false,
              "ingredients": "",
              "servings": null,
              "nutritionalMeta": {},
              "itemModifiers": [
                {
                  "modifier": {
                    "uuid": "de9c5cd2-ba44-4f63-9d81-131a09f4846f",
                    "name": "Fixed",
                    "meta": null,
                    "slug": "size",
                    "value": "de9c5cd2-ba44-4f63-9d81-131a09f4846f",
                    "label": "Fixed"
                  },
                  "meta": {
                    "defaultValue": modifierUuid
                  },
                  "itemModifierOptions": [
                    {
                      "uuid": modifierUuid,
                      "meta": {
                        "value": "",
                        "name": "",
                        "increments": 1
                      },
                      "price": bundlePrice ? bundlePrice.toString() : "5",
                      "measurementUnit": {
                        "unit": {
                          "slug": "weight_g",
                          "name": "grams"
                        },
                        "name": null,
                        "value": null
                      },
                      "priceEatIn": null
                    }
                  ]
                }
              ],
              "name": "base item",
              "taxRate": null,
              "sortOrder": 0,
              "allergens": [],
              "taxRateEatIn": null,
              "isPreselected": true,
              "type": "BUNDLE_BASE",
              "integrationReferences": [
                {
                  "integration": "",
                  "plu": ""
                }
              ],
              "diets": []
            }
          ]
        }
      ],
      "menus": [],
      "tags": []
    };

    return payload;
  }

