import React from 'react';
import { IoMdStats } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";

const Card = (props) => {
  return (
    <div className='flex items-center bg-white rounded-xl p-4'>
      <div className='flex-shrink-0 bg-[#F5F7FD] rounded-full p-4'>
        {
          props.isCurrency ? (
            <FaDollarSign className='w-6 h-6 text-[#0000FF]' />
            ) : (
            <IoMdStats className='w-6 h-6 text-[#0000FF]' />
          )
        }
      </div>
      <div className='ml-4'>
        <h3 className='text-sm'>{props.name}</h3>
        {props.isCurrency ? (
          <h3 className='text-lg font-bold'>&#36; {props.count}</h3>
        ) : (
          <h3 className='text-lg font-bold'>{props.count}</h3>
        )}
      </div>
    </div>
  );
};

export default Card;
