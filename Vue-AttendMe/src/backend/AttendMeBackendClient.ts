import { dateReviver } from '../helpers/JsonHelpers';
import {
    AttendMeBackendClientBase,
    type DeviceRegisterDTO,
    type TokenResult,
} from './AttendMeBackendClientBase';

export class AttendMeBackendClient extends AttendMeBackendClientBase {
    userTokenResult?: TokenResult;
    deviceTokenResult?: TokenResult;
    onUnauthorized?: (url: string) => void;

    constructor(url: string) {
        const http: unknown = {
            fetch: null,
        };
        super(url, http as ApiHttpClient);
        (http as ApiHttpClient).fetch = this.fetchWrapper.bind(this);

        this.jsonParseReviver = dateReviver;

        // Restore auth when present in storage:
        this.restoreTokens();
    }

    restoreTokens() {
        const rawDeviceAuthData = window.localStorage.getItem('attend-me:deviceAuthData');
        if (rawDeviceAuthData) {
            this.deviceTokenResult = JSON.parse(rawDeviceAuthData, dateReviver);
        }

        const rawUserAuthData = window.sessionStorage.getItem('attend-me:userAuthData');
        if (rawUserAuthData) {
            this.userTokenResult = JSON.parse(rawUserAuthData, dateReviver);
        }
    }

    deviceAuthReset() {
        this.deviceTokenResult = undefined;
        window.localStorage.removeItem('attend-me:deviceAuthData');
    }

    override userLogin(loginName: string, password: string): Promise<TokenResult> {
        // Tymczasowe dane testowe
        const testUsers = [
            { loginName: 'stu37277', password: '37277', token: 'student-token' },
            { loginName: 'pk', password: '123#Asd', token: 'lecturer-token' },
            { loginName: 'su', password: '123#Asd', token: 'admin-token' }
        ];

        // Weryfikacja loginu i hasła
        const user = testUsers.find(u => u.loginName === loginName && u.password === password);

        if (user) {
            const tokenResult: TokenResult = { token: user.token, expires: new Date(Date.now() + 3600 * 1000) }; // Token ważny przez godzinę
            this.userTokenResult = tokenResult;

            // Symulacja zapisu tokena do sessionStorage
            window.sessionStorage.setItem('attend-me:userAuthData', JSON.stringify(tokenResult));
            return Promise.resolve(tokenResult);
        }

        // Jeśli dane są błędne, zwracamy błąd
        return Promise.reject(new Error('Invalid login or password.'));
    }

    userDeviceRegisterWithToken(token: string, data: DeviceRegisterDTO): Promise<TokenResult> {
        this.deviceTokenResult = {
            token,
        };
        return super.userDeviceRegister(data).then((r) => {
            this.deviceTokenResult = r;

            // Store device token
            window.localStorage.setItem('attend-me:deviceAuthData', JSON.stringify(r));

            return r;
        });
    }

    private fetchWrapper(requestInfo: RequestInfo, init?: RequestInit): Promise<Response> {
        const opts: RequestInit = {
            ...init,
        };

        const requestUrl = typeof requestInfo === 'string' ? requestInfo : requestInfo.url;

        const parsedUrl = new URL(requestUrl);
        const path = parsedUrl.pathname;
        if (
            this.deviceTokenResult &&
            (path.startsWith('/user/device/register') ||
                path.startsWith('/user/attendance/ticket/get') ||
                path.startsWith('/course/session/attendance/register')) &&
            !path.startsWith('/user/device/register/token/get')
        ) {
            opts.headers = {
                ...opts.headers,
                Authorization: `Bearer ${this.deviceTokenResult.token}`,
            };
        } else if (this.userTokenResult && !path.startsWith('/user/login')) {
            opts.headers = {
                ...opts.headers,
                Authorization: `Bearer ${this.userTokenResult.token}`,
            };
        }

        const request = fetch(requestInfo, opts);

        if (this.onUnauthorized) {
            return request.then((response) => {
                if (response.status === 401 && this.onUnauthorized) {
                    this.onUnauthorized(requestUrl);
                }

                return response;
            });
        }

        return request;
    }
}

type ApiHttpClient = {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
};
