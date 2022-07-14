import React, { useState } from "react";
import { Button, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { DNI } from "@ar-identification/decode";
import { DNIScanner } from "@ar-identification/react";

const App = () => {
  const [dni, setDni] = useState<DNI>();
  const [error, setError] = useState<string>();
  const handleOnScanError = (e: Error) => setError(e.message);

  const handleRetry = () => {
    setError(undefined);
    setDni(undefined);
  };

  return (
    <ChakraProvider>
      <Flex flexDir="column" minH="100vh">
        <Heading size="lg" bg="purple.100" p={4} textAlign="center">
          DNI Decoder
        </Heading>

        <Flex flex={1} bg="gray.50" justify="center" align="center" p={4} flexDir="column">
          {error && <p>{error}</p>}
          {dni && <pre style={{ fontFamily: "monospace" }}>{JSON.stringify(dni, null, 2)}</pre>}
          {!dni && !error && <DNIScanner onScanSuccess={setDni} onScanError={handleOnScanError} />}
          {(error || dni) && (
            <Button onClick={handleRetry} colorScheme="purple" w="full" mt={4}>
              Retry
            </Button>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
