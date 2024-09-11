import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import TenantSettingConfig from '../utils/TenantSettingConfig';
import StoreSettingConfig from '../utils/StoreSettingConfig';
import ConfigVariables from '../utils/ConfigVariables';
import './Spinner.css';
import { getBundlePayload } from '../utils/bundlePayload';


const InputField = ({ label, name, type = 'text', value, onChange, placeholder, suffix, error, noSymbolsOrSpaces = false }) => (
    <div className="relative">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
        </label>
        <div className="flex items-center">
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`input flex-grow ${error ? 'border-red-500' : ''}`}
                onKeyPress={noSymbolsOrSpaces ? (e) => {
                    if (!/[a-zA-Z0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                } : undefined}
            />
            {suffix && <span className="ml-2 text-gray-600 dark:text-gray-400">{suffix}</span>}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

const ToggleSwitch = ({ label, name, checked, onChange }) => (
    <label htmlFor={name} className="flex items-center cursor-pointer">
        <div className="relative">
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-linear-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${checked ? 'transform translate-x-6' : ''}`}></div>
        </div>
        <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
            {label}
        </div>
    </label>
);


// Add this constant at the top of your file, outside of the component
const CHANNEL_UUIDS = {
    pos: "db1e8350-dc27-4ab5-8871-bd1631a63469",
    kiosk: "fe2d668c-6c8d-4321-adf0-36e0cddbbee5",
    delivery: "c3646733-4fd2-4dfa-9b03-8c0d3f2d2d0f",
    opat: "05a01e44-a8ec-47dc-ba6f-0e1f76b41079",
    online: "0d866cac-8597-4c22-95f1-82e1d27be211",
    uberEats: "b6b997a7-e482-11eb-9486-0676c9cc7839",
    deliveroo: "b6ba3489-e482-11eb-9486-0676c9cc7839",
    justEat: "b6ba366e-e482-11eb-9486-0676c9cc7839"
};

const defaultFeatureFlags = [
    { "name": "epos", "uuid": "3b77ab51-f1a8-4e27-ad2d-85434e88e80d" },
    { "name": "nutrition", "uuid": "9777c1ef-489f-4bf1-9cc6-42983de05451" },
    { "name": "mealv2", "uuid": "f04fba66-e385-11e9-86b7-0a2dad7ab1ae" },
    { "name": "store_management", "uuid": "89695183-7f1f-4c5e-aba6-59e638f28509" },
    { "name": "paperless-kds", "uuid": "b4142ff3-eb16-4e1b-892e-36c1e7ea5c04" },
    { "name": "redash_reports", "uuid": "e4142ff3-eb16-4e1b-892e-36c1e7ea5c04" },
    { "name": "email.templates.v2", "uuid": "1822c313-3a98-4525-a10f-169402f23140" },
    { "name": "new_kds_display_logic", "uuid": "0362056a-c8f0-4f4e-ad36-88f0f8e10207" },
    { "name": "discount", "uuid": "7985e3fb-22ab-4d47-a71e-87600d1c3587" },
    { "name": "metabase", "uuid": "300ed357-392a-11eb-903b-0676c9cc7839" },
    { "name": "promo_banner", "uuid": "f39c95a8-df11-4a27-a88f-df23a25ed692" },
    { "name": "vatCalculationV2", "uuid": "a785b9a7-5345-4ace-a56b-aeb76f8812f4" },
    { "name": "printV2", "uuid": "c018a5c8-629c-41bf-9efb-01a0abfba3c8" },
    { "name": "itemRefund", "uuid": "b4be75cc-24fb-4c49-89e1-86f25bfb5ea9" }
];


const NewTenantCreationWizard = () => {
    const [formData, setFormData] = useState({
        tenantName: '',
        tenantAlias: '',
        hostName: '',
        tenantDescription: '',
        adminFirstName: '',
        adminLastName: '',
        adminEmail: '',
        adminPassword: '',
        storeName: '',
        storeSlug: '',
        storeAddress: '',
        latitude: '',
        longitude: '',
        storeEmail: '',
        opat: false,
        online: false,
        kiosk: false,
        delivery: false,
        pos: false,
        posType: '',
        deliveroo: false,
        uberEats: false,
        justEat: false,
        country: '',
        currency: '',
        feedbackEmail: '',
        bundleName: '',
        bundlePrice: ''
    });

    const [errors, setErrors] = useState({});
    const [apiResponses, setApiResponses] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Add this line to get the selected environment
    const selectedEnvironment = localStorage.getItem('selected-environment') || 'feature-branch';

    // Define host suffixes based on the environment
    const hostSuffixes = {
        'feature-branch': 'pos2-next.vmos-qa.com',
        'demo': 'vmos-demo.com',
        'live': 'vmos.io'
    };

    const getHostSuffix = () => hostSuffixes[selectedEnvironment] || hostSuffixes['feature-branch'];

    // Define baseUrl based on the selected environment
    const baseUrls = {
        'feature-branch': 'https://pos2-next.vmos-qa.com/',
        'demo': 'https://vmos2.vmos-demo.com/',
        'live': 'https://vmos2.vmos.io/'
    };
    const baseUrl = baseUrls[selectedEnvironment] || baseUrls['feature-branch'];

    // Function to get a friendly name for the environment
    const getEnvironmentName = (env) => {
        switch (env) {
            case 'feature-branch':
                return 'Feature Branch';
            case 'demo':
                return 'Demo';
            case 'live':
                return 'Live';
            default:
                return 'Unknown Environment';
        }
    };


    // Add this function after the existing imports
    const formatSlackMessage = (formData, apiResponses) => {
        const statusEmoji = {
            success: ':white_check_mark:',
            partial: ':warning:',
            error: ':x:'
        };

        const overallStatus = apiResponses.every(r => r.status >= 200 && r.status < 300)
            ? 'success'
            : apiResponses.every(r => r.status >= 400 || r.status === 'Error')
                ? 'error'
                : 'partial';

        const sections = [
            'Tenant Creation',
            'Host Creation',
            'Admin User Creation',
            'Store Creation',
            'Menu Creation',
            'Feature Flags',
            'Channel Creation',
            'Tenant Settings',
            'Store Settings',
            'Bundle Creation'
        ];

        const sectionStatuses = sections
            .filter(section => apiResponses.some(r => r.name.includes(section)))
            .map(section => {
                const sectionResponses = apiResponses.filter(r => r.name.includes(section));
                const status = sectionResponses.every(r => r.status >= 200 && r.status < 300)
                    ? 'success'
                    : sectionResponses.every(r => r.status >= 400 || r.status === 'Error')
                        ? 'error'
                        : 'partial';
                return `${statusEmoji[status]} ${section}`;
            });

        // Collect failed responses
        const failedResponses = apiResponses.filter(r => r.status >= 400 || r.status === 'Error');
        const failedResponsesText = failedResponses.map(r => 
            `*${r.name}*\nStatus: ${r.status}\nError: ${JSON.stringify(r.data)}`
        ).join('\n\n');

        const blocks = [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `${statusEmoji[overallStatus]} *New Tenant Created*\n*Tenant Name:* ${formData.tenantName}\n*Host:* ${formData.hostName}.${getHostSuffix()}\n*Environment:* ${getEnvironmentName(localStorage.getItem('selected-environment') || 'feature-branch')}`
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    
                    text: "*Creation Summary:*\n" + sectionStatuses.join("\n")
                }
            }
        ];

        // Add failed responses block if there are any
        if (failedResponses.length > 0) {
            blocks.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*<@U040C6S3DPX> Failed Responses:*\n" + failedResponsesText
                }
            });
        }

        return { blocks };
    };

    // Add this function after the formatSlackMessage function
    const sendSlackMessage = async (message) => {
        const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

        if (!SLACK_WEBHOOK_URL) {
            console.error('Slack webhook URL is not set');
            return;
        }

        try {
            const response = await fetch(SLACK_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    //'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: 'New Tenant Creation Summary',
                    blocks: message.blocks,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Message sent to Slack successfully');
        } catch (error) {
            console.error('Error sending message to Slack:', error);
        }
    };


    const generateRandomPassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => {
            let newValue = type === 'checkbox' ? checked : value;

            // Sanitize input for tenantHost and storeSlug
            if (name === 'tenantHost' || name === 'storeSlug') {
                newValue = newValue.toLowerCase().replace(/[^a-z0-9]/g, '');
            }

            const newState = {
                ...prevState,
                [name]: newValue
            };

            // If tenantName is being changed, update related fields
            if (name === 'tenantName') {
                const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9]/g, '');
                newState.tenantAlias = sanitizedValue;
                newState.hostName = sanitizedValue;
                newState.tenantDescription = value;

                // Set admin details when tenantName has a value
                if (value) {
                    newState.adminFirstName = 'Admin';
                    newState.adminLastName = value;
                    newState.adminEmail = `admin@${sanitizedValue}.dev`;
                    newState.adminPassword = generateRandomPassword();
                }
            }

            // If storeName is being changed, update storeEmail
            if (name === 'storeName') {
                const sanitizedStoreName = value.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (sanitizedStoreName) {
                    newState.storeEmail = `${sanitizedStoreName}@vitamojo.com`;
                }
            }

            // If country changes, update the currency
            if (name === 'country') {
                switch (value) {
                    case 'UK':
                    case 'Ireland':
                        newState.currency = 'GBP';
                        break;
                    case 'Germany':
                    case 'Belgium':
                    case 'France':
                        newState.currency = 'EUR';
                        break;
                    default:
                        newState.currency = '';
                }
            }

            // If POS is unchecked, reset posType
            if (name === 'pos' && !checked) {
                newState.posType = '';
            }

            return newState;
        });
        // Clear the error for this field when it's changed
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Check for required fields
        Object.keys(formData).forEach(key => {
            if (typeof formData[key] === 'string' && !formData[key].trim()) {
                newErrors[key] = 'This field is required';
            }
        });

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.adminEmail && !emailRegex.test(formData.adminEmail)) {
            newErrors.adminEmail = 'Invalid email format';
        }
        if (formData.storeEmail && !emailRegex.test(formData.storeEmail)) {
            newErrors.storeEmail = 'Invalid email format';
        }
        if (formData.feedbackEmail && !emailRegex.test(formData.feedbackEmail)) {
            newErrors.feedbackEmail = 'Invalid email format';
        }

        // Validate longitude and latitude
        const coordRegex = /^-?([0-9]*[.])?[0-9]+$/;
        if (formData.latitude && !coordRegex.test(formData.latitude)) {
            newErrors.latitude = 'Must be a valid number';
        }
        if (formData.longitude && !coordRegex.test(formData.longitude)) {
            newErrors.longitude = 'Must be a valid number';
        }

        if (formData.pos && !formData.posType) {
            newErrors.posType = 'Please select a POS type';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const makeAuthenticatedRequest = async (url, options) => {
        let accessToken = localStorage.getItem('access-token');

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 401) {
                // Token might be expired, try to refresh
                const refreshToken = localStorage.getItem('refresh-token');
                const selectedEnvironment = localStorage.getItem('selected-environment');
                const baseUrls = {
                    'feature-branch': 'https://pos2-next.vmos-qa.com/',
                    'demo': 'https://vmos2.vmos-demo.com/',
                    'live': 'https://vmos2.vmos.io/'
                };
                const baseUrl = baseUrls[selectedEnvironment] || baseUrls['feature-branch'];

                const refreshResponse = await fetch(`${baseUrl}user/v1/auth/refresh/${refreshToken}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (refreshResponse.ok) {
                    const refreshData = await refreshResponse.json();
                    const newAccessToken = refreshData.payload.token.value;

                    if (!newAccessToken) {
                        console.error('New access token is undefined');
                        throw new Error('Failed to obtain new access token');
                    }

                    localStorage.setItem('access-token', newAccessToken);
                    console.log('New access token stored:', newAccessToken);

                    // Retry the request with the new token
                    return fetch(url, {
                        ...options,
                        headers: {
                            ...options.headers,
                            'Authorization': `Bearer ${newAccessToken}`,
                        },
                    });
                } else {
                    console.error('Failed to refresh token:', await refreshResponse.text());
                    throw new Error('Unable to refresh token');
                }
            }

            return response;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    };

    const createMenus = async (tenantUuid) => {
        const menuUUIDs = {};
        const menuNames = ['Master'];

        for (const menuName of menuNames) {
            const menuSlug = menuName.toLowerCase();

            try {
                const createMenuResponse = await makeAuthenticatedRequest(`${baseUrl}catalog/management/menus`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'tenant': tenantUuid
                    },
                    body: JSON.stringify({
                        name: `${menuName} menu`,
                        description: `${menuName} menu description`,
                        displayName: `${menuName} menu`,
                        translations: [],
                        extTenantUUID: tenantUuid,
                        slug: menuSlug,
                        menuFormat: 'general'
                    }),
                });

                const createMenuData = await createMenuResponse.json();

                // Set the correct status based on the response
                const status = createMenuResponse.ok ? createMenuResponse.status : 'Error';

                setApiResponses(prevResponses => [...prevResponses, {
                    name: `Create ${menuName} Menu`,
                    status: status,
                    data: createMenuData
                }]);

                if (createMenuResponse.ok) {
                    menuUUIDs[menuName] = createMenuData.payload.uuid;
                    console.log(`${menuName} menu created successfully`);
                } else {
                    console.error(`Failed to create ${menuName} menu:`, createMenuData);
                }
            } catch (error) {
                console.error(`Error creating ${menuName} menu:`, error);

                setApiResponses(prevResponses => [...prevResponses, {
                    name: `Create ${menuName} Menu`,
                    status: 'Error',
                    data: error.message
                }]);
            }
        }

        return menuUUIDs;
    };

    const createMenuHours = async (tenantUuid, storeUuid, menuUUIDs) => {
        const selectedChannels = Object.entries(formData)
            .filter(([key, value]) => ['opat', 'online', 'kiosk', 'delivery', 'pos', 'deliveroo', 'uberEats', 'justEat'].includes(key) && value)
            .map(([key]) => {
                if (key === 'online') return 'online';
                if (key === 'pos') return 'pos';
                return key;
            });

        let menuHoursPayload = [];
        for (const channel of selectedChannels) {
            const menuName = ConfigVariables.channelMenuMap[channel];
            const menuUUID = menuUUIDs[menuName];
            for (let i = 1; i <= 5; i++) {
                menuHoursPayload.push({
                    channel: channel,
                    from: "11:00",
                    menuUUID: menuUUID,
                    to: "22:00",
                    weekdayId: i,
                });
            }
        }

        try {
            const createMenuHoursResponse = await makeAuthenticatedRequest(`${baseUrl}catalog/management/menuHours/store/${storeUuid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'tenant': tenantUuid
                },
                body: JSON.stringify(menuHoursPayload),
            });

            const createMenuHoursData = await createMenuHoursResponse.json();
            return { name: 'Menu Hours Creation', status: createMenuHoursResponse.status, data: createMenuHoursData };
        } catch (createMenuHoursError) {
            return { name: 'Menu Hours Creation', status: 'Error', data: createMenuHoursError.message };
        }
    };

    const getTenantSettings = async () => {
        let tenantSettings = await TenantSettingConfig.tenantSettings(formData);

        const countryCodes = {
            "UK": "44",
            "Germany": "49",
            "Belgium": "32",
            "France": "33",
            "Ireland": "353"
        };

        const timeZones = {
            "UK": "Europe/London",
            "Germany": "Europe/Berlin",
            "Belgium": "Europe/Brussels",
            "France": "Europe/Paris",
            "Ireland": "Europe/Dublin"
        };

        // Function to add or update a setting
        const addOrUpdateSetting = (name, value, uuid) => {
            const existingIndex = tenantSettings.findIndex(setting => setting.name === name);
            if (existingIndex !== -1) {
                tenantSettings[existingIndex].value = value;
            } else {
                tenantSettings.push({ name, value, uuid });
            }
        };

        // Add or update phone prefix setting
        const phonePrefix = countryCodes[formData.country] || '';
        addOrUpdateSetting("phone.prefix", phonePrefix, "84f9f736-0943-4c91-9169-abc51b24ae97");

        // Add or update timezone setting
        const timezone = timeZones[formData.country] || '';
        addOrUpdateSetting("timezone", timezone, "a652fbea-259f-42f9-aacb-6c1a2d790b9c");

        // Add or update currency setting
        const currencyValue = JSON.stringify({
            code: formData.currency,
            sign: formData.currency === 'GBP' ? '£' : '€'
        });
        addOrUpdateSetting("currency", currencyValue, "4422e7a4-c3b1-47b8-b52a-a99fa94cecea");

        if (formData.kiosk) {
            const kioskSettings = await TenantSettingConfig.kioskTenantSettings();
            kioskSettings.forEach(setting => {
                addOrUpdateSetting(setting.name, setting.value, setting.uuid);
            });
        }

        if (formData.opat) {
            const opatSettings = await TenantSettingConfig.opatTenantSettings();
            opatSettings.forEach(setting => {
                addOrUpdateSetting(setting.name, setting.value, setting.uuid);
            });
        }

        return tenantSettings;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);

            const { tenantName, tenantAlias, tenantDescription, hostName, adminFirstName, adminLastName, adminEmail, adminPassword, storeName, storeSlug, storeAddress, latitude, longitude, storeEmail, bundleName, bundlePrice } = formData;

            const selectedEnvironment = localStorage.getItem('selected-environment');
            const baseUrls = {
                'feature-branch': 'https://pos2-next.vmos-qa.com/',
                'demo': 'https://vmos2.vmos-demo.com/',
                'live': 'https://vmos2.vmos.io/'
            };

            const baseUrl = baseUrls[selectedEnvironment] || baseUrls['feature-branch'];

            const responses = [];
            let storeUuid; // Declare storeUuid at the beginning of handleSubmit

            try {
                // First request: Create tenant
                const tenantResponse = await makeAuthenticatedRequest(`${baseUrl}tenant/v1/tenants`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: tenantName,
                        alias: tenantAlias,
                        description: tenantDescription
                    }),
                });

                const tenantData = await tenantResponse.json();
                responses.push({ name: 'Tenant Creation', status: tenantResponse.status, data: tenantData });

                if (tenantResponse.status === 201) {
                    console.log('Tenant created successfully');

                    const tenantUuid = tenantData.payload.uuid;

                    // Second request: Create tenant host
                    try {
                        const hostResponse = await makeAuthenticatedRequest(`${baseUrl}tenant/v1/tenantHosts/many`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'tenant': tenantUuid
                            },
                            body: JSON.stringify([
                                {
                                    value: `${hostName}.${getHostSuffix()}`
                                }
                            ]),
                        });

                        const hostData = await hostResponse.json();
                        responses.push({ name: 'Host Creation', status: hostResponse.status, data: hostData });

                        if (!hostResponse.ok) {
                            console.error('Failed to create tenant host:', hostData);
                        }
                    } catch (hostError) {
                        responses.push({ name: 'Host Creation', status: 'Error', data: hostError.message });
                    }

                    // Third request: Clone diets
                    try {
                        const dietCloneResponse = await makeAuthenticatedRequest(`${baseUrl}catalog/management/diets/clone`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'tenant': tenantUuid
                            },
                            body: JSON.stringify({
                                sourceTenantUUID: "832b34ad-2608-4cc7-bee8-bfc47686d801",
                                destinationTenantUUID: tenantUuid
                            }),
                        });

                        const dietCloneData = await dietCloneResponse.json();
                        responses.push({ name: 'Diet Clone', status: dietCloneResponse.status, data: dietCloneData });

                        if (!dietCloneResponse.ok) {
                            console.error('Failed to clone diets:', dietCloneData);
                        }
                    } catch (dietCloneError) {
                        responses.push({ name: 'Diet Clone', status: 'Error', data: dietCloneError.message });
                    }

                    // Fourth request: Create admin user
                    try {
                        const createUserResponse = await makeAuthenticatedRequest(`${baseUrl}user/v1/management/user`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'tenant': tenantUuid
                            },
                            body: JSON.stringify({
                                role: {
                                    uuid: "98287263-e9f4-4ab8-8a26-d468527765ee",
                                    rank: 1,
                                    slug: "admin",
                                    name: "Admin"
                                },
                                active: true,
                                allStores: true,
                                profile: {
                                    firstName: adminFirstName,
                                    lastName: adminLastName
                                },
                                email: adminEmail,
                                password: adminPassword
                            }),
                        });

                        const createUserData = await createUserResponse.json();
                        responses.push({ name: 'Admin User Creation', status: createUserResponse.status, data: createUserData });

                        if (!createUserResponse.ok) {
                            console.error('Failed to create admin user:', createUserData);
                        }
                    } catch (createUserError) {
                        responses.push({ name: 'Admin User Creation', status: 'Error', data: createUserError.message });
                    }

                    // Fifth request: Create store
                    try {
                        const createStoreResponse = await makeAuthenticatedRequest(`${baseUrl}tenant/v1/stores`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'tenant': tenantUuid
                            },
                            body: JSON.stringify({
                                tenantUUID: tenantUuid,
                                name: storeName,
                                slug: storeSlug,
                                url: `${hostName}.${getHostSuffix()}`,
                                long: longitude,
                                address: storeAddress,
                                lat: latitude,
                                vatNumber: "11111111",
                                email: storeEmail,
                                sortOrder: "1",
                                ordersPerSlot: "5",
                                slotsInterval: "10",
                                status: true
                            }),
                        });

                        const createStoreData = await createStoreResponse.json();
                        responses.push({ name: 'Store Creation', status: createStoreResponse.status, data: createStoreData });

                        if (createStoreResponse.ok) {
                            storeUuid = createStoreData.payload.uuid; // Assign storeUuid here
                            console.log('Store created successfully, UUID:', storeUuid);

                            // Create menus
                            const menuUUIDs = await createMenus(tenantUuid);
                            // responses.push({ name: 'Menu Creation', status: 'Success', data: menuUUIDs });

                            // Create menu hours
                            const menuHoursResponse = await createMenuHours(tenantUuid, storeUuid, menuUUIDs);
                            responses.push(menuHoursResponse);

                            if (menuHoursResponse.status === 200) {
                                console.log('Menu hours created successfully');
                            } else {
                                console.error('Failed to create menu hours:', menuHoursResponse.data);
                            }
                        } else {
                            console.error('Failed to create store:', createStoreData);
                        }
                    } catch (createStoreError) {
                        responses.push({ name: 'Store Creation', status: 'Error', data: createStoreError.message });
                    }

                    // New request: Create Feature Flags
                    for (const featureFlag of defaultFeatureFlags) {
                        // Skip EPOS feature flag if not selected
                        if (featureFlag.name === 'epos' && !formData.pos) {
                            continue;
                        }

                        try {
                            const createFeatureFlagResponse = await makeAuthenticatedRequest(`${baseUrl}tenant/v1/tenant-feature`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'tenant': tenantUuid
                                },
                                body: JSON.stringify({
                                    status: true,
                                    feature: { uuid: featureFlag.uuid },
                                    tenant: { uuid: tenantUuid }
                                }),
                            });

                            const createFeatureFlagData = await createFeatureFlagResponse.json();
                            responses.push({ name: `Feature Flag Creation (${featureFlag.name})`, status: createFeatureFlagResponse.status, data: createFeatureFlagData });

                            if (!createFeatureFlagResponse.ok) {
                                console.error(`Failed to create feature flag ${featureFlag.name}:`, createFeatureFlagData);
                            }
                        } catch (createFeatureFlagError) {
                            responses.push({ name: `Feature Flag Creation (${featureFlag.name})`, status: 'Error', data: createFeatureFlagError.message });
                        }
                    }

                    // New request: Create Channels
                    try {
                        const selectedChannels = Object.entries(formData)
                            .filter(([key, value]) => ['opat', 'online', 'kiosk', 'delivery', 'pos', 'deliveroo', 'uberEats', 'justEat'].includes(key) && value)
                            .map(([key]) => {
                                if (key === 'online') return 'online';
                                if (key === 'pos') return 'pos';
                                return key;
                            });

                        const channelUUIDs = selectedChannels.map(channel => CHANNEL_UUIDS[channel]);

                        const createChannelsResponse = await makeAuthenticatedRequest(`${baseUrl}tenant/v1/tenant-channels/${tenantUuid}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'tenant': tenantUuid
                            },
                            body: JSON.stringify({
                                channels: channelUUIDs
                            }),
                        });

                        const createChannelsData = await createChannelsResponse.json();
                        responses.push({ name: 'Channel Creation', status: createChannelsResponse.status, data: createChannelsData });

                        if (createChannelsResponse.ok) {
                            console.log('Channels added successfully');
                        } else {
                            console.error('Failed to create channels:', createChannelsData);
                        }
                    } catch (createChannelsError) {
                        responses.push({ name: 'Channel Creation', status: 'Error', data: createChannelsError.message });
                        console.error('Error creating channels:', createChannelsError);
                    }

                    // New request: Create Tenant Settings
                    try {
                        const tenantSettings = await getTenantSettings();

                        for (const setting of tenantSettings) {
                            const payload = {
                                tenant: { uuid: tenantUuid },
                                setting: { uuid: setting.uuid },
                                value: setting.value
                            };

                            const createSettingResponse = await makeAuthenticatedRequest(`${baseUrl}tenant/v1/tenants/settings`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'tenant': tenantUuid
                                },
                                body: JSON.stringify(payload),
                            });

                            const createSettingData = await createSettingResponse.json();
                            responses.push({ name: `Tenant Setting Creation (${setting.name})`, status: createSettingResponse.status, data: createSettingData });

                            if (!createSettingResponse.ok) {
                                console.error(`Failed to create tenant setting ${setting.name}:`, createSettingData);
                            }
                        }
                    } catch (createSettingsError) {
                        responses.push({ name: 'Tenant Settings Creation', status: 'Error', data: createSettingsError.message });
                        console.error('Error creating tenant settings:', createSettingsError);
                    }

                    // New request: Create Store Settings
                    if (storeUuid) { // Only proceed if storeUuid is defined
                        try {
                            const storeSettings = await getStoreSettings();

                            for (const setting of storeSettings) {
                                const payload = {
                                    tenant: { uuid: tenantUuid },
                                    store: { uuid: storeUuid },
                                    setting: { uuid: setting.uuid },
                                    value: setting.value
                                };

                                const createStoreSettingResponse = await makeAuthenticatedRequest(`${baseUrl}tenant/v1/stores/settings`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'tenant': tenantUuid
                                    },
                                    body: JSON.stringify(payload),
                                });

                                const createStoreSettingData = await createStoreSettingResponse.json();
                                responses.push({ name: `Store Setting Creation (${setting.name})`, status: createStoreSettingResponse.status, data: createStoreSettingData });

                                if (!createStoreSettingResponse.ok) {
                                    console.error(`Failed to create store setting ${setting.name}:`, createStoreSettingData);
                                }
                            }
                        } catch (createStoreSettingsError) {
                            responses.push({ name: 'Store Settings Creation', status: 'Error', data: createStoreSettingsError.message });
                            console.error('Error creating store settings:', createStoreSettingsError);
                        }
                    } else {
                        console.error('Store UUID is not available. Skipping store settings creation.');
                        responses.push({ name: 'Store Settings Creation', status: 'Skipped', data: 'Store UUID not available' });
                    }

                    // New request: Get Modifier UUID
                    let modifierUuid;
                    if (storeUuid && tenantUuid) {
                        try {
                            const getModifierResponse = await makeAuthenticatedRequest(`${baseUrl}catalog/management/modifiers?types[]=range&types[]=size`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'tenant': tenantUuid,
                                    'store': storeUuid
                                },
                            });

                            const getModifierData = await getModifierResponse.json();
                            responses.push({ name: 'Get Modifier', status: getModifierResponse.status, data: getModifierData });

                            if (getModifierResponse.ok && getModifierData.payload.length > 1) {
                                modifierUuid = getModifierData.payload[1].uuid;
                                console.log('Modifier UUID retrieved successfully:', modifierUuid);
                            } else {
                                console.error('Failed to get modifier UUID:', getModifierData);
                            }
                        } catch (getModifierError) {
                            responses.push({ name: 'Get Modifier', status: 'Error', data: getModifierError.message });
                            console.error('Error getting modifier UUID:', getModifierError);
                        }

                        // New request: Create Bundle
                        let bundleUuid;
                        if (modifierUuid) {
                            try {
                                const bundle = getBundlePayload(bundleName, bundlePrice);

                                let adminUserAccessToken;
                                try {
                                    const response = await fetch(`${baseUrl}user/v1/auth`, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({ 
                                        email: adminEmail, 
                                        password: adminPassword 
                                    }),
                                    });
                                
                                    const data = await response.json();
                                
                                    if (response.status === 201) {
                                      adminUserAccessToken = data.payload.token.value;
                                    } else {
                                      console.error('Authentication failed:', data);
                                      return null;
                                    }
                                  } catch (error) {
                                    console.error('Error during authentication:', error);
                                    return null;
                                  }

                                const createBundleResponse = await fetch(`${baseUrl}catalog/v2/management/bundles`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-Requested-From': 'pos',
                                        'Authorization': `Bearer ${adminUserAccessToken}`,
                                        'tenant': tenantUuid,
                                        'store': storeUuid
                                    },
                                    body: JSON.stringify(bundle),
                                });

                                const createBundleData = await createBundleResponse.json();
                                responses.push({ name: 'Bundle Creation', status: createBundleResponse.status, data: createBundleData });

                                if (createBundleResponse.ok) {
                                    console.log('Bundle created successfully');
                                    bundleUuid = createBundleData.payload;
                                } else {
                                    console.error('Failed to create bundle:', createBundleData);
                                }
                            } catch (createBundleError) {
                                responses.push({ name: 'Bundle Creation', status: 'Error', data: createBundleError.message });
                                console.error('Error creating bundle:', createBundleError);
                            }

                            // Get menu information
                            if (bundleUuid) {
                                try {
                                    const getMenuResponse = await makeAuthenticatedRequest(`${baseUrl}catalog/v2/menu`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-Requested-From': 'pos',
                                            'tenant': tenantUuid,
                                            'store': storeUuid
                                        },
                                    });

                                    const getMenuData = await getMenuResponse.json();

                                    // Explicitly set the status based on the response
                                    const menuStatus = getMenuResponse.ok ? getMenuResponse.status : 'Error';
                                    responses.push({ name: 'Get Menu', status: menuStatus, data: getMenuData });

                                    if (getMenuResponse.ok && getMenuData.payload && getMenuData.payload.length > 0) {
                                        const menuUuid = getMenuData.payload[0].uuid;
                                        const categoryUuid = getMenuData.payload[0].categories[0].uuid;

                                        // Add bundle to menu
                                        const addToMenuResponse = await makeAuthenticatedRequest(`${baseUrl}catalog/management/layout/kiosk/menus/${menuUuid}/categories/${categoryUuid}/products?skipLayoutCheck=1`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'X-Requested-From': 'pos',
                                                'tenant': tenantUuid,
                                                'store': storeUuid
                                            },
                                            body: JSON.stringify({
                                                products: [
                                                    {
                                                        productType: "bundle",
                                                        name: "Test name",
                                                        appIsSoldout: {
                                                            pos: "on",
                                                            kiosk: "on",
                                                            online: "on",
                                                            delivery: "on",
                                                            opat: "on",
                                                            uberEats: "on"
                                                        },
                                                        sortOrder: 0,
                                                        isActive: true,
                                                        isSoldout: false,
                                                        channelIsActive: {
                                                            pos: "on",
                                                            opat: "on",
                                                            kiosk: "on",
                                                            online: "on",
                                                            justEat: "on",
                                                            delivery: "on",
                                                            uberEats: "on",
                                                            deliveroo: "on"
                                                        },
                                                        tags: [],
                                                        uuid: bundleUuid
                                                    }
                                                ]
                                            }),
                                        });

                                        const addToMenuData = await addToMenuResponse.json();
                                        responses.push({ name: 'Add Bundle to Menu', status: addToMenuResponse.status, data: addToMenuData });

                                        if (addToMenuResponse.ok) {
                                            console.log('Bundle added to menu successfully');
                                        } else {
                                            console.error('Failed to add bundle to menu:', addToMenuData);
                                        }
                                    } else {
                                        console.error('Failed to get menu information or menu is empty');
                                        responses.push({ name: 'Get Menu', status: 'Error', data: 'Failed to get menu information or menu is empty' });
                                    }
                                } catch (menuError) {
                                    console.error('Error during menu operations:', menuError);
                                }
                            }
                        } else {
                            console.error('Modifier UUID is not available. Skipping bundle creation.');
                            responses.push({ name: 'Bundle Creation', status: 'Skipped', data: 'Modifier UUID not available' });
                        }
                    } else {
                        console.error('Store UUID or Tenant UUID is not available. Skipping modifier and bundle operations.');
                        responses.push({ name: 'Modifier and Bundle Operations', status: 'Skipped', data: 'Store UUID or Tenant UUID not available' });
                    }

                    // If we reach here, tenant was created successfully
                    // You might want to show a success message to the user here
                    // setSuccessMessage('Tenant created successfully!');

                } else {
                    console.error('Failed to create tenant:', tenantData);
                }
            } catch (error) {
                responses.push({ name: 'Overall Process', status: 'Error', data: error.message });
            } finally {
                setIsSubmitting(false);
            }

            setApiResponses(responses);

            // Format and send Slack message
            const slackMessage = formatSlackMessage(formData, responses);
            await sendSlackMessage(slackMessage);

            // Check if any response has an error
            const hasError = responses.some(response => response.status === 'Error' || response.status >= 400);
            if (hasError) {
                toast.error('There were some errors during the process. Please refer to the API Responses section at the bottom for details.', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.success('Tenant created successfully!', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else {
            console.log('Form has errors, please correct them');
        }
    };

    const handleReset = () => {
        setFormData({
            tenantName: '',
            tenantAlias: '',
            hostName: '',
            tenantDescription: '',
            adminFirstName: '',
            adminLastName: '',
            adminEmail: '',
            adminPassword: '',
            storeName: '',
            storeSlug: '',
            storeAddress: '',
            latitude: '',
            longitude: '',
            storeEmail: '',
            opat: false,
            online: false,
            kiosk: false,
            delivery: false,
            pos: false,
            posType: '',
            deliveroo: false,
            uberEats: false,
            justEat: false,
            country: '',
            currency: '',
            feedbackEmail: '',
            bundleName: '',
            bundlePrice: ''
        });
        setErrors({});
    };

    const fillSampleData = () => {
        setFormData({
            tenantName: 'Sample Tenant',
            tenantAlias: 'sampletenant',
            hostName: 'sampletenant',
            tenantDescription: 'This is a sample tenant description',
            adminFirstName: 'John',
            adminLastName: 'Doe',
            adminEmail: 'john.doe@example.com',
            adminPassword: 'SamplePassword123!',
            storeName: 'Sample Store',
            storeSlug: 'samplestore',
            storeAddress: '123 Sample St, Sample City, 12345',
            latitude: '40.7128',
            longitude: '-74.0060',
            storeEmail: 'store@example.com',
            opat: true,
            online: true,
            kiosk: true,
            delivery: true,
            pos: true,
            posType: 'QSR',
            deliveroo: true,
            uberEats: true,
            justEat: true,
            country: 'UK',
            currency: 'GBP',
            feedbackEmail: 'feedback@example.com',
            bundleName: 'Sample Bundle',
            bundlePrice: '10.99'
        });
        setErrors({});
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getStoreSettings = async () => {
        let storeSettings = await StoreSettingConfig.storeSettings();

        if (formData.online) {
            const ccSettings = await StoreSettingConfig.ccStoreSettings();
            storeSettings = storeSettings.concat(ccSettings);
        }

        if (formData.opat) {
            const opatSettings = await StoreSettingConfig.opatStoreSettings();
            storeSettings = storeSettings.concat(opatSettings);
        }

        if (formData.delivery) {
            const deliverySettings = await StoreSettingConfig.deliveryStoreSettings();
            storeSettings = storeSettings.concat(deliverySettings);
        }

        if (formData.pos) {
            if (typeof StoreSettingConfig.eposStoreSettings === 'function') {
                const posSettings = await StoreSettingConfig.eposStoreSettings();
                storeSettings = storeSettings.concat(posSettings);
            } else {
                console.error('eposStoreSettings is not a function');
                // Optionally, you can add a custom error to the API responses here
            }
        }

        if (formData.kiosk) {
            const kioskSettings = await StoreSettingConfig.kioskStoreSettings();
            storeSettings = storeSettings.concat(kioskSettings);
        }

        return storeSettings;
    };

    const ApiResponseAccordion = ({ responses }) => {
        const [openSection, setOpenSection] = useState(null);

        const groupedResponses = {
            'Tenant Creation': responses.filter(r => r.name === 'Tenant Creation'),
            'Host Creation': responses.filter(r => r.name === 'Host Creation'),
            'Admin User Creation': responses.filter(r => r.name === 'Admin User Creation'),
            'Store Creation': responses.filter(r => r.name === 'Store Creation'),
            'Menu Creation': responses.filter(r => r.name.includes('Create') && r.name.includes('Menu')),
            'Menu Hours Creation': responses.filter(r => r.name === 'Menu Hours Creation'),
            'Feature Flags': responses.filter(r => r.name.includes('Feature Flag Creation')),
            'Channel Creation': responses.filter(r => r.name === 'Channel Creation'),
            'Tenant Settings': responses.filter(r => r.name.includes('Tenant Setting Creation')),
            'Store Settings': responses.filter(r => r.name.includes('Store Setting Creation')),
            'Bundle Creation': responses.filter(r => r.name === 'Bundle Creation'),
            'Menu Operations': responses.filter(r => r.name.includes('Menu')),
        };

        const getStatusIcon = (responses) => {
            const allSuccess = responses.every(r => r.status >= 200 && r.status < 300);
            const allFailed = responses.every(r => r.status >= 400 || r.status === 'Error');

            if (allSuccess) return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
            if (allFailed) return <XCircleIcon className="w-5 h-5 text-red-500" />;
            return <ExclamationCircleIcon className="w-5 h-5 text-orange-500" />;
        };

        return (
            <div className="space-y-2">
                {Object.entries(groupedResponses).map(([section, sectionResponses]) => (
                    sectionResponses.length > 0 && (
                        <div key={section} className="border rounded-md overflow-hidden">
                            <button
                                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 flex justify-between items-center"
                                onClick={() => setOpenSection(openSection === section ? null : section)}
                            >
                                <span className="font-semibold text-gray-800 dark:text-white flex items-center">
                                    {getStatusIcon(sectionResponses)}
                                    <span className="ml-2">{section}</span>
                                </span>
                                {openSection === section ? (
                                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            {openSection === section && (
                                <div className="p-4 bg-white dark:bg-gray-800">
                                    {sectionResponses.map((response, index) => (
                                        <div key={index} className="mb-4 last:mb-0">
                                            <h4 className="font-semibold text-gray-800 dark:text-white">{response.name}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Status: {typeof response.status === 'number' ? response.status : (response.status === 'Error' ? 'Error' : 'Unknown')}
                                            </p>
                                            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                                                <code className="whitespace-pre-wrap">
                                                    {typeof response.data === 'object'
                                                        ? JSON.stringify(response.data, null, 2)
                                                        : response.data}
                                                </code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 min-h-[90vh] flex flex-col p-4 md:p-6">
            {isSubmitting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="spinner mx-auto mb-4"></div>
                        <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                            Creating tenant...
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Please do not refresh or close this window.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    New Tenant Creation Wizard
                    <span className="ml-2 px-2 py-1 text-xs font-semibold text-linear-blue-600 bg-linear-blue-100 rounded-full">Beta</span>
                </h1>
                <button
                    type="button"
                    onClick={fillSampleData}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linear-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                    Fill Sample Data
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Tenant & URL</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Tenant name" name="tenantName" value={formData.tenantName} onChange={handleChange} placeholder="Enter tenant name" error={errors.tenantName} />
                        <InputField label="Tenant alias" name="tenantAlias" value={formData.tenantAlias} onChange={handleChange} placeholder="Enter tenant alias" error={errors.tenantAlias} noSymbolsOrSpaces={true} />
                        <InputField label="Host name" name="hostName" value={formData.hostName} onChange={handleChange} placeholder="Enter host name" suffix={`.${getHostSuffix()}`} error={errors.hostName} noSymbolsOrSpaces={true} />
                        <InputField label="Tenant description" name="tenantDescription" value={formData.tenantDescription} onChange={handleChange} placeholder="Enter tenant description" error={errors.tenantDescription} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Tenant settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={`input flex-grow ${errors.country ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select a country</option>
                                <option value="UK">UK</option>
                                <option value="Germany">Germany</option>
                                <option value="Belgium">Belgium</option>
                                <option value="France">France</option>
                                <option value="Ireland">Ireland</option>
                            </select>
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                        </div>
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className={`input flex-grow ${errors.currency ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select a currency</option>
                                <option value="GBP">GBP</option>
                                <option value="EUR">EUR</option>
                            </select>
                            {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
                        </div>
                        <InputField label="Feedback email" name="feedbackEmail" type="email" value={formData.feedbackEmail} onChange={handleChange} placeholder="Enter feedback email" error={errors.feedbackEmail} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Admin user</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Admin first name" name="adminFirstName" value={formData.adminFirstName} onChange={handleChange} placeholder="Enter admin first name" error={errors.adminFirstName} />
                        <InputField label="Admin last name" name="adminLastName" value={formData.adminLastName} onChange={handleChange} placeholder="Enter admin last name" error={errors.adminLastName} />
                        <InputField label="Admin email" name="adminEmail" type="email" value={formData.adminEmail} onChange={handleChange} placeholder="Enter admin email" error={errors.adminEmail} />
                        <div className="flex items-end space-x-2">
                            <div className="flex-grow relative">
                                <InputField
                                    label="Admin password"
                                    name="adminPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.adminPassword}
                                    onChange={handleChange}
                                    placeholder="Enter admin password"
                                    error={errors.adminPassword}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-8 p-1 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={generateRandomPassword}
                                className="px-3 py-2 text-sm bg-linear-blue-500 text-white rounded hover:bg-linear-blue-600 focus:outline-none focus:ring-2 focus:ring-linear-blue-500"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Store</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Store name" name="storeName" value={formData.storeName} onChange={handleChange} placeholder="Enter store name" error={errors.storeName} />
                        <InputField label="Store slug" name="storeSlug" value={formData.storeSlug} onChange={handleChange} placeholder="Enter store slug" error={errors.storeSlug} noSymbolsOrSpaces={true} />
                        <InputField label="Store address" name="storeAddress" value={formData.storeAddress} onChange={handleChange} placeholder="Enter store address" error={errors.storeAddress} />
                        <InputField label="Store email" name="storeEmail" type="email" value={formData.storeEmail} onChange={handleChange} placeholder="Enter store email" error={errors.storeEmail} />
                        <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Enter latitude" error={errors.latitude} />
                        <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Enter longitude" error={errors.longitude} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Channels</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <ToggleSwitch label="OPAT" name="opat" checked={formData.opat} onChange={handleChange} />
                        <ToggleSwitch label="Online" name="online" checked={formData.online} onChange={handleChange} />
                        <ToggleSwitch label="Kiosk" name="kiosk" checked={formData.kiosk} onChange={handleChange} />
                        <ToggleSwitch label="Delivery" name="delivery" checked={formData.delivery} onChange={handleChange} />
                        <ToggleSwitch label="POS" name="pos" checked={formData.pos} onChange={handleChange} />
                        <ToggleSwitch label="Deliveroo" name="deliveroo" checked={formData.deliveroo} onChange={handleChange} />
                        <ToggleSwitch label="Uber Eats" name="uberEats" checked={formData.uberEats} onChange={handleChange} />
                        <ToggleSwitch label="Just Eat" name="justEat" checked={formData.justEat} onChange={handleChange} />
                    </div>
                </section>

                {formData.pos && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">POS Configuration</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="posType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">POS Type</label>
                                <select
                                    name="posType"
                                    value={formData.posType}
                                    onChange={handleChange}
                                    className={`input flex-grow ${errors.posType ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Select POS Type</option>
                                    <option value="QSR">Quick Service Restaurant (QSR)</option>
                                    <option value="FSR">Full Service Restaurant (FSR)</option>
                                </select>
                                {errors.posType && <p className="text-red-500 text-sm mt-1">{errors.posType}</p>}
                            </div>
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Create a bundle</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="bundleName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bundle Name</label>
                            <input
                                type="text"
                                name="bundleName"
                                value={formData.bundleName}
                                onChange={handleChange}
                                className={`input flex-grow ${errors.bundleName ? 'border-red-500' : ''}`}
                                placeholder="Enter bundle name"
                            />
                            {errors.bundleName && <p className="text-red-500 text-sm mt-1">{errors.bundleName}</p>}
                        </div>
                        <div>
                            <label htmlFor="bundlePrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bundle Price</label>
                            <input
                                type="number"
                                name="bundlePrice"
                                value={formData.bundlePrice}
                                onChange={handleChange}
                                className={`input flex-grow ${errors.bundlePrice ? 'border-red-500' : ''}`}
                                placeholder="Enter bundle price"
                                step="0.01"
                            />
                            {errors.bundlePrice && <p className="text-red-500 text-sm mt-1">{errors.bundlePrice}</p>}
                        </div>
                    </div>
                </section>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linear-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                        disabled={isSubmitting}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-linear-blue-600 hover:bg-linear-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linear-blue-500"
                        disabled={isSubmitting}
                    >
                        Create tenant in {getEnvironmentName(selectedEnvironment)}
                    </button>
                </div>
            </form>

            {apiResponses.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">API Responses</h2>
                    <ApiResponseAccordion responses={apiResponses} />
                </section>
            )}
        </div>
    );
};

export default NewTenantCreationWizard;
