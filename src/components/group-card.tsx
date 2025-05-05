import { Button, Card } from "@chakra-ui/react";

type GroupCardProps = {
  name: string;
  description: string;
  canEnter?: boolean;
  onEnter?: () => void;
  onJoin?: () => void;
  loading?: boolean;
};

export const GroupCard = ({
  name,
  description,
  canEnter,
  onEnter,
  onJoin,
  loading,
}: GroupCardProps) => {
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
          <Button
            size="sm"
            variant="subtle"
            onClick={onEnter}
            loading={loading}
          >
            Enter
          </Button>
        ) : (
          <Button size="sm" onClick={onJoin} loading={loading}>
            Join group
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
};
