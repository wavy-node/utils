import crypto from 'node:crypto'
import type { IFormCanonicalMessageParams, IValidateSignatureParams } from '../types'

/**
	* Creates a base64 hmac signature for the given message using the secret
*/
export const createHmacSignature = (message: string, secret: string): string => {
	const hmac = crypto.createHmac('sha256', secret)
	hmac.update(message)

	return hmac.digest('base64')
}

/**
	* Creates a unique message to be signed for each request
*/
export const formCanonicalMessage = ({ method, path, body, timestamp }: IFormCanonicalMessageParams): string => {
	const sortedBody = sortObjectAlphabetically(body)
	return `${method.toUpperCase()}::${path.toLowerCase()}::${JSON.stringify(sortedBody)}::${timestamp}`
}

/**
	* Forms the canonical signed message, signs it and compares both signatures. 
	* Returns true if equal
*/
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

/**
	* Sorts object keys alphabetically to ensure correct serialization
*/
const sortObjectAlphabetically = <T extends Record<string, any>>(obj: T): T => {
	const sortedKeys = Object
		.keys(obj)
		.sort()

	const sortedObject = {} as T

	for (const key of sortedKeys) {
		if (typeof obj[key] === 'object' && obj[key] != null && !Array.isArray(obj[key])) {
			// sort nested objects
			sortedObject[key as keyof T] = sortObjectAlphabetically(obj[key])
			continue
		}
		sortedObject[key as keyof T] = obj[key]
	}

	return sortedObject
}
