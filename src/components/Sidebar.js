import { Avatar, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import ChatItem from './ChatItem';
import {auth, db} from './firebase';
import './Sidebar.css'
import {useStateValue} from './StateProvider';
function Sidebar() {
    const [{user},dispatch] = useStateValue()
    const [teleusers, setUsers] = useState([]);
    useEffect(()=>{
        db.collection('users').onSnapshot(snapshot => (
            setUsers(snapshot.docs.map(doc=> (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    },[]);

    const newChat = () =>{
        const person = prompt("Enter Channel Name");
        if(person){
            db.collection('users').add({
                username: person
            })
        }
    }
    const show = () =>{
        var element = document.getElementById("profile");
        element.classList.toggle("profile");
    }
    const signOut = () => {
        auth.signOut();
    }
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <MenuIcon className="sidebar_menu" onClick={show}/>
                <input type="text" placeholder="search"/>
            </div>
            <div className="sidebar_chatList">
                {
                    teleusers.map(teleuser => (
                        <ChatItem username={teleuser.data.username} id={teleuser.id}/>
                    ))
                }
            </div>
            <button className="sidebar_fab" onClick={newChat}>
                <Add/>
            </button>
            <div id="profile" className="profile_default">
                <Avatar src={user.photoURL}/>
                <h3>{user.displayName}</h3>
                <Button variant="contained" className="sidebar_signOut" fullWidth="true" onClick={signOut}>Sign Out</Button>
            </div>
        </div>
    )
}

export default Sidebar
