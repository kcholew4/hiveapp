import { Button, Card } from "@chakra-ui/react";

type GroupCardProps = {
  name: string;
  description: string;
  canEnter?: boolean;
};

export const GroupCard = ({ name, description, canEnter }: GroupCardProps) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        {canEnter ? (
          <Button size="sm" variant="subtle">
            Enter
          </Button>
        ) : (
          <Button size="sm">Join group</Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
};
