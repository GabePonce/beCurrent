import React from 'react'

interface Props {
  children: string;
  onClick: () => void;
}

const NavButton = ({children, onClick}: Props) => {
  return (
    <>
      <button style={{fontSize: "1em", borderRadius: "1vw", border: "0.5vw solid transparent", padding: "0.75vw"}}><img src={"./src/assets/" + children} width="32vw" height="32vw"/></button>
    </>
  )
}

export default NavButton