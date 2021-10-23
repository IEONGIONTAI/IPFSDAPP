import React, { Component } from 'react';
import { convertBytes } from './helpers';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import './App.css';

class Main extends Component {

  state = {
    value: '',
    copied: false,
  };

  render() {
    return (
      <div>
        <h1 class="title">
            <b class="title-txt txtFont">IPFS雲端資料庫</b>
        </h1>
        <div class="containerlayout-1">
          <div class="col">
            <ul>
              <li className="paddingLR txtFont">此網頁是一個雲端資料庫，您可以在此上傳您的個人檔案，所有上傳的資料將被放在IPFS系統上，您也可以將您上傳的檔案，通過分享HASH值跟好友們共享檔案。</li>
            </ul>
          </div>

          <div class="col">
            <div>
              <main role="main" className="col-lg-12 ml-auto mr-auto bg-dk" style={{ maxWidth: '1024px' }}>
                <div className="content">  
                  <p>&nbsp;</p>
                  <div style={{maxWidth: '512px', height : '450px' }}>
                      <form onSubmit={(event) => {
                        event.preventDefault()
                        const description = this.fileDescription.value
                        this.props.uploadFile(description)
                      }} action="upload.php" method="POST">

                        <input type="file" onChange={e=>{
                          this.props.captureFile(e);
                          document.getElementById("filename").innerHTML = `${e.target.files[0].name}`;
                          }} className="fileInput" id="fileInput" multiple/>
                        <p id="filename">Drag your files here or click in this area.</p>

                        {/*<input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>*/}
                        <div className="form-group">
                            <br></br>
                              <input
                                id="fileDescription"
                                type="text"
                                ref={(input) => { this.fileDescription = input }}
                                className="form-control text-monospace dcinput"
                                placeholder="description..."
                                required />
                        </div>
                        <button type="submit"><b>Upload</b></button>
                      </form>
                  </div>
                  <p>&nbsp;</p>
                  <table className="table-sm tb1 text-monospace" style={{ maxHeight: '450px'}}>
                    <thead style={{ 'fontSize': '15px' }}>
                      <tr className="bg-dark text-white">
                        <th scope="col" style={{ width: '1%'}}>id</th>
                        <th scope="col" style={{ width: '20%'}}>name</th>
                        <th scope="col" style={{ width: '23%'}}>description</th>
                        <th scope="col" style={{ width: '12%'}}>type</th>
                        <th scope="col" style={{ width: '9%'}}>size</th>
                        <th scope="col" style={{ width: '9%'}}>date</th>
                        <th scope="col" style={{ width: '12%'}}>uploader/view</th>
                        <th scope="col" style={{ width: '12%'}}>share</th>
                      </tr>
                    </thead>
                    { this.props.files.map((file, key) => {
                      return(
                        <thead style={{ 'fontSize': '12px','color': '#fff' }} key={key}>
                          <tr>
                            <td>{file.fileId}</td>
                            <td>{file.fileName}</td>
                            <td>{file.fileDescription}</td>
                            <td>{file.fileType}</td>
                            <td>{convertBytes(file.fileSize)}</td>
                            <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                            <td>
                              <a
                                href={"https://etherscan.io/address/" + file.uploader}
                                rel="noopener noreferrer"
                                target="_blank">
                                <center>
                                <Button variant="outline-success">用戶</Button>
                                </center>
                              </a>
                            </td>
                        <td>
                          <a>
                          <CopyToClipboard text={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                            onCopy={() => this.setState({copied: true})}>
                            <center>
                            <Button variant="primary">複製</Button>
                            </center>
                          </CopyToClipboard>
                          </a>
                        </td>
                          </tr>
                        </thead>
                      )
                    })}
                  </table>
                </div>
                <div>
                  <br></br>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;