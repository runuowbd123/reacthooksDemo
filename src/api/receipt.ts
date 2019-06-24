import {GetHistory, Receipt, UploadFile} from '../model';
import Http from '../utils/http';

class ReceiptService {

    public static getList(receipt: Receipt) {
        return Http.post('/receipts', receipt);
    }
    public static getHistory(param: GetHistory) {
        return Http.post('/traffic/v1/file/history', param);
    }
    public static uploadFile(param: any, templateType: any) {
        return Http.postAsFormData(`/api/traffic/v1/file/upload/${templateType}`, param);
    }
}

export default ReceiptService;
