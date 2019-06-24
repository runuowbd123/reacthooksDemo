import 'whatwg-fetch';

import HttpInterface from './interface';

class Http implements HttpInterface {
    public get(url: string, params?: object): Promise<any> {
        const newUrl: string = params ? this.build(url, params) : url;
        return this.request(newUrl, {
            method: 'GET',
        });
    }
    public post(url: string, body?: object, extOption?: any): Promise<any> {
        const options: any = { method: 'POST' };
        if (body) {
            options.body = JSON.stringify(body);
        }
        return this.request(url, options, extOption);
    }
    public postAsFormData(url: string, params?: object): Promise<any> {
        const options: any = { method: 'POST' };
        if (params) {
            options.body = this.buildFormData(params);
        }
        return this.request(url, options);
    }
    public postForm(url: string, form: HTMLFormElement): Promise<any> {
        const options: any = { method: 'POST' };
        if (form) {
            options.body = new FormData(form);
        }
        return this.request(url, options);
    }
    public request(url: string, options?: any, extOption?: any): Promise<any> {
        options.credentials = 'same-origin';
        options.headers = this.defaultHeader();
        return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .catch( (err) => {
            if (extOption && extOption.isSilent) {
                return err;
            }
            return err; // 错误信息返回
        });
    }

    public build(url: string, params: any) { // URL构建方法
        const ps = [];
        if (params) {
            for (const p in params) {
                if (p) {
                    ps.push(p + '=' + encodeURIComponent(params[p]));
                }
            }
        }
        return url + '?' + ps.join('&');
    }

    public buildFormData(params: any) {
        if (params) {
            const data = new FormData();
            for (const p in params) {
                if (p) {
                    data.append(p, params[p]);
                }
            }
            return data;
        }
    }

    private defaultHeader() { // 默认头
        const header = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        };
        return header;
    }

}

export default new Http();
