import { Button } from '@material-ui/core';
import { AttachFile, MicNone } from '@material-ui/icons'
import MoodIcon from '@material-ui/icons/Mood';
import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import './Footer.css'
import {db} from './firebase'
import {useStateValue} from './StateProvider';
import firebase from 'firebase';
import { useSpeechRecognition } from 'react-speech-kit';

function Footer() {
    const [input, setInput] = useState("");
    const [{user},dispatch] = useStateValue();
    console.log(input);
    const {userid} = useParams();
    const submitMessages = (e) =>{
        e.preventDefault();
        db.collection("users").doc(userid).collection('messages').add({
            message: input,
            muser: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
          setInput(result);
        },
      });
    return (
        <form className="footer">
            <AttachFile/>
            <input type="text" placeholder="Type your message here" value = {input} onChange={e=> setInput(e.target.value)}/>
            <MoodIcon/>
            <MicNone onClick={!listening?(listen):(stop)} className="footer_mic"/>
            <Button type="submit" className="footer_submit" onClick={submitMessages} disabled = {!input}>Submit</Button>
        </form>
    )
}

export default Footer
