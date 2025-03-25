import './MessagingText.css'
import { useUserStore } from '../../../stores/userStore'
import { useChatStore } from '../../../stores/chatStore'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useHangoutStore } from '../../../stores/hangoutStore'

const MessagingText = () => {

  const [chat, setChat] = useState()
  const [text, setText] = useState("")

  const { currentUser } = useUserStore()
  const { chatId } = useChatStore()
  const { attendees } = useHangoutStore()

  const endRef = useRef(null);
  useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", chatId), (res)=>{
        setChat(res.data())
    })

    return ()=>{
        unSub()
    }
  },[chatId])

  const handleSend = async ()=>{
    if (text === "") return

    try {

      await updateDoc(doc(db,"chats",chatId), {
          messages:arrayUnion({
              senderId: currentUser.id,
              text,
              createdAt: new Date()
          })
      })
    } catch (err) {
        console.log(err)
    }

    setText("")
  }

  const handleMessageUser = async (msId)=>{
    // *possibly add .array after attendees*
    attendees.forEach(user => {
      if (user.id === msId){
        return user.username
      }
    });
  }

  return (
    <div className="chat">
        <div className="center">
            {chat?.messages?.map((message)=>(
            <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>
                <h4>{handleMessageUser(message.senderId)}</h4>
                <div className="text">
                    <p>
                        {
                            message.text
                        }
                    </p>
                </div>                
            </div>
            ))}
            
            <div ref={endRef}></div>
        </div>
        <div className="bottom">
            <input 
                type="text" 
                placeholder="Type a message ...." 
                value={text}
                onChange={e=>setText(e.target.value)}
            />
            <button className="sendButton" onClick={handleSend}> Send</button>
        </div>
    </div>
  )
}


export default MessagingText