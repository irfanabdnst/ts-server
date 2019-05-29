export class APIError extends Error {
  constructor(
    name: string,
    message: string,
    public status: number,
    public properties?: any,
    public internalProperties?: any
  ) {
    super();
    this.name = name;
    this.message = message;
  }
  publicVersion() {
    return new PublicError(this);
  }
  static errNotFound(properties?: any, internalProperties?: any) {
    return new APIError(
      'Resource not found',
      'The specified Resource does not exist',
      404,
      properties,
      internalProperties
    );
  }
  static errInvalidQueryParameter(properties?: any, internalProperties?: any) {
    return new APIError(
      'Invalid Query Parameter',
      'One of the query parameters specified is invalid',
      400,
      properties,
      internalProperties
    );
  }
  static errMissingBody(properties?: any, internalProperties?: any) {
    return new APIError(
      'Missing Body',
      'Missing Data in Request Body',
      400,
      properties,
      internalProperties
    );
  }
  static errServerError(properties?: any, internalProperties?: any) {
    return new APIError(
      'Internal Server Error',
      'Request could not be carried out',
      500,
      properties,
      internalProperties
    );
  }
  static errUnauthorized(properties?: any, internalProperties?: any) {
    return new APIError(
      'Unauthorized',
      'Client Authorization Failed',
      401,
      properties,
      internalProperties
    );
  }
}

export class PublicError {
  name: string;
  message: string;
  status: number;
  properties?: any;
  constructor(err: APIError) {
    this.name = err.name;
    this.message = err.message;
    this.status = err.status;
    this.properties = err.properties;
  }
}

export class PublicInfo {
  constructor(
    public message: string,
    public status: number,
    public properties?: any
  ) {}
  static infoDeleted(properties?: any) {
    return new PublicInfo('Resource Deleted', 204, properties);
  }
  static infoCreated(properties?: any) {
    return new PublicInfo('Resource Created', 201, properties);
  }
  static infoUpdated(properties?: any) {
    return new PublicInfo('Resource Updated', 201, properties);
  }
}
