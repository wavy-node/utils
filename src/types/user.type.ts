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
	/**
		* Mexican RFC (Registro Federal de Contribuyentes)
	*/
	rfc?: string,
	/**
		* Mexican CURP (Clave Única de Registro de Población)
	*/
	curp?: string,
}
