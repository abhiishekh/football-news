
"use client"

import axios from 'axios'
import React, { useEffect } from 'react'

const news = () => {
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get('https://newsapi.org/v2/');
            if(response){

                console.log(response)
            }else{

                console.log("data not found ")
                return
            }
        }

        fetchData()
    },[])

    
}

export default news