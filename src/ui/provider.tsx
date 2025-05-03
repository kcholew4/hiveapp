import { ReactNode } from "react";
import PWABadge from "../PWABadge.tsx";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { system } from "../theme/theme.ts";

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  return (
    <ChakraProvider value={system}>
      <Flex justify="center" p={4}>
        <Box maxWidth="720px" flexGrow={1}>
          {children}
        </Box>
      </Flex>
      <PWABadge />
    </ChakraProvider>
  );
};
