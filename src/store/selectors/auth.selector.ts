/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { AppState } from '../reducers/index';
import { AuthState } from '../reducers/auth/auth.state';
import { UserModel } from '../../core/providers/auth/user.model';

/**
 * reference : https://gist.github.com/btroncone/a6e4347326749f938510#extracting-selectors-for-reuse
 */
export class AuthSelector {

  /**
   * Every reducer module exports selector functions, however child reducers
   * have no knowledge of the overall state tree. To make them useable, we
   * need to make new selectors that wrap them.
   *
   * Once again our compose function comes in handy. From right to left, we
   * first select the auths state then we pass the state to the auth
   * reducer's _getAuthItems selector, finally returning an observable
   * of search results.
   */
  public static getErrorMessage(): (selector: Observable<AppState>) => Observable<string> {
    return compose(this._getErrorMessage(), this.getAuthState());
  }

  public static getCurrentUser(): (selector: Observable<AppState>) => Observable<UserModel> {
    return compose(this._getCurrentUser(), this.getAuthState());
  }

  public static isLoading(): (selector: Observable<AppState>) => Observable<boolean> {
    return compose(this._isLoading(), this.getAuthState());
  }

  private static getAuthState() {
    return (state$: Observable<AppState>) => state$.select(s => s.auth);
  }

  private static _getErrorMessage() {
    return (state$: Observable<AuthState>) => state$.select(s => s.error);
  }

  private static _getCurrentUser() {
    return (state$: Observable<AuthState>) => state$.select(s => s.currentUser);
  }

  private static _isLoading() {
    return (state$: Observable<AuthState>) => state$.select(s => s.loading);
  }
}
