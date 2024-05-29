import { ref, uploadBytes } from '@firebase/storage';
import { storage } from '../firebase/firebase';
import React, { useState } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; /*{first file selected by a user}*/
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      console.log("Upload button clicked");
      const storageRef = ref(storage, 'images/' + file.name);
      await uploadBytes(storageRef, file);
      console.log("File Uploaded Successfully");
    } catch (e) {
      console.log("Error Uploading File: ", e);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
