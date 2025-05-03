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
import { Form } from "../ui";
import { FormEvent, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";

export const LandingPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    navigate("/register", { state: email });
  };

  const handleViewGroups = () => navigate("/new-groups");

  return (
    <Box>
      <Box textAlign="center">
        <Heading size="2xl" mt={4}>
          HiveApp
        </Heading>
        <Image src={logo} w={20} h={20} mx="auto" my={4} />
        <Heading size="lg">Create an account</Heading>
        <Text>Enter your email to sign up for this app</Text>
      </Box>
      <Form onSubmit={handleContinue} mt={5}>
        <Input
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button w="full" type="submit" mt={4}>
          Continue
        </Button>
      </Form>
      <HStack my={5}>
        <Separator flex="1" />
        <Text flexShrink="0" color="fg.subtle">
          or
        </Text>
        <Separator flex="1" />
      </HStack>
      <Button w="full" variant="subtle">
        <FaGoogle />
        Continue with Google
      </Button>
      <Box my={5} textAlign="center" color="fg.subtle">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>
      </Box>
      <Button w="full" onClick={handleViewGroups}>
        View groups
      </Button>
    </Box>
  );
};
