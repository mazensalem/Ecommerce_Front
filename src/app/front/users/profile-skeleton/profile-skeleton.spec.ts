import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkeleton } from './profile-skeleton';

describe('ProfileSkeleton', () => {
  let component: ProfileSkeleton;
  let fixture: ComponentFixture<ProfileSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
