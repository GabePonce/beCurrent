import React from 'react'

interface Props {
  children: string;
  onClick: () => void;
  style?: React.CSSProperties
}

const CustomButton = ({children, onClick, style}: Props) => {
  return (
    <button className="custom-buttons" style={{fontSize: "1.5em", border: "none", borderRadius: "0.4vw", color: "#ece9da", padding: "0.3em 1em", ...style}}>{children}</button>
  )
}

export default CustomButton