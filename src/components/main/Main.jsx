import React from 'react'
import Navbar from '../navbar/Navbar'
import "./main.css"
import Card from '../card/Card'

const Main = () => {
  return (
    <div className='main'>
      <Navbar />
      <hr />
      <Card/>
    </div>
  )
}

export default Main
