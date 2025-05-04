import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Link,
  Separator,
  Text,
  Image,
} from "@chakra-ui/react";
import { Form, toaster } from "../ui";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import { useCredentialsSignUp, useGoogleLogIn } from "../hooks";

export const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, isLoading: isCredentialsLoading } = useCredentialsSignUp({
    onSuccess: () => navigate("/profile-details"),
    onEmailInUse: () =>
      toaster.create({
        type: "error",
        description: "Email is already in use",
      }),
    onError: () =>
      toaster.create({
        type: "error",
        description: "There was an error creating account",
      }),
  });

  const { logInWithGoogle, isLoading: isGoogleLoading } = useGoogleLogIn({
    onSuccess: () => navigate("/profile-details"),
    onError: () =>
      toaster.create({
        type: "error",
        description: "There was an error creating account",
      }),
  });

  return (
    <Box>
      <Box textAlign="center">
        <Heading size="2xl" mt={4}>
          HiveApp
        </Heading>
        <Image src={logo} w={20} h={20} mx="auto" my={4} />
        <Heading size="lg">Create an account</Heading>
        <Text>
          Enter your email and password to create new account. Already have an
          account? <Link>Log In</Link>.
        </Text>
      </Box>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          signUp(email, password);
        }}
        mt={5}
      >
        <Input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          mt={3}
        />
        <Button w="full" type="submit" mt={4} loading={isCredentialsLoading}>
          Sign Up
        </Button>
      </Form>
      <HStack my={5}>
        <Separator flex="1" />
        <Text flexShrink="0" color="fg.subtle">
          or
        </Text>
        <Separator flex="1" />
      </HStack>
      <Button
        w="full"
        variant="subtle"
        onClick={logInWithGoogle}
        loading={isGoogleLoading}
      >
        <FaGoogle />
        Continue with Google
      </Button>
      <Box my={5} textAlign="center" color="fg.subtle">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>
      </Box>
    </Box>
  );
};
