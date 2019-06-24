
export default interface HttpInterface {
    /**
     * HTTP Get method
     * @param url request URL
     * @param params  request Parameter
     */
    get(url: string, params?: object): Promise<any>;
    /**
     * HTTP Post method
     * @param url request URL
     * @param body request body object
     */
    post(url: string, body?: object): Promise<any>;
    /**
     * Post an object as a formData object
     * @param url request URL
     * @param params the params object that wait to convert to formData
     */
    postAsFormData(url: string, params?: object): Promise<any>;
    /**
     * Post a form element
     * @param url request URL
     * @param form HTML Form element
     */
    postForm(url: string, form: HTMLElement): Promise<any>;
    /**
     * Http request
     * @param url request URL
     * @param options request options
     */
    request(url: string, options?: object): Promise<any>;
}
