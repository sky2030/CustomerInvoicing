import { CButton } from '@coreui/react'
import React, {useState} from 'react'
import Colors from '../config/Colors'

function DarkThemeButton({click, label, style}){
  const [bgColor, setBgColor] = useState(Colors.themeDark)
  return (
    <CButton shape="pill"
    onMouseEnter={() => setBgColor(Colors.themeGreen)} 
    onMouseLeave={() => setBgColor(Colors.themeDark)} 
    onClick={click} 
    style={Object.assign({backgroundColor: bgColor, color: Colors.lightText}, style)} >
      {label}
    </CButton>
  )
}

export default DarkThemeButton