import { useState, useRef, useEffect } from 'react';
import { User, Edit, Check, X, Camera, LogOut, DollarSign, TrendingUp, TrendingDown, PieChart, ArrowUp, ArrowDown } from 'lucide-react';
import axios from 'axios';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TextAnimate } from '../magicui/text-animate';
import LogOutButton from "../UIverse/LogOutBtn.jsx"
import { useAlert } from "../../Context/AlertContext.jsx";




const ProfileCard =  () => {
  // User data
  const [user, setUser] = useState('');

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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [updateName, setUpdateName] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [picture, setPicture]  = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading , setUploading] = useState(false)
  const Navigate = useNavigate()
  const { showAlert } = useAlert();
  


    // fetch Data 
const fetchUser = async () => {
  try{

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/fetch-user`, {
      withCredentials : true
    })
    
    const fullName = response.data.user.fullName;
    const email = response.data.user.email;
    const profilePicture = response.data.user.profilePicture;
    setFullName(fullName)
    setEmail(email)
    setUpdateEmail(email)
    setUpdateName(fullName)
    setPicture(profilePicture)

    
  }catch(error){    
    console.log("fetchUser failed",error.message);
    
  }
}


//iamge Upload
const handleiamgeUpload = async (e) => {
  e.preventDefault()
  if(!selectedFile){
    showAlert("error", "Please select an image first");
    return
  }
  
  const formData = new FormData()
  formData.append('profilePicture', selectedFile)
  
  try{
    setUploading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/upload-profile`, formData, {
        withCredentials : true,

        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      }, 
      
    )
    setPicture(response.data.profilePicture)
    setSelectedFile(false)
    setShowImageModal(false)
    window.location.reload()
    
  }catch(error){
      console.error('Image upload failed:', error.message);
      if(error.response?.status === 400){
        showAlert("errro", "No file uploaded")
      }
  }finally{
    setUploading(false)
  }
}



  // Save profile changes
  const saveChanges = async (e) => {
    e.preventDefault()
    const updateData = {};
    if(updateName.trim() !==  "")updateData.fullName = updateName;
    if(updateEmail.trim() !==  "")updateData.email = updateEmail;
    
    if(Object.keys(updateData).length == 0){
        showAlert("error", "ALL filed is Required");
      return;
    }
    
    try{
      setUploading(true)
       await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/edit-user`,updateData, {
        withCredentials : true,
      } 
    )
    window.location.reload()
    setUpdateEmail(updateData.email)
    setUpdateName(updateData.fullName)
    setFullName(updateData.fullName)
    setEmail(updateData.email)
    }catch(error){ 
      console.log("Update Data failed", error.message);
      showAlert("error", "No valid field for update")
    }finally{
      setUploading(false)
    }
  }

  // Cancel editing
  const cancelChanges = () => {
    setFullName(fullName);
    setEmail(email);
    setUpdateName(fullName)
    setUpdateEmail(email)
    setIsEditingName(false);
    setIsEditingEmail(false);
  };

 
  //LogOUt
  const handleLogOut = async () => {
    try{
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/logout`, {} ,{
        withCredentials :true
      })
      Navigate('/')

    }catch(error){
       console.error("Logout failed:", error.message);
    }
  }

  // Check for changes
  const hasChanges = fullName !== user.fullName || email !== user.email;






  useEffect(() => {
    fetchUser()
  },[])

return (
  <div className="min-h-screen w-full bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-transparent rounded-2xl shadow-2xl overflow-hidden">
        <div className=" p-6 text-white text-center bg-gradient-to-r from-blue-500 to-purple-600 ">
           <TextAnimate
                  delay={0.4}
                  duration={1.9}
                  animation="slideLeft"
                  by="character"
                  className="text-center text-3xl  md:text-3xl font-lexend font-bold text-white"
                >
               Profile
                </TextAnimate>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Profile Info */}
          <div>
            <div className="flex justify-center mb-6 relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-md">
                {picture && picture.trim() !== '' ? (
                  <Image
                    src={picture}
                    alt="Profile"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute bottom-0 right-[calc(50%-64px)] bg-white p-2.5 rounded-full shadow hover:bg-gray-100 transition"
              >
                <Camera className="w-5 h-5 text-blue-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-lg text-gray-600 mb-1">Full Name</label>
                <div className="flex items-center border-b-2 border-gray-200 pb-2">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      className="flex-1 outline-none text-lg"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 font-medium text-md">{fullName}</span>
                  )}
                  <button
                    onClick={() => setIsEditingName(!isEditingName)}
                    className="ml-4 text-blue-500 hover:bg-blue-50 p-1.5 rounded-full"
                  >
                    {isEditingName ? <Check size={22} onClick={saveChanges} /> : <Edit size={22} />}
                  </button>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-lg text-gray-600 mb-1">Email</label>
                <div className="flex items-center border-b-2 border-gray-200 pb-2">
                  {isEditingEmail ? (
                    <input
                      type="email"
                      value={updateEmail}
                      onChange={(e) => setUpdateEmail(e.target.value)}
                      className="flex-1 outline-none text-lg"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 font-medium text-md ">{email}</span>
                  )}
                  <button
                    onClick={() => setIsEditingEmail(!isEditingEmail)}
                    className="ml-4 text-blue-500 hover:bg-blue-50 p-1.5 rounded-full"
                  >
                    {isEditingEmail ? <Check size={22} onClick={saveChanges} /> : <Edit size={22} />}
                  </button>
                </div>
              </div>

              {(isEditingName || isEditingEmail) && (
                <div className="flex justify-end gap-4 pt-3">
                  <button
                    onClick={cancelChanges}
                    className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2 text-base"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={saveChanges}
                    disabled={!hasChanges}
                    className={`px-6 py-2 text-white rounded-md flex items-center gap-2 text-base ${
                      hasChanges ? 'bg-blue-500 hover:bg-[#2d5385]' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {uploading ? 'Updating...' : (<><Check size={18} /> Save</>)}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Financial Summary + Transactions */}
          <div className="space-y-6">
            <h2 className="text-[#1f2937] text-[24px]  font-bold">Financial Summary</h2>

            {/* Income */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-700">Monthly Income</h3>
                  <p className="text-sm text-gray-500">Your total earnings this month</p>
                </div>
              </div>
              <p className="text-xl font-bold text-blue-600">${financialData.monthlyIncome.toLocaleString()}</p>
            </div>

            {/* Expenses */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-700">Monthly Expenses</h3>
                  <p className="text-sm text-gray-500">Your total spending this month</p>
                </div>
              </div>
              <p className="text-xl font-bold text-red-600">${financialData.monthlyExpenses.toLocaleString()}</p>
            </div>

            {/* Savings */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-700">Monthly Savings</h3>
                  <p className="text-sm text-gray-500">Amount saved this month</p>
                </div>
              </div>
              <p className="text-xl font-bold text-green-600">${financialData.monthlySavings.toLocaleString()}</p>
            </div>

            {/* Top Spending */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <PieChart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-700">Top Spending</h3>
                  <p className="text-sm text-gray-500">Highest expense category</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">{financialData.topCategory}</p>
                <p className="text-xs text-gray-500">${Math.max(...financialData.transactions.filter(t => t.type === 'expense').map(t => Math.abs(t.amount))).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-6 pb-6">
          <h2 className="text-[#1f2937] text-[24px]   font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {financialData.transactions.map((txn) => (
              <div
                key={txn.id}
                className={`p-4 rounded-lg flex justify-between items-center ${txn.type === 'income' ? 'bg-green-50' : 'bg-red-50'} shadow-sm hover:shadow-md transition`}
              >
                <div className="flex items-center gap-4">
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

        {/* Footer - Logout */}
        <div className="p-6 border-t flex justify-end">
          <LogOutButton  onClick={handleLogOut} />
        </div>

        {/* Image Upload Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold">Update Profile Picture</h3>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg mb-5 hover:border-blue-500 transition"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Camera className="w-7 h-7 text-gray-400" />
                  <p className="text-gray-600 text-base">
                    {selectedFile && `${(selectedFile.size / 1024).toFixed(1)} KB`}
                  </p>
                  <p className="text-xs text-gray-400">JPG, PNG (max 5MB)</p>
                </div>
              </button>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleiamgeUpload}
                  disabled={uploading}
                  className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 text-base"
                >
                  {uploading ? 'Uploading...' : (<><Check size={18} /> Update</>)}
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