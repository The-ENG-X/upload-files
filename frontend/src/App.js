import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchUploadedFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <h2>Uploaded Files:</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
