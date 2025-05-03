import { Button, chakra, Flex, Heading, Image } from "@chakra-ui/react";
import logo from "../assets/logo.svg";

type AppLogoProps = {
  onClick?: () => void;
  className?: string;
};

export const AppLogo = chakra(({ onClick, className }: AppLogoProps) => {
  return (
    <Button unstyled onClick={onClick} className={className}>
      <Flex gap={2} align="center">
        <Image src={logo} w={10} h={10} />
        <Heading>HiveApp</Heading>
      </Flex>
    </Button>
  );
});
