import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HashingPage } from './hashing.page';

describe('HashingPage', () => {
  let component: HashingPage;
  let fixture: ComponentFixture<HashingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HashingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
