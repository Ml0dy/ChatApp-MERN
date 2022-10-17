import { Avatar, Tooltip } from "@chakra-ui/react"
import { m } from "framer-motion"
import React from "react"
import ScrollableFeed from "react-scrollable-feed"
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics"
import { ChatState } from "../Context/ChatProvider"

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState()

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div style={{ display: "flex" }} key={message._id}>
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender.image}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  message.sender._id === user._id ? "#A1EBC0" : "#A1D3EB"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user._id
                ),
                marginTop: isSameUser(messages, message, index) ? 3 : 10,
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
