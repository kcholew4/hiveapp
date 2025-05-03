import { Box, Button, Field, Heading, Input, Textarea } from "@chakra-ui/react";
import { Form } from "../ui";
import { useLocation, useNavigate } from "react-router";
import { FormEvent, useState } from "react";

export const Register = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(state ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Box>
      <Heading>Register</Heading>
      <Form spaceY={4} mt={6} onSubmit={handleSubmit}>
        <Field.Root>
          <Field.Label>
            First Name <Field.RequiredIndicator />
          </Field.Label>
          <Input variant="outline" />
        </Field.Root>
        <Field.Root>
          <Field.Label>
            Last Name <Field.RequiredIndicator />
          </Field.Label>
          <Input variant="outline" />
        </Field.Root>
        <Field.Root>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            variant="outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>
            Password <Field.RequiredIndicator />
          </Field.Label>
          <Input variant="outline" type="password" />
        </Field.Root>
        <Field.Root>
          <Field.Label>
            Bio <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            placeholder="Type anything you want here..."
            variant="outline"
          />
        </Field.Root>
        <Button w="full" type="submit">
          Submit
        </Button>
      </Form>
    </Box>
  );
};
