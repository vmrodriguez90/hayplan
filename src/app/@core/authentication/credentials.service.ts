import { Injectable } from '@angular/core';
import { AuthorizationEntity } from './authentication.models';

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: AuthorizationEntity | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): AuthorizationEntity | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(authorizationEntity?: AuthorizationEntity, remember?: boolean) {
    this._credentials = authorizationEntity || null;

    if (authorizationEntity && authorizationEntity.authorized) {
      const credentials = this.createCredentialsFromAuthEntity(authorizationEntity);
      const storage = remember ? localStorage : sessionStorage;

      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  private createCredentialsFromAuthEntity(authorizationEntity: AuthorizationEntity) {
    const username = authorizationEntity.fullName;
    const expiresAt = JSON.stringify(authorizationEntity.expiresIn + new Date().getTime());

    return {
      access_token: authorizationEntity.accessToken,
      user: username,
      expires_at: expiresAt,
      isAdmin: JSON.stringify(authorizationEntity.admin),
      email: authorizationEntity.email,
    };
  }
}
