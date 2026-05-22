import { Test, TestingModule } from '@nestjs/testing';
import { WorkdaysController } from './workdays.controller';
import { WorkdaysService } from './workdays.service';

describe('WorkdaysController', () => {
  let controller: WorkdaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkdaysController],
      providers: [
        {
          provide: WorkdaysService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1, date: '2026-01-01', description: 'Test' }),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkdaysController>(WorkdaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of workdays', async () => {
    expect(await controller.findAll()).toEqual([]);
  });
});
