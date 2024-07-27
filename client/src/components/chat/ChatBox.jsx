import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import { Stack } from "react-bootstrap"
import moment from "moment"
import InputEmojiWithRef from "react-input-emoji"

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat, messages, isMessagesLoading, messagesError, updateCurrentChat, sendTextMessage} = useContext(ChatContext)
    const {recipientUser} = useFetchRecipientUser(currentChat, user)
    const [ textMessage, setTextMessage ] = useState("")
    const scroll = useRef();

    console.log("text:", textMessage);
    console.log("currentChat:", currentChat);
    console.log("messages:", messages);
    console.log("recipientUser:", recipientUser);
    
    useEffect(() => {
        scroll.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                return
            } else {
                e.preventDefault() // Prevent default Enter behavior (new line)
                sendTextMessage(textMessage, user, currentChat._id, setTextMessage)   
            }
        }
    }

    if (!user){
        return <p style={{textAlign: "center", width: "100%"}}>Loading User...</p>
    }

    if(!recipientUser)
        return (
            <p style={{ textAlign: "center", width: "100%"}}>
                No Conversation Selected Yet...
            </p>
        )

    if(isMessagesLoading)
        return (
            <p style={{ textAlign: "center", width: "100%"}}>
                Loading...
            </p>
        )

    return( 
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipientUser?.name}</strong>
            </div>
            <Stack gap={3}  className="messages">
                {messages  && messages.map((message, index) => (
                    <Stack key={index} 
                    className={`${
                        message?.senderId === user?._id
                         ? "message self align-self-end flex-grow-0"
                         : "message align-self-start flex-grow-0"
                    }`}
                    ref = {scroll}
                    >
                        <span>{message.text}</span>
                        <span className="message-footer">
                            {moment(message?.createdAt).calendar()}
                        </span>
                </Stack>
                ))}
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmojiWithRef value = {textMessage} onChange = {setTextMessage} onKeyDown={handleKeyDown} fontFamily="nuito" borderColor="72, 112, 223, 0.2" />
                <button className="send-btn" onClick={() => sendTextMessage(textMessage, user, currentChat._id,setTextMessage)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                </svg>
                </button>
            </Stack>
        </Stack>
        )
}

 
export default ChatBox