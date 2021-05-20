import { CCard, CCol, CDataTable, CRow } from '@coreui/react';
import React from 'react'
import { CSVReader, CSVDownloader, jsonToCSV } from 'react-papaparse';
import samplecsv from '../../../api/samplecsv';
import DarkThemeButton from '../../../components/Buttons'
import Colors from '../../../config/Colors';

const buttonRef = React.createRef();


class ImportVendor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tableData: [],
      tHeaders: [],
      showPreview: false,
      sampleCsvData: null,
      showInstructions: false
    }
  }

  componentDidMount(){
    let sampleData = []
    samplecsv.get('vendor').then((res) => {
      console.log("Response....", res)
      sampleData.push(res.data)
      JSON.stringify(sampleData)
      this.setState({sampleCsvData: jsonToCSV(sampleData)})
    }).catch((err) => {
      console.log("Error...", err)
    })
  }

  componentWillUnmount(){

  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    console.log("File.........", data)
    let keys = data.shift(),
        i = 0, k = 0,
        obj = null,
        output = [];
    for (i = 0; i < data.length; i++) {
        obj = {};
        for (k = 0; k < keys.data.length; k++) {
            obj[keys['data'][k]] = data[i]['data'][k] !== undefined ? data[i]['data'][k] : '-';
        }
        console.log("Obj....",obj)
        output.push(obj);
    }
    console.log("output",output)
    // return output;
    this.setState({tHeaders: keys.data,tableData: output, showPreview:true})

  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render(){
    return(
      <CRow>
        <CCol lg='12'>
          <CCard>
            <h3 className="text-center m-4">Import vendor from CSV</h3>
            <p className="text-center">A CSV (comma-separated values) file is a spreadsheet file that is used by Wave to import vendor information into your business.</p>
            {
              !this.state.showPreview ?
                <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'50%', padding:30, margin:'auto'}} >
                  {/* <input type="file" id="file" ref="fileUploader"  multiple={false} onChange={(e) => console.log("eeee", e.target.files)}/> */}

                  <CSVReader
                    ref={buttonRef}
                    onFileLoad={this.handleOnFileLoad}
                    onError={this.handleOnError}
                    noClick
                    noDrag
                    onRemoveFile={this.handleOnRemoveFile}
                  >
                    {({ file }) => (
                      <aside
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}
                      >
                        <button
                          type="button"
                          onClick={this.handleOpenDialog}
                          style={{
                            display: 'inline-block',
                            borderRadius: 0,
                            margin: '5px 0px' ,
                            width: '40%',
                            padding: '10px 25px',
                            backgroundColor: Colors.accentBlue,
                            color: Colors.white
                          }}
                        >
                          Browse file
                        </button>
                        <div
                          style={{
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#ccc',
                            height: 45,
                            lineHeight: 2.5,
                            marginTop: 5,
                            marginBottom: 5,
                            paddingLeft: 13,
                            paddingTop: 3,
                            width: '60%',
                          }}
                        >
                          {file && file.name}
                        </div>
                        <button
                          style={{
                            display: 'inline-block',
                            borderRadius: 0,
                            margin: '5px 0px' ,
                            padding: '10px 25px',
                            backgroundColor: Colors.red,
                            color: Colors.white
                          }}
                          onClick={this.handleRemoveFile}
                        >
                          Remove
                        </button>
                      </aside>
                    )}
                  </CSVReader>
                  <div style={{display: 'flex',justifyContent: 'center', margin:15}}>
                    <DarkThemeButton click={() => console.log('Clicked')} label='Upload and Preview Vendors' style={{}}></DarkThemeButton>
                  </div>
                </div>
                :
                <div className='m-3'>
                  <CDataTable
                      items={this.state.tableData}
                      fields={this.state.tHeaders}
                      hover
                      striped
                      bordered
                      itemsPerPage={7}
                      pagination
                      style={{innerHeight:500}}
                  />
                </div>
            }
            <div style={{display:'flex', width:'50%', margin:'auto'}}>
              <p className="mt-3">Need help creating your CSV file? </p>
              <p className="m-3" style={{color:Colors.textBlue, cursor:'pointer'}} onClick={() => this.setState({showInstructions: true})} >View Instructions</p>
            </div>
            {
              this.state.showInstructions?
              <div style={{display:'flex', flexDirection:'column', width:'50%', margin:'auto'}}>
                <h3 className="mt-3"> Vendor CSV template file</h3>
                <div style={{display:'flex'}}>
                  <p className="mt-3" style={{color:Colors.textBlue, cursor:'pointer'}}>
                  <CSVDownloader
                      data={this.state.sampleCsvData}
                      filename={'filename'}
                      type={'link'}
                    >
                      Download and view our vendor CSV template.
                    </CSVDownloader></p>
                  <p className="mt-3">You can use this as a template for creating your CSV file.</p>
                </div>
              </div>
              :
              <div></div>
            }
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default ImportVendor