import React from 'react'
import moment from 'moment'



const CountdownTime = ({trip}) => {

  const departureTime = moment("1982-5-25").countdown().toString();

  console.log(departureTime)

  
    return (
      <>
      
      </>
  )
}

export default CountdownTime