import React from 'react'

const ShopSidebar = () => {
    return (
        <div className=' p-6 w-64 h-full bg-gradient-to-br from-white to-blue-500 rounded-r-xl text-black overflow-y-auto'>

            <h1 className='text-2xl capitalize font-bold '>football jersey</h1>
            <div className='my-2 capitalize'>
                <p>short sleeve shirt</p>
                <p>long sleeve shirt</p>
                <p>sleeveless Tank tops</p>
                <p>polo</p>
            </div>
            <h1 className='text-2xl capitalize font-bold '>gender</h1>
            <div className='my-2 capitalize'>
                <div className='flex gap-2'>

                    <input type="checkbox" />
                    <label htmlFor="">male</label>
                </div>
                <div className='flex gap-2'>

                    <input type="checkbox" />
                    <label htmlFor="">female</label>
                </div>

            </div>

            {/* // kids or boys ? */}
            <h1 className='text-2xl capitalize font-bold '>gender</h1>
            <div className='my-2 capitalize'>
                <div className='flex gap-2'>

                    <input type="checkbox" />
                    <label htmlFor="">boys</label>
                </div>
                <div className='flex gap-2'>

                    <input type="checkbox" />
                    <label htmlFor="">girls</label>
                </div>

            </div>


            <h1 className='text-2xl capitalize font-bold mt-8' >sale & offers</h1>

        </div>
    )
}

export default ShopSidebar