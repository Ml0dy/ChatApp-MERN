import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmed, setPasswordConfirmed] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const toast = useToast()
  const history = useHistory()

  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !passwordConfirmed) {
      toast({
        title: "Please Fill all Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
      return
    }

    if (password !== passwordConfirmed) {
      toast({
        title: "Passwords Do Not Match ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      return
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      if (image === "")
        setImage(
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        )

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          image,
        },
        config
      )
      toast({
        title: "Registration Succesful",
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
        title: "Error Ocured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
    }
  }

  const postDetails = (picture) => {
    setLoading(true)
    if (picture === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      return
    }

    if (
      picture.type === "image/jpeg" ||
      picture.type === "image/png" ||
      picture.type === "image/jpg"
    ) {
      const data = new FormData()
      data.append("file", picture)
      data.append("upload_preset", "chat-app")
      data.append("cloud_name", "drll4jv2q")
      fetch("https://api.cloudinary.com/v1_1/drll4jv2q/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString())
          setLoading(false)
        })
        .catch((err) => {
          console.log(err.message)
          setLoading(false)
        })
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
      return
    }
  }

  return (
    <VStack spacing="5px">
      <FormControl id="firstName" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>
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
            type={isPasswordShow ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setIsPasswordShow(!isPasswordShow)}
            >
              {isPasswordShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={isPasswordShow ? "text" : "password"}
            placeholder="Enter your password again"
            onChange={(e) => setPasswordConfirmed(e.target.value)}
            value={passwordConfirmed}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setIsPasswordShow(!isPasswordShow)}
            >
              {isPasswordShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload your image</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="green"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
