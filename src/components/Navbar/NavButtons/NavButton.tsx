import React from 'react'
import './NavButton.css'

interface Props {
  children: string;
  onClick: () => void;
}

const NavButton = ({children, onClick}: Props) => {
  return (
    <>
      <button className='navButtons' onClick={onClick}><img className='navImg' src={"./src/assets/" + children}/></button>
    </>
  )
}

export default NavButton