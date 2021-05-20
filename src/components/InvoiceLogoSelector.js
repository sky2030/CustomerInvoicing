import React from 'react'
import uploadImg from '../assets/upload.png'
import Colors from '../config/Colors'

class InvoiceLogoSelector extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }
  render(){
    return (
      <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'50%', padding:30, margin:'auto'}} onClick={() => this.refs.fileUploader.click()}>
        <input type="file" id="file" ref="fileUploader" style={{display: "none"}} multiple={false} onChange={(e) => console.log("eeee", e.target.files)}/>
        <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
          <img src={uploadImg} style={{height:50, width:50}} alt=""></img>
        </div>
        <p className="text-center p-6">
          Browse or drop your logo here.Maximum 5MB in size.JPG,PNG, or GIF formats
        </p>
      </div>
    )
  }
}

export default InvoiceLogoSelector