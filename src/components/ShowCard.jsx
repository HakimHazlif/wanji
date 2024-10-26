import React from 'react'
import RateCircle from './RateCircle';

const ShowCard = (props) => {
  const { id, title, image, releaseDate, rate } = props;
  return (
    <div className='w-60 bg-slate-100 rounded-lg overflow-hidden'>
      <div className='relative'>
        <img src={image} alt="movie poster" className='relative'/>
        <div className='absolute bottom-[-16px] right-[15px]'>
          <RateCircle rate={rate} />
        </div>
      </div>
      <div className='flex flex-col gap-2 px-3 my-4'>
        <h2 className='text-lg font-medium'>{title}</h2>
        <h3 className='text-sm text-gray-700'>{releaseDate}</h3>
      </div>
    </div>
  )
}

export default ShowCard