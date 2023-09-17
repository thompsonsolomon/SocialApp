import React from 'react'
import ChartNav from './ChartNav'
import ChatSearch from './ChatSearch'
import ChartFriends from './ChartFriends'

export default function ChartfeedSideBAr() {
  return (
    <div className="ChartfeedSideBAr">
        <ChartNav />
        <ChatSearch />
        <ChartFriends />
      </div>
  )
}
