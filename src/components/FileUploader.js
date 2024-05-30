import { ref, uploadBytes } from '@firebase/storage';
import { storage } from '../firebase/firebase';
import React, { useState, useRef } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      console.log("Upload button clicked");
      const storageRef = ref(storage, 'images/' + file.name);
      await uploadBytes(storageRef, file);
      setFile(null);  // Clear the state
      fileInputRef.current.value = '';  // Clear the file input
      console.log("File Uploaded Successfully");
    } catch (e) {
      console.log("Error Uploading File: ", e);
    }
  };

  return (
    <div>
      <input 
        type='file' 
        onChange={handleFileChange} 
        ref={fileInputRef} 
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
