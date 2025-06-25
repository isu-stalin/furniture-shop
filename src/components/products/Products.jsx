import React from 'react'
import ProductItem from './ProductItem'

const Skeleton = ({count}) => {
  return <>
  {Array(count).fill().map((_, inx) => (
    <div key={inx}>
      <div className='h-[285px] bg-gray-100'></div>
      <div className='w-10/12 h-6 bg-gray-100 mt-2'></div>
      <div className='w-6/12 h-6 bg-gray-100 mt-2'></div>
      <div className='w-1/3 h-6 bg-gray-100 mt-2'></div>
    </div>
  ))}
  </>
}

const Products = ({data, loading, count}) => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-6 px-3 py-8 pl-10'>
      {
        loading ? <Skeleton count={count}/> :
        data?.map((product) => (
          <ProductItem key={product.id} {...product}/>
        ))
      }
    </div>
  )
}

export default React.memo(Products)