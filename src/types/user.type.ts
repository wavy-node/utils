export interface IUserData {
	/**
		* The individual's given name(s). This can include multiple names, such as "Maria Guadalupe".
	*/
	givenName: string,
	/**
		* The individual's maternal surname, which is the last name from their mother's side.
	*/
	maternalSurname: string,
	/**
		* The individual's paternal surname, which is the last name from their father's side.
	*/
	paternalSurname: string,
	/**
		* Date of birth in 'YYYY-MM-DD' format (ISO 8601)
	*/
	birthdate: string,
	/**
		* ISO 3166 A-2 Country code
	*/
	nationality: string,
	phoneNumber: {
		countryCode: string,
		phoneNumber: number,
	},
	email: string,
	address: {
		/**
			* ISO 3166 A-2 Country code
		*/
		country: string,
		/**
			* AKA state or province
		*/
		region: string,
		city: string,
		street: string,
		/**
			* AKA neighborhood
		*/
		colonia: string,
		exteriorNumber: string,
		interiorNumber?: string,
		postalCode: string,
	},
	/**
		* Mexican legislation fields, required if mexican legislations is enabled in the dashboard.
		* A lot of the fields must comply with the specs described in https://sppld.sat.gob.mx/pld/interiores/activos.html
	*/
	mexico?: {
		/**
			* Mexican RFC (Registro Federal de Contribuyentes)
		*/
		rfc?: string,
		/**
			* Mexican CURP (Clave Única de Registro de Población)
		*/
		curp: string,
		/**
			* Key for the economic activity or ocupation of the user.
			* Check https://sppld.sat.gob.mx/pld/interiores/activos.html for reference.
		*/
		actividadEconomica: number,
		/**
			* Bank account related with the user
		*/
		cuentaRelacionada: string,
		/**
			* Clabe interbancaria of the relatedAccount
		*/
		clabeInterbancaria?: undefined,
		/**
			* Currency of the related bank account, 1 -> MXN, 2 -> USD.
			* Check https://sppld.sat.gob.mx/pld/interiores/activos.html for reference.
		*/
		monedaCuentaRelacionada: number,
		documentoIdentificacion: {
			tipoIdentificacion: number,
			numeroIdentificacion: string
		},
	}
}
