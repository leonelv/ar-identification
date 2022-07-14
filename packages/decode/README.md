
# @ar-identification/decode


A decoder for the Argentinian DNI PDF417


## Installation


```bash
yarn add @ar-identification/decode@0.1.0
```
    
## Usage/Examples

The library includes a function called `dniDecoder` which decodes the data from the PDF417 code.

### The DNI Object

| prop  | type signature  | description  |
|---|---|---|
| `name` |  `string` |  Nombre / Name |
| `surname`  |  `string` |  Apellido / Surname |
| `dateOfBirth`  | `Date`  | Fecha de nacimiento / Date of birth  |
| `dateOfIssue`  | `Date`  | Fecha de emisión / Date of issue  |
| `dateOfExpiry`  | `Date`  | Fecha de vencimiento / Date of expiry |
| `copy`  | `string`  | Ejemplar |
| `sex`  | `"MALE" \| "FEMALE" \| "NON_BINARY"`  | Sexo / Sex  |
| `dni`  | `string`  | Documento / Document |
| `cuil`  | `string`  | CUIL |
| `id`  | `string`  | Tramite N° / Of. Ident |


### Implementation
```tsx
import { dniDecoder } from "@ar-identification/decode";

const dni = await decode("00123456789@PITO@ELSA@F@1234567@B@22/11/1998@12/03/2018@204"); //returns a DNI object
```

