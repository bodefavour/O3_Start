import { createThirdwebClient } from "thirdweb";
import { config } from "@/lib/config";

// Create and export the thirdweb client using configuration
export const thirdwebClient = createThirdwebClient({
  clientId: config.thirdweb.clientId,
});

// Re-export commonly used thirdweb utilities
export { createThirdwebClient, defineChain } from "thirdweb";
