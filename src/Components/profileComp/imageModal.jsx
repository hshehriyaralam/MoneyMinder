import { useEffect, useState } from "react";
import { Camera, Check, X } from "lucide-react";

const ImageModal = ({
  fileInputRef,
  selectedFile,
  handleiamgeUpload,
  uploading,
  setShowImageModal,
  setSelectedFile,
}) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return undefined;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  return <div
    className="modal-back"
    role="presentation"
    onClick={() => setShowImageModal(false)}
  >
    <section
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="picture-title"
      onClick={(event) => event.stopPropagation()}
    >
      <header className="card-head">
        <h2 id="picture-title">Update Profile Picture</h2>
        <button
          type="button"
          className="icon-btn modal-close"
          aria-label="Close dialog"
          onClick={() => setShowImageModal(false)}
        >
          <X size={18} />
        </button>
      </header>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
        accept="image/*"
        className="sr"
      />
      <button
        type="button"
        className="picture-picker"
        onClick={() => fileInputRef.current?.click()}
      >
        <Camera size={28} aria-hidden="true" />
        <span>{selectedFile?.name || "Choose an image"}</span>
        <small>JPG or PNG · up to 5 MB</small>
      </button>
      {selectedFile && (
        <div className="crop-stage">
          <img
            src={preview}
            alt="Selected profile preview"
            decoding="async"
          />
        </div>
      )}
      <div className="btn-row" style={{ justifyContent: "flex-end", marginTop: 16 }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setShowImageModal(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn"
          onClick={handleiamgeUpload}
          disabled={uploading || !selectedFile}
        >
          {uploading ? "Uploading…" : <><Check size={16} /> Update</>}
        </button>
      </div>
    </section>
  </div>;
};

export default ImageModal;
