import React from 'react'

const RateCircle = ({ rate }) => {

  function ratePercentage() {
    const rateNum = Number(rate) * 10;
    return `${rateNum}%`
  }

  return (
    <div className='rounded-full w-[100px] h-[100px] flex justify-center items-center text-sm text-black' style={{'background': `conic-gradient(clac(ratePercentage()*3.6deg), orange, blue))`}}>
      <div className='relative font-bold'>{ratePercentage()}</div>
    </div>
  )
}

export default RateCircle