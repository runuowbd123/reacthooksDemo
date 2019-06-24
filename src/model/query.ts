
export default interface QueryParams {
    asc?: any;
    orderField?: any;
    page?: number | 1;
    size?: number | 10;
    total?: number;
    query?: string;
    [propName: string]: string | number | any;
}
