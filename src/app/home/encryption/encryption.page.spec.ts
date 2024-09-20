import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncryptionPage } from './encryption.page';

describe('EncryptionPage', () => {
  let component: EncryptionPage;
  let fixture: ComponentFixture<EncryptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
