import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [show, setShow] = useState(false)
  const toast = useToast()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const submitHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      )
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)

      history.push("/chats")
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
    }
    window.location.reload()
  }

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="green"
        width="100%"
        color="white"
        onClick={submitHandler}
        isLoading={loading}
        style={{ marginTop: 15 }}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@guest.com")
          setPassword("12345678")
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
