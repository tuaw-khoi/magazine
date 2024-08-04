import { Test, TestingModule } from '@nestjs/testing';
import { NewsrecommendController } from './newsrecommend.controller';

describe('NewsrecommendController', () => {
  let controller: NewsrecommendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsrecommendController],
    }).compile();

    controller = module.get<NewsrecommendController>(NewsrecommendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
