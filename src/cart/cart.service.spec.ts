import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WatchService } from '../watch/watch.service';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

const mockWatches = {
  '1': {
    id: '1',
    name: 'Rolex',
    price: 100,
    discount: {
      quantity: 3,
      price: 200,
    },
  },
  '2': {
    id: '2',
    name: 'Michael Kors',
    price: 80,
    discount: {
      quantity: 2,
      price: 120,
    },
  },
  '3': {
    id: '3',
    name: 'Casio',
    price: 30,
  },
};

const mockCart = {
  id: '1',
  userId: '12345',
  total: 0,
  items: [],
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            create: jest.fn(() => mockCart),
            save: jest.fn((mockCart) => mockCart),
            findOne: jest.fn(() => mockCart),
          },
        },
        {
          provide: WatchService,
          useValue: {
            findOne: jest.fn((id) => mockWatches[id]),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', async () => {
    const actualRolexAdd = await service.addCartItem('1', '1');
    expect(actualRolexAdd.total).toBe(100);
    console.log(actualRolexAdd);
    const actualSecondRolexAdd = await service.addCartItem('1', '1');
    expect(actualSecondRolexAdd.total).toBe(200);
    console.log(actualSecondRolexAdd);
    const actualThirdRolexAdd = await service.addCartItem('1', '1');
    expect(actualThirdRolexAdd.total).toBe(200);
    console.log(actualThirdRolexAdd);
    const actualKorsAdd = await service.addCartItem('1', '2');
    expect(actualKorsAdd.total).toBe(280);
    console.log(actualKorsAdd);
    const actualKorsSecondAdd = await service.addCartItem('1', '2');
    expect(actualKorsSecondAdd.total).toBe(320);
    console.log(actualKorsSecondAdd);
    const actualCasioAdd = await service.addCartItem('1', '3');
    expect(actualCasioAdd.total).toBe(350);
    console.log(actualCasioAdd);
  });
});
