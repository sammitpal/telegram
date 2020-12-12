import { Avatar } from "@material-ui/core";
import { Call, ExpandMore, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { db } from "./firebase";
import Footer from "./Footer";
import { useStateValue } from "./StateProvider";
function Chat() {
  const {userid} = useParams();
  const [person, setPerson] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();
  useEffect(() => {
    if(userid){
      db.collection('users').doc(userid).onSnapshot(snapshot => (
        setPerson(snapshot.data().username)
      ))
      db.collection('users').doc(userid).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data()))
      ))
    }
  }, [userid])
  console.log(messages);
  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header_user">
          <Avatar />
          <h3>{person}</h3>
        </div>
        <div className="chat_header_icons">
          <Call />
          <Search />
          <ExpandMore />
        </div>
      </div>
      <div className="chat_block">
         {messages.map(message => (
            <p className={`chat_reciever ${message.muser===user.displayName && 'chat_sender'}`}>{message.message}</p>
         ))}
      </div>
      <div class="chat_footer">
        <Footer />
      </div>
    </div>
  );
}

export default Chat;
