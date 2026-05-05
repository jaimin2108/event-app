import React from 'react'
import'./Booking.css'
function Booking() {
  return (
    <div className='iplevent'>
        <img src="https://ipladvertising.com/ipladvertising/img/ipl-banner-12.jpg" alt="IPL Banner" width="100%" height="500px"/>
    <div className='iplcontent'>
        <div className='iplheading'>
          <h1>INDIAN PREMIER LEAGUE</h1>
          <h4>R.s 4999</h4>
        </div>
     <div className='bookticket'>
          <button>Book Ticket</button>
     </div>
    </div>  
    <div className='whenwhere'>
          <p>Indian Premium League</p>
          <h2>When And Where</h2>
          <h3>Date And Time</h3>
          <p>Start Date : 25 June, 2025 <br/> Start Time : 07:30 pm</p>
          <h3>Location</h3>
          <p>Narendra Modi Stadium,<br/>Motera ,Ahmedabad</p>
    </div>
   </div>
       

  
  )
}

export default Booking
