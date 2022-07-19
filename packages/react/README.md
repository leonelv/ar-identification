# @ar-identification/react

An scanner for Argentinian DNI's.

## Installation

```bash
yarn add @zxing/browser@^0.1.1 @zxing/library@^0.19.1 @ar-identification/decode@0.1.0 @ar-identification/react@0.2.0
```

## Usage/Examples

The library includes a component called `Scanner` which scans **only the front** of the DNI at the moment.
Also has the ability to read and validate QR codes.

### Props

| prop             | type signature                      | description                                   |
| ---------------- | ----------------------------------- | --------------------------------------------- |
| `onScanSuccess`  | `(event: SuccessEvent) => void`     | callback triggered on a successful scan       |
| `onScanError`    | `(error: Error) => void`            | callback triggered on any error               |
| `className`      | `string \| undefined`               | an optional string containing css classes     |
| `allowQR`        | `boolean`                           | an optional boolean to allow QR codes reading |
| `QRValidationFn` | `(data:string) => Promise<boolean>` | an optional async fn to validate the QR data  |

### The DNI Object

| prop           | type signature                       | description                           |
| -------------- | ------------------------------------ | ------------------------------------- |
| `name`         | `string`                             | Nombre / Name                         |
| `surname`      | `string`                             | Apellido / Surname                    |
| `dateOfBirth`  | `Date`                               | Fecha de nacimiento / Date of birth   |
| `dateOfIssue`  | `Date`                               | Fecha de emisión / Date of issue      |
| `dateOfExpiry` | `Date`                               | Fecha de vencimiento / Date of expiry |
| `copy`         | `string`                             | Ejemplar                              |
| `sex`          | `"MALE" \| "FEMALE" \| "NON_BINARY"` | Sexo / Sex                            |
| `dni`          | `string`                             | Documento / Document                  |
| `cuil`         | `string`                             | CUIL                                  |
| `id`           | `string`                             | Tramite N° / Of. Ident                |

### Implementation

```tsx
import React, { useState } from "react";
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
      return !!parsedJSON.test;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {dni && <pre style={{ fontFamily: "monospace" }}>{JSON.stringify(dni, null, 2)}</pre>}
      {qr && <pre style={{ fontFamily: "monospace" }}>{JSON.stringify(JSON.parse(qr), null, 2)}</pre>}
      {!dni && !error && !qr && (
        <Scanner onScanSuccess={handleSuccess} onScanError={handleOnScanError} allowQR QRValidationFn={qrValidator} />
      )}
      {(error || dni || qr) && <button onClick={handleRetry}>Retry</button>}
    </div>
  );
};

export default App;
```
