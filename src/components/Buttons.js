import { CButton, CSpinner } from '@coreui/react'
import React, {useState} from 'react'
import Colors from '../config/Colors'

function DarkThemeButton({click, label, style, disabled}){
  const [bgColor, setBgColor] = useState(Colors.themeDark)
  return (
    <CButton shape="pill"
    onMouseEnter={() => setBgColor(Colors.themeGreen)} 
    onMouseLeave={() => setBgColor(Colors.themeDark)} 
    disabled={disabled}
    onClick={click} 
    style={Object.assign({backgroundColor: bgColor, color: Colors.lightText}, style)} >
      {
        disabled?
        <CSpinner></CSpinner>
        : null
      }
      {label}
    </CButton>
  )
}

export default DarkThemeButton