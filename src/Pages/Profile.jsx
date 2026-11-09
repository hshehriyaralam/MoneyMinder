import {
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { User, Edit, Check, X, Camera, LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/Context/AlertContext";
import useAppStore from "@/store/store.js";
import { getCurrentMonthSummary } from "@/lib/calculations.js";

const Summary = lazy(() => import("@/Components/profileComp/summary"));
const RecentTransaction = lazy(
  () => import("@/Components/profileComp/recentTransaction"),
);
const ImageModal = lazy(() => import("@/Components/profileComp/imageModal"));

async function prepareAvatar(file) {
  if (!("createImageBitmap" in window)) return file;
  const image = await createImageBitmap(file);
  const size = Math.min(512, image.width, image.height);
  const cropSize = Math.min(image.width, image.height);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    image.close();
    throw new Error("Could not prepare this image.");
  }
  const left = (image.width - cropSize) / 2;
  const top = (image.height - cropSize) / 2;
  context.drawImage(image, left, top, cropSize, cropSize, 0, 0, size, size);
  image.close();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Could not encode this image."))),
      "image/jpeg",
      0.86,
    );
  });
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

const Profile = () => {
  const user = useAppStore((state) => state.user);
  const fetchUser = useAppStore((state) => state.fetchUser);
  const updateUser = useAppStore((state) => state.updateUser);
  const uploadProfilePicture = useAppStore((state) => state.uploadProfilePicture);
  const logOut = useAppStore((state) => state.logOut);
  const deleteAccount = useAppStore((state) => state.deleteAccount);
  const transactions = useAppStore((state) => state.transactions);
  const fetchTransactions = useAppStore(
    (state) => state.fetchTransactions,
  );
  const fetchError = useAppStore((state) => state.fetchError);

  const {
    monthlyIncomes,
    monthlyExpenses,
    monthlyBalance,
    topExpenseCategories,
    topExpenseAmount,
  } = getCurrentMonthSummary(transactions);

  // Financial data
  const financialData = {
    monthlyIncome: monthlyIncomes,
    monthlyExpenses: monthlyExpenses,
    monthlySavings: monthlyBalance,
    topCategory: topExpenseCategories,
    topExpenseAmount: topExpenseAmount,
    transactions: [...transactions],
  };

  const [isEditingName, setIsEditingName] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [picture, setPicture] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const Navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!user) return;
    setFullName(user.fullName || "");
    setEmail(user.email || "");
    setUpdateName(user.fullName || "");
    setPicture(user.profilePicture || "");
  }, [user]);

  const handleiamgeUpload = useCallback(async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showAlert("error", "Please select an image first");
      return;
    }
    if (!selectedFile.type.startsWith("image/") || selectedFile.size > 5 * 1024 * 1024) {
      showAlert("error", "Choose an image smaller than 5 MB.");
      return;
    }
    const formData = new FormData();
    try {
      setUploading(true);
      formData.append("profilePicture", await prepareAvatar(selectedFile));
      const updatedPicture = await uploadProfilePicture(formData);
      setPicture(updatedPicture);
      setSelectedFile(null);
      setShowImageModal(false);
      showAlert("success", "Profile picture updated");
    } catch (error) {
      console.error("Image upload failed:", error.message);
      showAlert(
        "error",
        error.response?.status === 400
          ? "No file uploaded"
          : "Could not upload this picture. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  }, [selectedFile, showAlert, uploadProfilePicture]);

  // Save profile changes
  const saveChanges = useCallback(async (e) => {
    e.preventDefault();
    const updateData = {};
    if (updateName.trim() !== "") updateData.fullName = updateName.trim();

    if (!updateData.fullName || updateData.fullName === fullName) {
      showAlert("error", "Enter a new name before saving");
      return;
    }

    try {
      setUploading(true);
      const updatedUser = await updateUser(updateData);
      const updatedName = updatedUser.fullName || updateData.fullName;
      setUpdateName(updatedName);
      setFullName(updatedName);
      setIsEditingName(false);
      showAlert("success", "Name updated");
    } catch (error) {
      console.log("Update Data failed", error.message);
      showAlert("error", "No valid field for update");
    } finally {
      setUploading(false);
    }
  }, [updateName, fullName, updateUser, showAlert]);

  // Cancel 
  const cancelChanges = useCallback(() => {
    setUpdateName(fullName);
    setIsEditingName(false);
  }, [fullName]);

  //LogOUt
  const handleLogOut = async () => {
    try {
      await logOut();
      Navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleDelete = useCallback(async () => {
    setIsDeletingAccount(true);
    try {
      await deleteAccount();
      setShowDeleteConfirm(false);
      Navigate("/SignUp", { replace: true });
    } catch (error) {
      console.error("Account deletion failed:", error.message);
      showAlert("error", "Could not delete the account and its transactions. Please try again.");
    } finally {
      setIsDeletingAccount(false);
    }
  }, [deleteAccount, Navigate, showAlert]);

  // Check for changes
  const hasChanges = useMemo(
    () => updateName.trim() !== "" && updateName.trim() !== fullName,
    [updateName, fullName],
  );

  useEffect(() => {
    fetchUser();
    fetchTransactions();
  }, [fetchUser, fetchTransactions]);

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="profile-heading">
          <h1 className="section-title">Profile</h1>
        </div>
        {fetchError && <p className="data-error" role="alert">{fetchError}</p>}

        <div className="profile-grid">
          {/* Left Column - Profile Info */}
          <div className="profile-info card">
            <div className="profile-avatar">
              <div className="profile-avatar-image">
                {picture && picture.trim() !== "" ? (
                  <img
                    src={picture}
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                    width="104"
                    height="104"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <User className="profile-avatar-placeholder" />
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="profile-avatar-edit"
                aria-label="Change profile picture"
              >
                <Camera size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-lg text-gray-600 mb-1">
                  Full Name
                </label>
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
                    <span className="flex-1 font-medium text-md">
                      {fullName}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={isEditingName ? saveChanges : () => setIsEditingName(true)}
                    className="ml-4 text-blue-500 hover:bg-blue-50 p-1.5 rounded-full cursor-pointer"
                  >
                    {isEditingName ? <Check size={22} /> : <Edit size={22} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-lg text-gray-600 mb-1">
                  Email
                </label>
                <div className="flex items-center border-b-2 border-gray-200 pb-2">
                  <span className="flex-1 font-medium text-md">{email}</span>
                </div>
              </div>

              {isEditingName && (
                <div className="flex justify-end gap-4 pt-3">
                  <button
                    onClick={cancelChanges}
                    className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2 text-base cursor-pointer"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={saveChanges}
                    disabled={!hasChanges}
                    className={`px-6 py-2 text-white rounded-md flex items-center gap-2 text-base cursor-pointer  ${
                      hasChanges
                        ? "bg-blue-500 hover:bg-[#2d5385]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {uploading ? "Updating..." : (
                      <>
                        <Check size={18} /> Save
                      </>
                    )}
                  </button>
                </div>
              )}
              <div className="pt-6 border-t mt-6">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm text-red-600">
                    Once you delete your account, there is no going back.
                  </p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-6 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </div>

              {showDeleteConfirm && (
                <div
                  className="modal-back"
                  role="presentation"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  <div
                    className="modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-title"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <h3 id="delete-title">
                      Confirm Account Deletion
                    </h3>
                    <p>
                      Your account and transactions will be permanently deleted. This action cannot be undone.
                    </p>
                    <div className="btn-row" style={{ justifyContent: "flex-end", marginTop: 16 }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isDeletingAccount) setShowDeleteConfirm(false);
                        }}
                        className="btn btn-ghost"
                        disabled={isDeletingAccount}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger"
                        disabled={isDeletingAccount}
                      >
                        <Trash2 className="w-4 h-4" />
                        {isDeletingAccount ? "Deleting…" : "Confirm Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Financial Summary + Transactions */}
          <Suspense fallback={<div className="card profile-summary"><p className="label">Loading financial summary…</p></div>}>
            <div className="card profile-summary">
              <Summary financialData={financialData} />
            </div>
          </Suspense>
        </div>

        <Suspense fallback={<div className="card"><p className="label">Loading recent activity…</p></div>}>
          <div className="card profile-recent">
            <RecentTransaction transactions={financialData.transactions} />
          </div>
        </Suspense>
        <div className="profile-logout">
          <button type="button" className="btn profile-logout-button" onClick={handleLogOut}>
            <LogOut size={16} aria-hidden="true" />
            Log out
          </button>
        </div>

        {showImageModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <ImageModal
              fileInputRef={fileInputRef}
              selectedFile={selectedFile}
              handleiamgeUpload={handleiamgeUpload}
              uploading={uploading}
              setShowImageModal={setShowImageModal}
              setSelectedFile={setSelectedFile}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Profile;
