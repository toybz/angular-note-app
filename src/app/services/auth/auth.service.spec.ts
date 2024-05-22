import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { UserT } from '../../models/user';
import { testUser } from '../../test-assets/testData';

describe('AuthService', () => {
  let service: AuthService;
  let storageService: jasmine.SpyObj<StorageService>;
  let routerService: jasmine.SpyObj<Router>;

  let signedInUser: UserT;

  beforeEach(() => {
    signedInUser = { ...testUser };

    const storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'getData',
      'addData',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    storageService = TestBed.inject(
      StorageService,
    ) as jasmine.SpyObj<StorageService>;
    routerService = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#signUpNewUser', () => {
    it('should add data to storage', () => {
      const user: UserT = signedInUser;
      // storageService.addData.and.returnValue(undefined);

      service.signUpNewUser(user);
      expect(storageService.addData.calls.count()).toBe(1);
      expect(storageService.addData).toHaveBeenCalledWith('users', user);
    });
  });

  describe('#isUserExist', () => {
    it('should return null if user doesnt exist', () => {
      const mockUsers: UserT[] = [signedInUser];
      storageService.getData.and.returnValue(mockUsers);
      const unExistingUser: UserT = { username: 'mock', password: 'mock' };
      expect(service.isUserExist(unExistingUser)).toBe(null);
    });
    it('should return user detail if user exist', () => {
      const mockUsers: UserT[] = [signedInUser];
      storageService.getData.and.returnValue(mockUsers);
      const searchUserResponse = service.isUserExist(signedInUser);
      expect(service.user())
        .withContext('sets the signed in user signal')
        .toBe(signedInUser);

      expect(searchUserResponse)
        .withContext('returns the signed in user')
        .toBe(signedInUser);
    });
  });

  describe('#logOut', () => {
    it('should log the user out and navigate to login page', () => {
      service.user.set(signedInUser);
      service.logOut();
      expect(service.user()).withContext('sets the user to null').toBe(null);
      expect(routerService.navigateByUrl).toHaveBeenCalledWith('auth/login');
    });
  });
});
