import type { IPayload } from "./notification-payload.type"

interface INotification {
	type: 'notification',
	data: IPayload
}
interface IError {
	type: 'error',
	data: string
}

export type IWebhookBody = INotification | IError

