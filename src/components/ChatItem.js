import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import './ChatItem.css'
function ChatItem({id, username}) {
    return (
        <Link to = {`/user/${id}`} className="chatItem">
            <Avatar/>
    <h3>{username}</h3>
        </Link>
    )
}

export default ChatItem
