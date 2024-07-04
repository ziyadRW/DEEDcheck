import React, { useState } from 'react';
import './App.css';

function App() {
  const [nationalId, setNationalId] = useState('');
  const [deedNumber, setDeedNumber] = useState('');
  const [owningArea, setOwningArea] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

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
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after fetching data
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
        return 10000; // THE GOAT 
      case 'الصالحية':
        return 2000;
      default:
        return 2000;
    }
  };

  const calculateOwningValue = () => {
    const area = parseFloat(owningArea);
    if (!isNaN(area)) {
      const districtValuePerMeter = getDistrictValue(districtName);
      return area * districtValuePerMeter;
    }
    return 0;
  };

  const owningValue = calculateOwningValue();
  const passed = owningValue > 2700000;

  return (
    <div id='main' className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="backdrop-container p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-xl text-gray-300 font-bold text-center mb-6">Check if Pro Investor By Deed</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nationalId" className="block text-gray-300 mb-2">National ID</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              id="nationalId"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deedNumber" className="block text-gray-300 mb-2">Deed Number</label>
            <input
              type="text"
              className="w-full p-2 border border-grhttps://ziyadrw.github.io/DEEDcheck/ay-300 rounded-lg"
              id="deedNumber"
              value={deedNumber}
              onChange={(e) => setDeedNumber(e.target.value)}
              required
            />
          </div>
          <button id='sbtn' type="submit" className="mt-3 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
        {owningArea && districtName && !loading && (
          <div className={' mt-8 p-4 text-gray-300 rounded-xl '}>
            <p><strong>Owning Area:</strong> {owningArea}</p>
            <p><strong>District Name:</strong> {districtName}</p>
            <p><strong>Owning Value:</strong> {owningValue}</p>
            <br></br>
            {passed ?
              <p className='text-green-700'><strong>Congrats ! Your are Qualified as a Pro investor</strong></p>
              :
              <p className='text-red-700'><strong>Sorry ! You are not Qualified as a Pro investor</strong></p>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
 