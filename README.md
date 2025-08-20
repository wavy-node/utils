# @wavynode/utils

A set of utilities for integrating WavyNode.

## Installation

```bash
npm install @wavynode/utils
```

## Usage
> A complete example can be found in the [template repo](https://github.com/wavy-node/integration)

```typescript
import { validateSignature } from '@wavynode/utils'

const isValid = validateSignature({
  method: 'POST',
  path: '/v1/users',
  body: { name: 'John Doe' },
  timestamp: Date.now(),
  signature: 'some-signature',
  secret: 'your-secret',
})

if (isValid) {
  // The signature is valid
}
```

## API

### `validateSignature(params)`

Validates the signature sent with each request.

**Parameters**

*   `params.method`: The HTTP method of the request (`GET` or `POST`).
*   `params.path`: The path of the request.
*   `params.body`: The body of the request. Use `{}` if empty.
*   `params.timestamp`: The timestamp of the request.
*   `params.signature`: The signature sent with the request.
*   `params.secret`: Your secret from environment variables.
*   `params.timeTolerance` (optional): The time tolerance for the signature in milliseconds. Defaults to 5 minutes.

**Returns**

A boolean indicating whether the signature is valid.

### `createHmacSignature(message, secret)`

Creates a base64 hmac signature for the given message using the secret.

**Parameters**

*   `message`: The message to sign.
*   `secret`: Your secret.

**Returns**

The base64 hmac signature.

### `formCanonicalMessage(params)`

Creates a unique message to be signed for each request.

**Parameters**

*   `params.method`: The HTTP method of the request (`GET` or `POST`).
*   `params.path`: The path of the request.
*   `params.body`: The body of the request. Use `{}` if empty.
*   `params.timestamp`: The timestamp of the request.

**Returns**

A unique message to be signed.
