import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./recipes/button";

const config = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
