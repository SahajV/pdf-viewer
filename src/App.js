import React, { Component } from 'react';
import PdfViewer from './components/PdfViewer'
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = React.useState("");
  const [loaded, setLoaded] = React.useState("");
  const [name, SetName] = React.useState('');

  function handleUpload(event) {
    setFile(event.target.files[0]);
    setLoaded(0);
  }

  const onClickHandler = () => {
    const data = new FormData()
    data.append('file', file)
    axios.post("/upload", data, {
    })
      .then(res => {
        console.log(res.statusText)
        SetName(file.name)
      })
  }

  return (
    <div className="App">
      <div id="upload-box">
        <input type="file" onChange={handleUpload} />
        <button type="button" onClick={onClickHandler}>Upload</button>
      </div>
      <br></br>
      Please do not upload the same pdf(same name) twice
      <PdfViewer pdf={'/'+name}/>
    </div>
  );
}

export default App;
