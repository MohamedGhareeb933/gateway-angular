import { TestBed } from '@angular/core/testing';

import { GatewaySerice } from './gateway.service';

describe('GatewaySericeService', () => {
  let service: GatewaySerice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatewaySerice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
