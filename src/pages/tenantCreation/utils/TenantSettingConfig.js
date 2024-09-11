import { getSelectedEnvironment } from '../../../utils/environmentUtils'; // You may need to create this utility file
import posKitchenScreens from '../posSettings/kitchenScreens';
import pos2config from '../posSettings/config';
import basketActions from '../posSettings/basketActions';
import autoPrintConfigs from '../posSettings/autoPrintConfigs';
import printTemplateMapping from '../posSettings/printTemplateMapping';
import cashManagement from '../posSettings/cashManagement';
import fireEvents from '../posSettings/fireEvents';
import remoteDebug from '../posSettings/remoteDebug';
import openOrders from '../posSettings/openOrders';
import serviceCharge from '../posSettings/serviceCharge';
import floorPlan from '../posSettings/floorPlan';

const TenantSettingConfig = {
  // Define host suffixes based on the environment
  hostSuffixes: {
    'feature-branch': 'vmos-qa.com',
    'demo': 'demo-demo.com',
    'live': 'vmos.io'
  },

  // Helper function to get the correct host suffix
  getHostSuffix: () => {
    const selectedEnvironment = getSelectedEnvironment();
    return TenantSettingConfig.hostSuffixes[selectedEnvironment] || TenantSettingConfig.hostSuffixes['feature-branch'];
  },

  tenantSettings: async (formData) => {
    const currencyConfig = await TenantSettingConfig.currencyConfig(formData);
    const stockMgmtConfig = await TenantSettingConfig.stockManagementConfigs(formData);
    const refundReasons = await TenantSettingConfig.refundReasons();
    const hubFeatures = await TenantSettingConfig.hubFeatures();
    const storeSelectors = await TenantSettingConfig.storeSelectors(formData);
    const geocode = await TenantSettingConfig.geocodeConfig();
    const displayLawText = await TenantSettingConfig.displayLawText();
    const checkoutNameField = await TenantSettingConfig.checkoutNameField();
    const checkoutPhoneNumber = await TenantSettingConfig.checkoutPhoneNumber();
    const googleMapsValue = await TenantSettingConfig.googleMapsValue();
    const preorderCopyrightEnabled = await TenantSettingConfig.preorderCopyrightEnabled();
    const additionalInformation = await TenantSettingConfig.additionalInformation();
    const reportingFeatures = await TenantSettingConfig.reportingFeatures();
    const reportingDashboardActions = await TenantSettingConfig.reportingDashboardActions();

    const hostSuffix = TenantSettingConfig.getHostSuffix();

    const settings = [
      {"name": "allergens.disclaimer.enabled", "value": "1", "uuid":"1c51b708-2105-11ea-b645-06dea2640edc"},
      {"name": "app.webUrl", "value": `${formData.hostName}.${hostSuffix}`, "uuid":"bd18ada4-2e73-404c-bc0a-1365ff6f4989"},
      {"name": "basket.show.customizations", "value": "1", "uuid":"04520d1e-2bcc-11ea-975d-06dea2640edc"},
      {"name": "checkout.additionalInformation", "value": additionalInformation, "uuid":"545fa580-c4cb-4609-9e00-18b0f41e4dfd"},	
      {"name": "checkout.name.field", "value": checkoutNameField, "uuid":"c7d25a8f-4c8c-4cd3-a1b3-d333e20a4d63"},	
      {"name": "currency", "value": currencyConfig, "uuid":"4422e7a4-c3b1-47b8-b52a-a99fa94cecea"},
      {"name": "epos.stockManagement.configs", "value": stockMgmtConfig, "uuid":"b7288a11-ca85-4949-86c5-53d9a4ee5f06" },
      {"name": "email.feedback", "value": formData.feedbackEmail, "uuid":"1f24fa5d-2339-4c29-a1b9-c8833f8a194a" },
      {"name": "geocode", "value": geocode, "uuid":"7a26c464-8e99-43de-a2b5-3a4a45f5468d" },
      {"name": "geolocation.key", "value": "3d337da0-0663-11ec-adaf-25182c8a4cfb", "uuid":"bd61ecac-6f43-11ea-af29-06dea2640edc" },
      {"name": "googleMaps", "value": googleMapsValue, "uuid":"006257dc-1363-4a5c-813a-7aa866d5dd72" },
      {"name": "kds.refundReasons", "value": refundReasons, "uuid":"b5926852-b119-4c54-8bbe-a7e9f4368489" },
      {"name": "kiosk.discounts.enabled", "value": "1", "uuid":"d4455391-3c4b-4e40-9adf-f238135a059e" },
      {"name": "locale", "value": formData.country, "uuid":"10cacb6b-4bec-48bc-b36c-4a20b2cfacf4" },
      {"name": "menu.hours.channel.enabled", "value": "1", "uuid":"cf281983-9880-4aae-9509-eb46bf5c3af4" },
      {"name": "mp2.reporting.features", "value": reportingFeatures, "uuid":"65094b34-9df5-4df1-bcb8-558672546044" },
      {"name": "mp2.reporting.dashboardActions", "value": reportingDashboardActions, "uuid":"b00adcde-9d52-4493-ab85-d424426a9840" },
      {"name": "nutrition.displayLawText", "value": displayLawText, "uuid":"1211ab43-055e-4063-91e9-477f83195a5d" },
      {"name": "nutrition.displayServingsLabel", "value": "1", "uuid":"95fac0e9-93cf-4e9e-8358-3e239eeb7fc9" },
      {"name": "nutrition.excludeUpsellEnergy", "value": "1", "uuid":"069cbd8a-4108-4ad3-8f45-48e2415bcd3b" },
      {"name": "checkout.phone.number", "value": checkoutPhoneNumber, "uuid":"d7424ce6-776c-40f5-913e-1161236b93c1" },
      {"name": "order.takeaway.default", "value": "1", "uuid":"17a4bd9e-0a5b-4e08-a85a-9e3a5573d81a" },
      {"name": "phoenix.hubFeaturesAccess", "value": hubFeatures, "uuid":"75e5db0f-2708-4ef1-9e4e-dd210b5879eb" },
      {"name": "phone.prefix", "value": TenantSettingConfig.countryCodes[formData.country], "uuid":"84f9f736-0943-4c91-9169-abc51b24ae97" },
      {"name": "preorder.copyright.enabled", "value": preorderCopyrightEnabled, "uuid":"5d94ba72-229c-449c-8530hgjhwgjhwgjhs" },
      {"name": "preorder.discounts.enabled", "value": "1", "uuid":"9d2d2528-04b4-11aa-b645-06dea2640edc" },
      {"name": "storeSelection.selectors", "value": storeSelectors, "uuid":"f8b4cadc-5154-48f2-b96c-9e11c6573b7f" },
      {"name": "stockManagement.displayOnFrontend", "value": "1", "uuid":"ec81e0c7-6a4c-4002-9ace-fa5a57057547" },
      {"name": "timezone", "value": TenantSettingConfig.timeZones[formData.country], "uuid":"a652fbea-259f-42f9-aacb-6c1a2d790b9c" },
      {"name": "vat.rate.eatIn", "value":"20", "uuid":"01b51e0e-c81b-4d2e-87f3-90ee2b053520" },
      {"name": "vat.rate.takeaway", "value": "20", "uuid":"5a082bce-201d-4edd-94af-f0418e275b4a" }		
    ];

    if (formData.pos) {
        settings.push({
            name: "pos2.config",
            uuid: "5a9888f9-4d96-470f-be4e-971ad951273a",
            value: JSON.stringify(pos2config[formData.posType])
        });
        settings.push({
          name: "pos2.kitchenScreens",
          uuid: "964defda-59cf-42a6-9923-f60efa5fd532",
          value: JSON.stringify(posKitchenScreens[formData.posType])
        });
        settings.push({
          name: "pos2.basketActions",
          uuid: "cdbd58eb-b854-4bd3-add6-92695f6a755a",
          value: JSON.stringify(basketActions[formData.posType])
        });
        settings.push({
          name: "pos2.autoPrintConfigs",
          uuid: "d201e61f-e4a5-4fa7-935a-b4dcf2189840",
          value: JSON.stringify(autoPrintConfigs[formData.posType])
        });
        settings.push({
          name: "pos2.printTemplateMapping",
          uuid: "5bb703df-e8a0-4a32-afc1-0d372bf12da5",
          value: JSON.stringify(printTemplateMapping[formData.posType])
        });
        settings.push({
          name: "pos2.cashManagement",
          uuid: "cbf2b95f-7ca8-47e8-af81-4a88094cfe56",
          value: JSON.stringify(cashManagement[formData.posType])
        });
        settings.push({
          name: "pos.improvedOrderStateMachine",
          uuid: "33aafa70-8887-4bf3-818c-49183b9c3b09",
          value: "1"
        });
        settings.push({
          name: "fireEvents",
          uuid: "51888485-40af-4629-b407-0392afc4a5d4",
          value: JSON.stringify(fireEvents[formData.posType])
        });
        settings.push({
          name: "pos2.remoteDebug",
          uuid: "f1ea537a-001d-4343-b65b-1a5334a84073",
          value: JSON.stringify(remoteDebug[formData.posType])
        });
        settings.push({
          name: "kds.screens.settings",
          uuid: "d4584aa9-b918-4dab-884f-1def2d79bc07",
          value: "0"
        });
        settings.push({
          name: "pos2.standAlone",
          uuid: "630e8282-2b80-422f-ba02-1e4feb14d748",
          value: "1"
        });
    }

    if (formData.pos && formData.posType === 'FSR') {
        settings.push({
          name: "order.openOrders",
          uuid: "bbf31924-e61e-4278-88b4-fd8e99c66e11",
          value: JSON.stringify(openOrders[formData.posType])
        });
        settings.push({
          name: "optional.service.charge",
          uuid: "140adc4b-e72e-497a-8181-ccd6dfdd91fc",
          value: JSON.stringify(serviceCharge[formData.posType])
        });
        settings.push({
          name: "pos2.floorPlan",
          uuid: "c6e97fcd-10bc-47ee-8fa2-d7489d288559",
          value: JSON.stringify(floorPlan[formData.posType])
        });
        settings.push({
          name: "pos2.offlineMode",
          uuid: "194c05d8-d000-47a7-97a3-89279ec48324",
          value: "1"
        });
    }

    return settings;
  },
  
  kioskTenantSettings: async () => {
    return [
      {"name": "kiosk.largeScreen.sidenav", "value": "1", "uuid":"3ddee97e-93c0-4b8d-8199-8121ed13e52d" },
      {"name": "kiosk.order-confirmation.timeout", "value": "10000", "uuid":"ade476fa-20b9-4d99-8828-aab8c3fdc2c0" }		
    ];
  },
  
  opatTenantSettings: async () => {
    const serviceCharge = await TenantSettingConfig.serviceCharge();
    return [
      {"name": "optional.service.charge", "value": serviceCharge, "uuid":"140adc4b-e72e-497a-8181-ccd6dfdd91fc" }		
    ];
  },
  
  countryCodes: {
    "UK": "44",
    "Germany": "49",
    "Belgium": "32",
    "France": "33",
    "Ireland": "353"
  },
  
  timeZones: {
    "UK": "Europe/London",
    "Germany": "Europe/Berlin",
    "Belgium": "Europe/Brussels",
    "France": "Europe/Paris",
    "Ireland": "Europe/Dublin"
  },
  
  allChannels: ['opat', 'online', 'kiosk', 'delivery', 'pos', 'uberEats', 'deliveroo', 'justEat'],
  
  reportingFeatures: async () => {
    return JSON.stringify({"search":"0","liveboards":"1","answers":"0"});
  },
  
  reportingDashboardActions: async () => {
    return JSON.stringify({"visibleActions":["Action.AddToFavorites","Action.CrossFilter","Action.Download","Action.DownloadAsCsv","Action.DownloadAsPdf","Action.DownloadAsPng","Action.DownloadAsXLSX","Action.DrillExclude","Action.DrillInclude","Action.Subscription","Action.SchedulesList","Action.DrillDown","Action.Explore","Action.AxisMenuSort","Action.AxisMenuTimeBucket"]});
  },
  
  storeSelectors: async (formData) => {
    let storeSelectors = [];
    if (formData.online) {
      storeSelectors.push({
        "type": "online",
        "enabled": true,
        "default": true
      });
    } else {
      storeSelectors.push({
        "type": "online",
        "enabled": false
      });
    }
    if (formData.delivery) {
      storeSelectors.push({
        "type": "delivery",
        "enabled": true
      });
    } else {
      storeSelectors.push({
        "type": "delivery",
        "enabled": false
      });
    }
    storeSelectors.push({
      "type": "opat",
      "enabled": false
    });
    return JSON.stringify(storeSelectors);
  },
  
  stockManagementConfigs: async (formData) => {
    let disabledAppTypes = [];
    for (const channel of TenantSettingConfig.allChannels) {
      if (formData[channel]) { continue; }
      disabledAppTypes.push(channel);
    }
    return JSON.stringify({"disabledAppTypes": disabledAppTypes});
  },
  
  geocodeConfig: async () => {
    return JSON.stringify({"enabled": 1});
  },
  
  serviceCharge: async () => {
    return JSON.stringify({
      "opat": {"options": [12.5, 10, 5, 0],
        "default": 12.5
      }
    });
  },
  
  additionalInformation: async () => {
    return JSON.stringify({"delivery": true, "online": false, "opat": false, "kiosk": false});
  },
  
  currencyConfig: async (formData) => {
    return JSON.stringify({
      "code": formData.currency,
      "sign": getCurrencySign(formData.currency)
    });
  },
  
  displayLawText: async () => {
    return JSON.stringify({"menuCategory": 1, "mealDetails": 0});
  },
  
  preorderCopyrightEnabled: async () => {
    return JSON.stringify({"name": "Vita Mojo", "text": "Powered by", "link": "#"});
  },
  
  checkoutPhoneNumber: async () => {
    return JSON.stringify({"delivery": "mandatory"});
  },
  
  checkoutNameField: async () => {
    return JSON.stringify({
      "delivery": true,
      "online": false,
      "opat": false
    });
  },
  
  hubFeatures: async () => {
    return JSON.stringify({
      "stores": true,
      "menus": true,
      "integrationsHub": false,
      "thoughtSpot": true
    });
  },
  
  googleMapsValue: async () => {
    return JSON.stringify({"enabled": false, "key": "AIzaSyAIJSdgMUOrTFqovLjauCn3BMnC6TwLpd8"});
  },
  
  refundReasons: async () => {
    return JSON.stringify([
      { "name": "fraud", "label": "Fraud" },
      { "name": "complaint", "label": "Customer Complaint" },
      { "name": "kindness", "label": "Kindness" },
      { "name": "missing", "label": "Missing" },
      { "name": "technicalIssue", "label": "Technical Issue" },
      { "name": "discount", "label": "Discount" },
      { "name": "other", "label": "Other (provide more details)" }
    ]);
  },
};

const getCurrencySign = (currencyCode) => {
  const currencySigns = {
    GBP: '£',
    EUR: '€',
    USD: '$'
    // Add more currency codes and signs as needed
  };
  return currencySigns[currencyCode] || currencyCode;
};

export default TenantSettingConfig;