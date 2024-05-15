import { Injectable } from '@angular/core';
import { ConfigService, LocalStorageService } from '@tour/lib-common';
import { IAuth, IToken, IUser } from '@tour/lib-dto-js';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private CONST_KEY_STORAGE_LOGIN: string = '_login';
  private CONST_KEY_STORAGE_TOKEN: string = '_token';
  private CONST_KEY_STORAGE_USERS: string = '_users';
  private login: string = '';

  constructor(
    private storageService: LocalStorageService,
    private http: HttpClient,
    private cfg: ConfigService
  ) {
    this.login = this.GetLogin() || '';
  }

  public Register(
    login: string,
    password: string,
    email: string,
    save: boolean
  ): never | Subscription {
    if (!login) {
      throw new Error('login is empty');
    }

    if (!password) {
      throw new Error('password is empty');
    }

    console.log('auth.register');
    return this.http
      .post<IUser>(ConfigService.Config?.tourservice + '/user', {
        login,
        password,
        email,
      })
      .subscribe((user: IUser) => {
        console.log('auth.register.subscribe', user);

        // Получаем users
        const data = this.storageService.getItem(this.CONST_KEY_STORAGE_USERS);
        let users: IUser[] = [];
        if (data) {
          users = <IUser[]>JSON.parse(data);
        }

        // Запоминаем нового участника
        this.storageService.setItem(
          this.CONST_KEY_STORAGE_USERS,
          JSON.stringify([
            ...users.filter((user) => user.login !== login),
            user,
          ])
        );

        return this.Authorize(login, password, save);
      });
  }

  public Register0(
    login: string,
    password: string,
    email: string,
    save: boolean
  ): void {
    console.log('auth.register');

    if (!login) {
      throw new Error('login is empty');
    }

    if (!password) {
      throw new Error('password is empty');
    }

    // Получаем users
    const data = this.storageService.getItem(this.CONST_KEY_STORAGE_USERS);
    let users: IUser[] = [];
    if (data) {
      users = <IUser[]>JSON.parse(data);
    }

    // Запоминаем нового участника
    this.storageService.setItem(
      this.CONST_KEY_STORAGE_USERS,
      JSON.stringify([
        ...users.filter((user) => user.login !== login),
        <IUser>{
          login,
          password,
          email,
        },
      ])
    );

    this.Authorize(login, password, save);
  }

  public IsSingIn(): boolean {
    return !!this.storageService.getItem(this.CONST_KEY_STORAGE_TOKEN);
  }

  public GetLogin(): string | null {
    return (
      this.storageService.getItem(this.CONST_KEY_STORAGE_LOGIN) || this.login
    );
  }

  public Authorize(
    login: string | null,
    password: string | null,
    save: boolean = false
  ): Subscription | never {
    if (!login) {
      throw new Error('login is empty');
    }

    console.log('AuthService::Authorize', save);
    return this.http
      .post<IToken>(ConfigService.Config?.tourservice + '/auth/login', {
        login,
        password,
      })
      .subscribe(
        (token: IToken) => {
          console.log('AuthService::Authorize.subscribe', token);
          this.storageService.setItem(
            this.CONST_KEY_STORAGE_TOKEN,
            token.access_token
          );

          this.storageService.removeItem(this.CONST_KEY_STORAGE_LOGIN);
          if (save) {
            this.storageService.setItem(this.CONST_KEY_STORAGE_LOGIN, login);
          }
        },
        (e) => {
          console.log('AuthService::Authorize.subscribe/catch', e);
          throw new Error('Не могу пройти авторизацию');
        }
      );
  }

  public Authorize0(
    login: string | null,
    password: string | null,
    save: boolean = false
  ): void | never {
    console.log('AuthService::Authorize', save);
    if (!login) {
      throw new Error('login is empty');
    }

    // Получаем users
    const users: IUser[] | never = JSON.parse(
      this.storageService.getItem(this.CONST_KEY_STORAGE_USERS) || ''
    );

    if (!users?.find((user) => user.login === login)) {
      throw new Error('login incorrect');
    }

    if (
      !users?.find((user) => user.login === login && user.password === password)
    ) {
      throw new Error('wrong password');
    }

    this.login = login || '';
    this.storageService.setItem(
      this.CONST_KEY_STORAGE_TOKEN,
      `Okey, ${this.login}`
    );

    this.storageService.removeItem(this.CONST_KEY_STORAGE_LOGIN);
    if (save) {
      this.storageService.setItem(this.CONST_KEY_STORAGE_LOGIN, this.login);
    }
  }

  public SingOut(): void {
    console.log('SingOut');
    this.login = '';
    this.storageService.removeItem(this.CONST_KEY_STORAGE_TOKEN);
  }

  public GetToken(): string | null {
    return this.storageService.getItem(this.CONST_KEY_STORAGE_TOKEN);
  }

  public ChangePassword(psw_current: string, psw_new: string): void {
    // Сначла убеждаемся что авторизация пройдена
    if (!this.GetToken()) {
      throw new Error('Требуется авторизоваться. Отказано');
    }

    // Пустой пароль не катит
    if (!psw_new) {
      throw new Error('Пароль не должен быть пустым. Отказано');
    }

    // Получаем users
    const users: IUser[] | never = JSON.parse(
      this.storageService.getItem(this.CONST_KEY_STORAGE_USERS) || ''
    );

    // Получаем текущего usr
    let usr = users?.find((user) => user.login === this.login);
    if (!usr) {
      throw new Error('Не могу найти учетную запись');
    }

    if (usr.password !== psw_current) {
      throw new Error('Текущий пароль указан неверно. Отказано');
    }

    // Запоминаем изменения
    usr.password = psw_new;
    this.storageService.setItem(
      this.CONST_KEY_STORAGE_USERS,
      JSON.stringify([...users.filter((u) => u.login !== usr?.login), usr])
    );

    this.Authorize(usr.login, usr.password, true);
  }
}
