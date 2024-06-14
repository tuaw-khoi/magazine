// src/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const isPublic = () => SetMetadata('isPublic', true);
