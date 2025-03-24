import React from 'react'
import './CustomButton.css'

interface Props {
  children: string;
  onClick: () => void;
  style?: React.CSSProperties;
  disable: boolean;
}

const CustomButton = ({children, onClick, style, disable}: Props) => {
  return (
    <button className="custom-buttons" style={{...style}} disabled={disable}>{children}</button>
  )
}

export default CustomButton