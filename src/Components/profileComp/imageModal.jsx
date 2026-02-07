import React from 'react'
import { Check, X, Camera } from 'lucide-react';

const ImageModal = React.memo(({fileInputRef,selectedFile,handleiamgeUpload,uploading,setShowImageModal,setSelectedFile}) => {
  return (
    <div>
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
    </div>
  )
})

export default ImageModal
