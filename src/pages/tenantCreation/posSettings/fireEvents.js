const fireEvents = {
    FSR: [
        {
          "countFromPickupTime": true,
          "match": {
            "sources": [
              "delivery",
              "online"
            ]
          },
          "fireTime": [
            {
              "amount": [
                0,
                20
              ],
              "value": 15
            },
            {
              "amount": [
                20,
                50
              ],
              "value": 20
            },
            {
              "amount": [
                50
              ],
              "value": 30
            }
          ]
        },
        {
          "countFromPickupTime": false,
          "match": {
            "sources": [
              "pos"
            ]
          },
          "fireTime": [
            {
              "value": 0
            }
          ]
        }
      ],
    QSR: [
        {
          "countFromPickupTime": true,
          "match": {
            "sources": [
         "deliveroo",
              "uberEats",
              "justEat",
              "delivery",
              "online"
            ]
          },
          "fireTime": [
            {
              "amount": [
                0,
                20
              ],
              "value": 15
            },
            {
              "amount": [
                20,
                50
              ],
              "value": 20
            },
            {
              "amount": [
                50
              ],
              "value": 30
            }
          ]
        }
      ]
};

export default fireEvents;