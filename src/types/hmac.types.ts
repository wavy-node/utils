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

export interface IValidateSignatureParams extends IFormCanonicalMessageParams {
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
