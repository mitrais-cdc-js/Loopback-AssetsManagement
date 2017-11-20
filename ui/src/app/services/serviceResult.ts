export enum ServiceResultCode {
  UNKNOWN_ERROR = 1,
  // 100 - 200
  VALUE_ERROR = 100,
  VALUE_IS_NULL_OR_UNDEFINED = 101,
}


export class ServiceError extends Error {
  constructor(msg: string, code: number = ServiceResultCode.UNKNOWN_ERROR) {
    super(msg);
    Object.setPrototypeOf(this, ServiceError.prototype);
    console.log('test');
  }
}
