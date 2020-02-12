import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListShellComponent } from './product-list-shell.component';

describe('ProductListShellComponent', () => {
  let component: ProductListShellComponent;
  let fixture: ComponentFixture<ProductListShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
