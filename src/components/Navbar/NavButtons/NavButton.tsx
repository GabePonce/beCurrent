import React from 'react'
import './NavButton.css'

interface Props {
  children: string;
  onClick: () => void;
}

const NavButton = ({children, onClick}: Props) => {
  return (
    <>
      <button className='navButtons' onClick={onClick}><img src={"./src/assets/" + children} width="32vw" height="32vw"/></button>
    </>
  )
}

export default NavButton