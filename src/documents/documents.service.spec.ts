import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let provider: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    provider = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
