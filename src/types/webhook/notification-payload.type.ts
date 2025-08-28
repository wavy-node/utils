export interface IToken {
	name: string,
	symbol: string,
	decilmals: number,
	/**
		* null if it's a native token 
	*/
	address: string | null
}

export interface IInflictedLaw {
	name: string,
	description: string,
	source?: string,
	risk: 'warn' | 'illegal',
	country: string,
	/**
		* ISO 3166 A-2 country code
	*/
	countryCode: string
}


export interface IPayload {
	/**
		* Notification ID
	*/
	id: number,
	projectId: number,
	chainId: number,
	/**
		* Involved address information
	*/
	address: {
		id: number,
		/**
			* Id of the user linked to this address. A.K.A. the user in your DB
		*/
		userId: string,
		address: string,
		description: string
	},
	txHash: string,
	timestamp: string,
	/**
		* Transacted amount
	*/
	amount: {
		value: number,
		usd: number,
	},
	token: IToken,
	inflictedLaws: IInflictedLaw[],
}
