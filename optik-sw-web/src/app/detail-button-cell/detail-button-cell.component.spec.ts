import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailButtonCellEditor } from './detail-button-cell.component';

describe('DetailButtonCellComponentComponent', () => {
  let component: DetailButtonCellEditor;
  let fixture: ComponentFixture<DetailButtonCellEditor>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailButtonCellEditor]
    });
    fixture = TestBed.createComponent(DetailButtonCellEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
