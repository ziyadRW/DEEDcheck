import React, { useState } from 'react';
import './App.css';

function App() {
  const [nationalId, setNationalId] = useState('');
  const [deedNumber, setDeedNumber] = useState('');
  const [owningArea, setOwningArea] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiKey = '7IWYE7bZSpIuh182ZNxd4Dbdihedl4yg';
    const url = `https://api.wathq.sa/moj/real-estate/deed/${deedNumber}/${nationalId}/National_ID`;

    fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'apiKey': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ownerDetails && data.realEstateDetails) {
          setOwningArea(data.ownerDetails[0].owningArea);
          setDistrictName(data.realEstateDetails[0].districtName);
          setErrorMessage('');
        } else {
          setErrorMessage('No data found for the provided National ID and Deed Number.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred while fetching the data.');
      });
  };

  const getDistrictValue = (districtName) => {
    switch (districtName) {
      case 'العارض':
        return 8000; 
      case 'الرمال':
        return 6500;
      case 'العليا':
        return 6000;
      case 'النسيم':
        return 5500;
      case 'النظيم':
        return 5000;
      case 'اليرموك':
        return 4500;
      case 'المروج':
        return 4000;
      case 'العزيزية':
        return 3500;
      case 'العمرية':
        return 3000;
      case 'الصحافة':
        return 2500;
      case 'الصالحية':
        return 2000; 
      default:
        return 2000;
    }
  };

  const calculateOwningValue = () => {
    const area = parseFloat(owningArea); // Convert owningArea to a number
    if (!isNaN(area)) {
      const districtValuePerMeter = getDistrictValue(districtName);
      return area * districtValuePerMeter;
    }
    return 0; // Handle cases where owningArea is not a valid number
  };

  const owningValue = calculateOwningValue();
  const passed = owningValue > 2700000;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Real Estate Deed Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nationalId" className="block text-gray-700 mb-2">National ID</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="nationalId"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deedNumber" className="block text-gray-700 mb-2">Deed Number</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="deedNumber"
              value={deedNumber}
              onChange={(e) => setDeedNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
        </form>
        {errorMessage && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
        {owningArea && districtName && (
          <div className={`mt-4 p-4 ${passed ? 'bg-green-100 text-green-700 border-green-400' : 'bg-red-100 text-red-700 border-red-400'} border rounded`}>
            <p><strong>Owning Area:</strong> {owningArea}</p>
            <p><strong>District Name:</strong> {districtName}</p>
            <p><strong>Owning Value:</strong> {owningValue}</p>
            <br></br>
            {passed ? 
              <p><strong>Congrats ! Your are Qualified as a Pro investor</strong></p>
              :
              <p><strong>Sorry ! You are not Qualified as a Pro investor</strong></p>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
