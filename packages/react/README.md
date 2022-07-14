# @ar-identification/react

An scanner for Argentinian DNI's.

## Installation

```bash
yarn add @zxing/browser@^0.1.1 @zxing/library@^0.19.1 @ar-identification/decode@0.1.0 @ar-identification/react@0.1.0
```

## Usage/Examples

The library includes a component called `DNIScanner` which scans **only the front** of the DNI at the moment.

### Props

| prop            | type signature           | description                               |
| --------------- | ------------------------ | ----------------------------------------- |
| `onScanSuccess` | `(dni: DNI) => void`     | callback triggered on a successful scan   |
| `onScanError`   | `(error: Error) => void` | callback triggered on any error           |
| `className`     | `string \| undefined`    | an optional string containing css classes |

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
import { DNIScanner } from "@ar-identification/react";

const App = () => {
  const [dni, setDni] = useState<DNI>();
  const [error, setError] = useState<Error>();

  const handleScanError = (e) => alert(JSON.stringify(e.message));

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {dni ? (
        <pre style={{ fontFamily: "monospace" }}>{JSON.stringify(dni, null, 2)}</pre>
      ) : (
        <DNIScanner onScanSuccess={setDni} onScanError={handleScanError} />
      )}
    </div>
  );
};

export default App;
```
