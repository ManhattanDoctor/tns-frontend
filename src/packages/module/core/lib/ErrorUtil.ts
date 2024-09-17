import { ExtendedError, ObjectUtil } from "@ts-core/common";
import * as _ from 'lodash';

export class ErrorUtil {

    // --------------------------------------------------------------------------
    //
    //	Static Methods
    //
    // --------------------------------------------------------------------------

    public static getTranslation(error: ExtendedError<any, string | number>): { key: string, params: any } {
        let key = `error.${error.code}`;
        let params = { code: error.code, message: error.message, details: error.details };
        if (ObjectUtil.isJSON(error.details)) {
            params = JSON.parse(error.details);
        }
        if (_.isEmpty(params.message)) {
            params.message = error.message;
        }
        return { key, params };
    }
}