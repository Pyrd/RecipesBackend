import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class Forbidden extends ForbiddenException {
  constructor(customMessage?: string, objectError?: any) {
    super(objectError, customMessage);
  }
}

export class Unauthorized extends UnauthorizedException {
  constructor(customMessage?: string, objectError?: any) {
    super(objectError, customMessage);
  }
}

export class BadRequest extends BadRequestException {
  constructor(customMessage?: string, objectError?: any) {
    super(objectError, customMessage);
  }
}

export class NotFound extends NotFoundException {
  constructor(customMessage?: string, objectError?: any) {
    super(objectError, customMessage);
  }
}
