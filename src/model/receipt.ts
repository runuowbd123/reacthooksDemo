import QueryParams from './query';
export default interface Receipt {
    id?: number;
    name?: string;
}

export interface GetHistory extends QueryParams {
    active?: any;
    templateType?: any;
}

export interface UploadFile {
    file?: any;
    templateType?: any;
}
