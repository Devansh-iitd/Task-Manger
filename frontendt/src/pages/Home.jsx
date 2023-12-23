import React from 'react'
import Img from '../images/Img1.svg'

function Home() {
  return (
    <>
      <div className="flex justify-between items-center bg-gradient-to-r from-purple-300 to-purple-600">
        <div className="text-left pl-40">
          <h2 className="w-72 font-extrabold ">
            Simplify Your Life, One Task at a Time.
          </h2>
          <p className="font-medium text-lg w-48">
            Your all-in-one task management solution for productivity.
          </p>
        </div>
        <div>
          <img src={Img} />
        </div>
      </div>
    </>
  )
}

export default Home
