import { Button, Card } from "@chakra-ui/react";

type GroupCardProps = {
  title: string;
  description: string;
};

export const GroupCard = ({ title, description }: GroupCardProps) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Join group</Button>
      </Card.Footer>
    </Card.Root>
  );
};
