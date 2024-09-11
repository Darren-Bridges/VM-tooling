const basketActions = {
    FSR: {
        "basketHeader": [
          {
            "action": "TAKEAWAY_EAT_IN_TOGGLE",
            "enabled": true,
            "properties": {
              "toggleOptions": {
                "takeaway": {
                  "label": "ORDER_TYPE_TAKEAWAY",
                  "icon": "logout"
                },
                "eatIn": {
                  "label": "ORDER_TYPE_EATIN",
                  "icon": "restaurant"
                }
              }
            }
          },
          {
            "action": "EDIT_TABLE_NUMBER",
            "enabled": true,
            "enabledWhen": {
              "orderType": "eatIn"
            },
            "properties": {
              "label": "TABLE_NUMBER",
              "title": "Add Table to Order"
            }
          },
          {
            "action": "EDIT_ORDER_NOTE",
            "enabled": true,
            "properties": {
              "icon": "event_note",
              "label": "ORDER_NOTE"
            }
          },
          {
            "action": "EDIT_SERVICE_CHARGE",
            "enabled": true,
            "enabledWhen": {
              "orderType": "eatIn"
            },
            "properties": {
              "label": "SERVICE_CHARGE"
            }
          }
        ],
        "actionsDialog": [
          {
            "action": "ADD_LOYALTY_MEMBER",
            "enabled": true,
            "properties": {
              "label": "REGISTER_ACTIONS_ADD_CUSTOMER",
              "icon": "person_add"
            }
          },
          {
            "action": "BULK_EDIT",
            "enabled": true,
            "properties": {
              "label": "Bulk Void/Comp",
              "icon": "edit"
            }
          },
          {
            "action": "CLEAR_BASKET",
            "enabled": true,
            "properties": {
              "label": "REGISTER_ACTIONS_CLEAR_BASKET"
            }
          },
          {
            "action": "TRANSFER_MEALS",
            "enabled": true,
            "properties": {
              "label": "TRANSFER_MEALS_ACTION"
            }
          },
          {
            "action": "EDIT_ORDER_NOTE",
            "enabled": true,
            "properties": {
              "label": "ORDER_NOTE",
              "icon": "event_note"
            }
          },
          {
            "action": "EDIT_SERVICE_CHARGE",
            "enabled": true,
            "properties": {
              "label": "SERVICE_CHARGE"
            }
          },
          {
            "action": "RESTART_ORDER",
            "enabled": true,
            "properties": {
              "label": "Restart Order"
            }
          }
        ]
      },
    QSR: {
        "basketHeader": [
          {
            "action": "TAKEAWAY_EAT_IN_TOGGLE",
            "enabled": true,
            "properties": {
              "toggleOptions": {
                "takeaway": {
                  "label": "ORDER_TYPE_TAKEAWAY",
                  "icon": "logout"
                },
                "eatIn": {
                  "label": "ORDER_TYPE_EATIN",
                  "icon": "restaurant"
                }
              }
            }
          },
          {
            "action": "EDIT_TABLE_NUMBER",
            "enabled": true,
            "enabledWhen": {
              "orderType": "eatIn"
            },
            "properties": {
              "label": "TABLE_NUMBER",
              "title": "Add Table to Order"
            }
          },
          {
            "action": "EDIT_ORDER_NOTE",
            "enabled": true,
            "properties": {
              "icon": "event_note",
              "label": "ORDER_NOTE"
            }
          },
          {
            "action": "EDIT_SERVICE_CHARGE",
            "enabled": true,
            "enabledWhen": {
              "orderType": "eatIn"
            },
            "properties": {
              "label": "SERVICE_CHARGE"
            }
          }
        ],
        "actionsDialog": [
          {
            "action": "ADD_LOYALTY_MEMBER",
            "enabled": true,
            "properties": {
              "label": "REGISTER_ACTIONS_ADD_CUSTOMER",
              "icon": "person_add"
            }
          },
          {
            "action": "CLEAR_BASKET",
            "enabled": true,
            "properties": {
              "label": "REGISTER_ACTIONS_CLEAR_BASKET"
            }
          },
          {
            "action": "EDIT_ORDER_NOTE",
            "enabled": true,
            "properties": {
              "label": "ORDER_NOTE",
              "icon": "event_note"
            }
          },
          {
            "action": "EDIT_ORDER_PHONE",
            "enabled": true,
            "properties": {
              "label": "ORDER_PHONE",
              "icon": "event_note"
            }
          },
             {
            "action": "RESTART_ORDER",
            "enabled": true,
            "properties": {
              "label": "Restart Order"
            }
          }
        ]
      }
};

export default basketActions;