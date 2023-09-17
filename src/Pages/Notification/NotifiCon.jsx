import React from 'react'
import Notification from '../../Components/Notification/Notification'
import "./Noticon.css"
import Topbar from '../../Components/Topbar/Topbar'

export default function NotifiCon() {
  return (
   <div className="notificaton">
     <Topbar />
     <div className="notificationWrapper">
        <Notification />
    </div>
   </div>
  )
}
