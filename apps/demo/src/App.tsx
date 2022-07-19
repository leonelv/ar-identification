import React, { useState } from "react";
import { Button, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { DNI } from "@ar-identification/decode";
import { Scanner, ScannerProps } from "@ar-identification/react";

const App = () => {
  const [dni, setDni] = useState<DNI>();
  const [error, setError] = useState<string>();
  const [qr, setQR] = useState<string>();
  const handleOnScanError = (e: Error) => setError(e.message);

  const handleRetry = () => {
    setError(undefined);
    setDni(undefined);
    setQR(undefined);
  };

  const handleSuccess: ScannerProps["onScanSuccess"] = ({ type, data }) => {
    if (type === "DNI") {
      setDni(data as DNI);
    } else {
      setQR(data as string);
    }
  };

  const qrValidator = async (data: string) => {
    try {
      const parsedJSON = JSON.parse(data) as any;
      return !!parsedJSON.eventTicket
    } catch (e) {
      console.log(e)
      return false;
    }
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
          {qr && <pre style={{ fontFamily: "monospace" }}>{JSON.stringify(JSON.parse(qr), null, 2)}</pre>}
          {!dni && !error && !qr && <Scanner onScanSuccess={handleSuccess} onScanError={handleOnScanError} allowQR QRValidationFn={qrValidator}/>}
          {(error || dni || qr) && (
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
