import { useState, useRef, useEffect } from 'react';
import { User, Edit, Check, X, Camera, LogOut, DollarSign, TrendingUp, TrendingDown, PieChart, ArrowUp, ArrowDown } from 'lucide-react';
import axios from 'axios';

const ProfileCard =  () => {







  // User data
  const [user, setUser] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null
  });

  // Financial data
  const financialData = {
    monthlyIncome: 7500,
    monthlyExpenses: 4200,
    monthlySavings: 3300,
    topCategory: 'Food',
    transactions: [
      { id: 1, amount: -120, category: 'Food', date: 'Jun 15, 2025', type: 'expense' },
      { id: 2, amount: 7500, category: 'Salary', date: 'Jun 1, 2025', type: 'income' },
      { id: 3, amount: -800, category: 'Rent', date: 'Jun 5, 2025', type: 'expense' },
      { id: 4, amount: -350, category: 'Transport', date: 'Jun 10, 2025', type: 'expense' }
    ]
  };

  // UI states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({...user, avatar: event.target.result});
      };
      reader.readAsDataURL(file);
      setSelectedFile(file.name);
    }
  };

  // Save profile changes
  const saveChanges = () => {
    setUser({
      ...user,
      fullName: tempName,
      email: tempEmail
    });
    setIsEditingName(false);
    setIsEditingEmail(false);
  };

  // Cancel editing
  const cancelChanges = () => {
    setTempName(user.fullName);
    setTempEmail(user.email);
    setIsEditingName(false);
    setIsEditingEmail(false);
  };

  // Check for changes
  const hasChanges = tempName !== user.fullName || tempEmail !== user.email;



  // fetch Data 
const fetchUser = async () => {
  try{

    const response = await axios.get('/api/user/fetch-user', {
      withCredentials : true
    })
    
    const fullName = response.data.user.fullName;
    const email = response.data.user.email;
    setTempName(fullName)
    setTempEmail(email)

    
  }catch(error){    
    console.log("fetchUser failed",error.message);
    
  }
}


  useEffect(() => {
    fetchUser()
  })

  return (
    <div className="min-h-screen w-full bg-gray-50 p-3 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white text-center">
          <h1 className="text-xl font-bold">Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="p-6">
          {/* Profile Picture */}
          <div className="flex justify-center mb-5">
            <div 
              className="relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer shadow-sm"
              onClick={() => setShowImageModal(true)}
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-14 h-14 text-gray-500" />
              )}
              <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow">
                <Camera className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-5 mb-6">
            {/* Name Field */}
            <div>
              <label className="block text-md text-gray-600 mb-1">Full Name</label>
              <div className="flex items-center border-b-2 border-gray-200 pb-2">
                {isEditingName ? (
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="flex-1 outline-none text-lg"
                    autoFocus
                  />
                ) : (
                  <span className="flex-1 font-medium text-lg">{tempName}</span>
                )}
                <button 
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="ml-3 text-blue-500 hover:bg-blue-50 p-1 rounded-full"
                >
                  {isEditingName ? <Check size={20} /> : <Edit size={20} />}
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-md text-gray-600 mb-1">Email</label>
              <div className="flex items-center border-b-2 border-gray-200 pb-2">
                {isEditingEmail ? (
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="flex-1 outline-none text-lg"
                    autoFocus
                  />
                ) : (
                  <span className="flex-1 font-medium text-lg">{tempEmail}</span>
                )}
                <button 
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                  className="ml-3 text-blue-500 hover:bg-blue-50 p-1 rounded-full"
                >
                  {isEditingEmail ? <Check size={20} /> : <Edit size={20} />}
                </button>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            {(isEditingName || isEditingEmail) && (
              <div className="flex justify-end gap-3 pt-3">
                <button 
                  onClick={cancelChanges}
                  className="px-5 py-1.5 text-md bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-1"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button 
                  onClick={saveChanges}
                  disabled={!hasChanges}
                  className={`px-5 py-1.5 text-md text-white rounded-md flex items-center gap-1 ${hasChanges ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  <Check size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Financial Overview - Vertical List */}
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Financial Summary</h2>
            
            {/* Monthly Income */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-700">Monthly Income</h3>
                  <p className="text-sm text-gray-500">Your total earnings this month</p>
                </div>
              </div>
              <p className="text-xl font-bold text-blue-600">${financialData.monthlyIncome.toLocaleString()}</p>
            </div>

            {/* Monthly Expenses */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-700">Monthly Expenses</h3>
                  <p className="text-sm text-gray-500">Your total spending this month</p>
                </div>
              </div>
              <p className="text-xl font-bold text-red-600">${financialData.monthlyExpenses.toLocaleString()}</p>
            </div>

            {/* Monthly Savings */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-700">Monthly Savings</h3>
                  <p className="text-sm text-gray-500">Amount saved this month</p>
                </div>
              </div>
              <p className="text-xl font-bold text-green-600">${financialData.monthlySavings.toLocaleString()}</p>
            </div>

            {/* Top Spending */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <PieChart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-700">Top Spending</h3>
                  <p className="text-sm text-gray-500">Your highest expense category</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-purple-600">{financialData.topCategory}</p>
                <p className="text-xs text-gray-500">${Math.max(...financialData.transactions.filter(t => t.type === 'expense').map(t => Math.abs(t.amount))).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {financialData.transactions.map((txn) => (
                <div 
                  key={txn.id} 
                  className={`p-4 rounded-lg flex justify-between items-center ${txn.type === 'income' ? 'bg-green-50' : 'bg-red-50'} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${txn.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {txn.type === 'income' ? (
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-md font-medium">{txn.category}</p>
                      <p className="text-sm text-gray-500">{txn.date}</p>
                    </div>
                  </div>
                  <p className={`text-lg font-bold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'income' ? '+' : '-'}${Math.abs(txn.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t flex justify-end">
          <button
            onClick={() => console.log('Logging out...')}
            className="px-7 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-md"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Image Upload Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-88">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold">Update Profile Picture</h3>
                <button 
                  onClick={() => setShowImageModal(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full p-5 border-2 border-dashed border-gray-300 rounded-lg mb-5 hover:border-blue-500 transition-colors"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Camera className="w-7 h-7 text-gray-400" />
                  <p className="text-gray-600 text-md">
                    {selectedFile ? selectedFile : 'Click to select an image'}
                  </p>
                  <p className="text-xs text-gray-400">JPG, PNG (max 5MB)</p>
                </div>
              </button>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowImageModal(false)}
                  className="px-5 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (fileInputRef.current.files[0]) {
                      handleAvatarUpload({ target: { files: [fileInputRef.current.files[0]] } });
                    }
                    setShowImageModal(false);
                  }}
                  className="px-5 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-md flex items-center gap-1"
                >
                  <Check size={18} />
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;