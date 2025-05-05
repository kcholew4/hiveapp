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
  Alert,
} from "@chakra-ui/react";
import { Form, toaster } from "../ui";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import { useCredentialsLogIn, useGoogleLogIn } from "../hooks";

export const LandingPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn, isLoading: isCredentialsLoading } = useCredentialsLogIn({
    onSuccess: () => navigate("/dashboard"),
    onInvalidCredentials: () =>
      toaster.create({
        type: "error",
        description: "Invalid email or password",
      }),
    onError: () =>
      toaster.create({
        type: "error",
        description: "There was an error logging in",
      }),
  });

  const { logInWithGoogle, isLoading: isGoogleLoading } = useGoogleLogIn({
    onSuccess: () => navigate("/dashboard"),
    onError: () =>
      toaster.create({
        type: "error",
        description: "There was an error logging in",
      }),
  });

  return (
    <Box>
      <Box textAlign="center">
        <Heading size="2xl" mt={4}>
          HiveApp
        </Heading>
        <Image src={logo} w={20} h={20} mx="auto" my={4} />
        <Heading size="lg">Login</Heading>
        <Text>
          Use your credentials to log in. Don't have an account?{" "}
          <Link href="#">Create new account</Link>.
        </Text>
      </Box>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          logIn(email, password);
        }}
        mt={5}
      >
        {__CREDENTIALS_DISABLED__ && (
          <Alert.Root status="warning" my={4}>
            <Alert.Indicator />
            <Alert.Title>Using credentials is currently disabled</Alert.Title>
          </Alert.Root>
        )}
        <Input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          mt={3}
        />
        <Button w="full" type="submit" mt={4} loading={isCredentialsLoading}>
          Log In
        </Button>
      </Form>
      <Button
        variant="subtle"
        w="full"
        mt={4}
        onClick={() => navigate("/sign-up")}
      >
        Create new account
      </Button>
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
