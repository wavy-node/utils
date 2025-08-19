import crypto from 'node:crypto'

/**
	* Creates a base64 hmac signature for the given message using the secret
*/
export const createHmacSignature = (message: string, secret?: string): string => {
	if (!secret) throw new Error('secret is not defined')

	const hmac = crypto.createHmac('sha256', secret)
	hmac.update(message)

	return hmac.digest('base64')
}

export interface IFormCanonicalMessageParams {
	method: "GET" | "POST",
	/**
		* The path of the request:
		* i.e. for the url `https://foo.bar/v1/users/45?someQueryParam=true`, the path would be 
		* `/v1/users/45`
	*/
	path: string,
	/**
		* The body of the request, use `{}` if empty
	*/
	body: object,
	timestamp: number
}

/**
	* Creates a unique message to be signed for each request
*/
export const formCanonicalMessage = ({ method, path, body, timestamp }: IFormCanonicalMessageParams): string => {
	return `${method.toUpperCase()}::${path.toLowerCase()}::${JSON.stringify(body)}::${timestamp}`
}

interface IValidateSignatureParams extends IFormCanonicalMessageParams {
	/**
		* Signature sent with each request, can be found in the header `x-wavynode-hmac` 
	*/
	signature: string,
	/**
		* From env variables
	*/
	secret?: string,
	/**
		* Time tolerance for this signature in ms, defaults to 5 minutes
	*/
	timeTolerance?: number
}

export const validateSignature = ({
	method,
	path,
	body,
	timestamp,
	signature,
	secret,
	timeTolerance = 300_000
}: IValidateSignatureParams): boolean => {
	// check time validity
	const currentTime = Date.now()
	if (Math.abs(currentTime - timestamp) > timeTolerance) return false

	const canonicalMessage = formCanonicalMessage({ method, path, body, timestamp })
	const hmacSignature = createHmacSignature(canonicalMessage, secret)

	return hmacSignature === signature
}
