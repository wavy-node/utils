import { describe, expect, it } from 'bun:test'
import { createHmacSignature, formCanonicalMessage, validateSignature } from '../src'

const secret = '48b6d360-a046-44d0-a967-2e29eff67de6'
const body1 = {
	somekey: true,
	date: 342432,
	anotherkey: {
		hello: 'kitty',
		someobj: {
			b: true,
			c: 'yes'
		},
		a: 'fdsafda'
	}
}
const body2 = {
	anotherkey: {
		a: 'fdsafda',
		hello: 'kitty',
		someobj: {
			c: 'yes',
			b: true,
		},
	},
	somekey: true,
	date: 342432,
}

describe('hmac tests', () => {
	it('should create hmac correctly', () => {
		const canonicalMessage = formCanonicalMessage({
			method: 'POST',
			path: '/webhook',
			body: body1,
			timestamp: Date.now()
		})
		const hmacSignature = createHmacSignature(canonicalMessage, secret)

		expect(hmacSignature).toBeString()
		expect(hmacSignature.length).toEqual(44)
	})
	it('should serialize body correctly', () => {
		const timestamp = Date.now()
		const canonicalMessage1 = formCanonicalMessage({
			method: 'POST',
			path: '/webhook',
			body: body1,
			timestamp
		})
		const canonicalMessage2 = formCanonicalMessage({
			method: 'POST',
			path: '/webhook',
			body: body2,
			timestamp
		})

		expect(canonicalMessage1).toEqual(canonicalMessage2)
	})

	it('should validate signatures correctly', () => {
		const timestamp = Date.now()
		const canonicalMessage = formCanonicalMessage({
			method: 'POST',
			path: '/webhook',
			body: body1,
			timestamp
		})
		const hmacSignature = createHmacSignature(canonicalMessage, secret)

		const isValid = validateSignature({
			method: 'POST',
			path: '/webhook',
			body: body2,
			secret,
			timestamp,
			signature: hmacSignature,
		})

		expect(isValid).toBeTrue()
	})
})
