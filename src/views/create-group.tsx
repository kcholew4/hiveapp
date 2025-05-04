import { Box, Button, Field, Heading, Input } from "@chakra-ui/react";
import { Form, toaster } from "../ui";
import { useCreateGroup } from "../hooks";
import { useSession } from "../contexts";
import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateGroup = () => {
  const navigate = useNavigate();
  const { uid } = useSession();
  const { createGroup, isLoading } = useCreateGroup({
    onSuccess: () => {
      navigate(-1);
      toaster.success({ description: "Group was successfully created" });
    },
    onError: () =>
      toaster.error({ description: "There was an error creating group" }),
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Box>
      <Heading>New group</Heading>
      <Form
        mt={6}
        spaceY={4}
        onSubmit={(e) => {
          e.preventDefault();
          createGroup(uid, { name, description });
        }}
      >
        <Field.Root required>
          <Field.Label>
            Name <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="Name"
            variant="outline"
            onChange={(e) => setName(e.target.value)}
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label>
            Description <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="Description"
            variant="outline"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field.Root>
        <Button type="submit" w="full" loading={isLoading}>
          Create group
        </Button>
      </Form>
    </Box>
  );
};
