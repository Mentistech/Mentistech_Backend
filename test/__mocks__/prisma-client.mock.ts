import { jest } from '@jest/globals';

export class PrismaClient {
  $connect = jest.fn<(...args: any[]) => any>();
  $disconnect = jest.fn<(...args: any[]) => any>();
}
