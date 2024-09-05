import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, suffix, error }) => (
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
    cnc: false,
    kiosk: false,
    delivery: false,
    epos: false,
    deliveroo: false,
    uberEats: false,
    justEat: false,
    country: '',
    currency: '',
    feedbackEmail: ''
  });

  const [errors, setErrors] = useState({});
  const [apiResponses, setApiResponses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Add this line to get the selected environment
  const selectedEnvironment = localStorage.getItem('selected-environment') || 'feature-branch';

  // Function to get a friendly name for the environment
  const getEnvironmentName = (env) => {
    switch(env) {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { tenantName, tenantAlias, tenantDescription, hostName, adminFirstName, adminLastName, adminEmail, adminPassword, storeName, storeSlug, storeAddress, latitude, longitude, storeEmail } = formData;
      
      const accessToken = localStorage.getItem('access-token');
      
      if (!accessToken) {
        console.error('No access token found. User might not be authenticated.');
        return;
      }

      const selectedEnvironment = localStorage.getItem('selected-environment');
      const baseUrls = {
        'feature-branch': 'https://pos2-next.vmos-qa.com/',
        'demo': 'https://vmos2.vmos-demo.com/',
        'live': 'https://vmos2.vmos.io/'
      };

      const baseUrl = baseUrls[selectedEnvironment] || baseUrls['feature-branch'];

      const responses = [];

      try {
        // First request: Create tenant
        const tenantResponse = await fetch(`${baseUrl}tenant/v1/tenants`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
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
            const hostResponse = await fetch(`${baseUrl}tenant/v1/tenantHosts/many`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'tenant': tenantUuid
              },
              body: JSON.stringify([
                {
                  value: `${hostName}.vmos.io`
                }
              ]),
            });

            const hostData = await hostResponse.json();
            responses.push({ name: 'Host Creation', status: hostResponse.status, data: hostData });

            if (!hostResponse.ok) {
              console.error('Failed to create tenant host:', hostData);
              // setErrorMessage('Tenant created, but failed to create host. Please try again.');
            }
          } catch (hostError) {
            responses.push({ name: 'Host Creation', status: 'Error', data: hostError.message });
          }

          // Third request: Clone diets
          try {
            const dietCloneResponse = await fetch(`${baseUrl}catalog/management/diets/clone`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
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
              // setErrorMessage('Tenant created, but failed to clone diets. Please try again.');
            }
          } catch (dietCloneError) {
            responses.push({ name: 'Diet Clone', status: 'Error', data: dietCloneError.message });
          }

          // Fourth request: Create admin user
          try {
            const createUserResponse = await fetch(`${baseUrl}user/v1/management/user`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
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
              // setErrorMessage('Tenant created, but failed to create admin user. Please try again.');
            }
          } catch (createUserError) {
            responses.push({ name: 'Admin User Creation', status: 'Error', data: createUserError.message });
          }

          // Fifth request: Create store
          try {
            const createStoreResponse = await fetch(`${baseUrl}tenant/v1/stores`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'tenant': tenantUuid
              },
              body: JSON.stringify({
                tenantUUID: tenantUuid,
                name: storeName,
                slug: storeSlug,
                url: `${hostName}.vmos.io`,
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

            if (!createStoreResponse.ok) {
              console.error('Failed to create store:', createStoreData);
              // setErrorMessage('Tenant created, but failed to create store. Please try again.');
            }
          } catch (createStoreError) {
            responses.push({ name: 'Store Creation', status: 'Error', data: createStoreError.message });
          }

          // If we reach here, tenant was created successfully
          // You might want to show a success message to the user here
          // setSuccessMessage('Tenant created successfully!');
          
        } else {
          console.error('Failed to create tenant:', tenantData);
          // setErrorMessage('Failed to create tenant. Please try again.');
        }
      } catch (error) {
        responses.push({ name: 'Overall Process', status: 'Error', data: error.message });
      }

      setApiResponses(responses);

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
      cnc: false,
      kiosk: false,
      delivery: false,
      epos: false,
      deliveroo: false,
      uberEats: false,
      justEat: false,
      country: '',
      currency: '',
      feedbackEmail: ''
    });
    setErrors({});
  };

  const fillSampleData = () => {
    setFormData({
      tenantName: 'Sample Tenant',
      tenantAlias: 'sample-tenant',
      hostName: 'sample-tenant',
      tenantDescription: 'This is a sample tenant description',
      adminFirstName: 'John',
      adminLastName: 'Doe',
      adminEmail: 'john.doe@example.com',
      adminPassword: 'SamplePassword123!',
      storeName: 'Sample Store',
      storeSlug: 'sample-store',
      storeAddress: '123 Sample St, Sample City, 12345',
      latitude: '40.7128',
      longitude: '-74.0060',
      storeEmail: 'store@example.com',
      opat: true,
      cnc: true,
      kiosk: false,
      delivery: true,
      epos: true,
      deliveroo: false,
      uberEats: true,
      justEat: false,
      country: 'United States',
      currency: 'USD',
      feedbackEmail: 'feedback@example.com'
    });
    setErrors({});
  };

  const generateRandomPassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData(prevState => ({
      ...prevState,
      adminPassword: password
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white dark:bg-gray-800 min-h-[90vh] flex flex-col p-4 md:p-6">
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
            <InputField label="Tenant alias" name="tenantAlias" value={formData.tenantAlias} onChange={handleChange} placeholder="Enter tenant alias" error={errors.tenantAlias} />
            <InputField label="Host name" name="hostName" value={formData.hostName} onChange={handleChange} placeholder="Enter host name" suffix=".vmos.io" error={errors.hostName} />
            <InputField label="Tenant description" name="tenantDescription" value={formData.tenantDescription} onChange={handleChange} placeholder="Enter tenant description" error={errors.tenantDescription} />
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
            <InputField label="Store slug" name="storeSlug" value={formData.storeSlug} onChange={handleChange} placeholder="Enter store slug" error={errors.storeSlug} />
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
            <ToggleSwitch label="C+C" name="cnc" checked={formData.cnc} onChange={handleChange} />
            <ToggleSwitch label="Kiosk" name="kiosk" checked={formData.kiosk} onChange={handleChange} />
            <ToggleSwitch label="Delivery" name="delivery" checked={formData.delivery} onChange={handleChange} />
            <ToggleSwitch label="EPOS" name="epos" checked={formData.epos} onChange={handleChange} />
            <ToggleSwitch label="Deliveroo" name="deliveroo" checked={formData.deliveroo} onChange={handleChange} />
            <ToggleSwitch label="Uber Eats" name="uberEats" checked={formData.uberEats} onChange={handleChange} />
            <ToggleSwitch label="Just Eat" name="justEat" checked={formData.justEat} onChange={handleChange} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Tenant settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" error={errors.country} />
            <InputField label="Currency" name="currency" value={formData.currency} onChange={handleChange} placeholder="Enter currency" error={errors.currency} />
            <InputField label="Feedback email" name="feedbackEmail" type="email" value={formData.feedbackEmail} onChange={handleChange} placeholder="Enter feedback email" error={errors.feedbackEmail} />
          </div>
        </section>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linear-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-linear-blue-600 hover:bg-linear-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linear-blue-500"
          >
            Create tenant in {getEnvironmentName(selectedEnvironment)}
          </button>
        </div>
      </form>

      {apiResponses.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">API Responses</h2>
          <div className="space-y-4">
            {apiResponses.map((response, index) => (
              <div key={index} className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white">{response.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Status: {response.status}</p>
                <pre className="mt-2 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                  <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    {JSON.stringify(response.data, null, 2)}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewTenantCreationWizard;
