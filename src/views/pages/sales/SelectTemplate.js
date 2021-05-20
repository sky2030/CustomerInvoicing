import { CButton, CCarousel, CCarouselControl, CCarouselInner, CCarouselItem, CContainer, CSpinner } from '@coreui/react';
import React from 'react'
import { ChromePicker } from 'react-color';
import Invoice1 from '../../../assets/InvoiceTemplates/invoice1.png'
import Invoice2 from '../../../assets/InvoiceTemplates/invoice2.png'
import Invoice3 from '../../../assets/InvoiceTemplates/invoice3.png'
// import uploadImg from '../../../assets/upload.png'
import Colors from '../../../config/Colors';
import InvoiceLogoSelector from '../../../components/InvoiceLogoSelector'
import invoiceTemplateApi from '../../../api/invoiceTemplate'

class SelectTemplates extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      accentColor: Colors.themeGreen,
      templateName: '',
      nextButtonBgColor: Colors.themeDark,
      templates: ['Contemporary', 'Classic', 'Modern'],
      loader: false
    }
    this.templateChange = this.templateChange.bind(this)
    this.handleTemplateSelection = this.handleTemplateSelection.bind(this)
  }

  componentDidMount(){
  }

  templateChange(index){
    this.setState({templateName: this.state.templates[index]})
  }

  handleTemplateSelection(){
    this.setState({loader:true})
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let headers ={
      'Content-Type': 'application/json',
    }
    let data = {
      "templateName":this.state.templateName,
      "templateColor":this.state.accentColor,
      "displayLogo":true,
      "user":{
          "userId":userInfo.userId
      },
      "organization":{
          "organizationId":userInfo.organizationId,
          "name": userInfo.organizationName
      },
      "active":true,
      "deleted":false
    }
    invoiceTemplateApi.post(JSON.stringify(data), headers).then((response) => {
      console.log("Response ........", response)
      this.props.templateSelected(true)
    }).catch((error) => {
      alert("Error: " + error)
    })
  }

  render(){
    return(
      <CContainer>
        <h4 className='mt-4 text-center'>Create a perfect Invoice to match your brand</h4>
        <table className='mt-4' style={{width:'100%'}}>
          <tbody>
            <tr>
              <td></td>
              <td>
                <h4>Choose Your Template</h4>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <h4 className="text-center">Add your logo</h4>
                  <InvoiceLogoSelector></InvoiceLogoSelector>
                  {/* <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'50%', padding:30, margin:'auto'}} onClick={() => this.refs.fileUploader.click()}>
                    <input type="file" id="file" ref="fileUploader" style={{display: "none"}} multiple={false} onChange={(e) => console.log("eeee", e.target.files)}/>
                    <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
                      <img src={uploadImg} style={{height:50, width:50}}></img>
                    </div>
                    <p className="text-center p-6">
                      Browse or drop your logo here.Maximum 5MB in size.JPG,PNG, or GIF formats
                    </p>
                  </div> */}
                </div>
              </td>
              <td className="" style={{height:500, width:500}} rowSpan={2}>
                <CCarousel onSlideChange={(e) => this.templateChange(e)} style={{width:450}}>
                  <CCarouselInner>
                    <CCarouselItem>
                      <img className="d-block w-100" src={Invoice1} alt="slide 1"/>
                    </CCarouselItem>
                    <CCarouselItem>
                      <img className="d-block w-100" src={Invoice2} alt="slide 2"/>
                    </CCarouselItem>
                    <CCarouselItem>
                      <img className="d-block w-100" src={Invoice3} alt="slide 3"/>
                    </CCarouselItem>
                  </CCarouselInner>
                  <CCarouselControl style={{color:'black'}} direction="prev"/>
                  <CCarouselControl direction="next"/>
                </CCarousel>
              </td>
            </tr>
            <tr>
              <td>
              <h4 className="text-center">Pick Your Accent Color</h4>
                <div style={{display: 'flex',justifyContent: 'center',border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'50%', padding:30, margin:'auto'}}>
                  <ChromePicker
                  color={this.state.accentColor}
                  onChangeComplete={(color) => this.setState({accentColor:color.hex})}></ChromePicker>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
              <CButton
              disabled={this.state.loader}
                    onMouseEnter={() => this.setState({nextButtonBgColor: Colors.themeGreen})} 
                    onMouseLeave={() => this.setState({nextButtonBgColor: Colors.themeDark})} 
                    onClick={this.handleTemplateSelection}
                    style={{margin:10,width:'100%', backgroundColor: this.state.nextButtonBgColor, color: Colors.lightText}} 
                    >{this.state.loader? <CSpinner size="sm"></CSpinner>: ''}Looks Great, Let's Go</CButton>
              </td>
            </tr>
          </tbody>
        </table>
      </CContainer>
    )
  }
}

export default SelectTemplates