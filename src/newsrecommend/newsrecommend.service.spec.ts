import { Test, TestingModule } from '@nestjs/testing';
import { NewsrecommendService } from './newsrecommend.service';

describe('NewsrecommendService', () => {
  let service: NewsrecommendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsrecommendService],
    }).compile();

    service = module.get<NewsrecommendService>(NewsrecommendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
