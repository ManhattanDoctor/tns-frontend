import { Logger, getUid, LoggerWrapper, UID } from '@ts-core/common';
import { ApiService } from './ApiService';
import { IHlfObjectDetails } from '@common/platform/api';
import { Assets } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { PipeService } from './PipeService';
import { getType } from '@common/hlf';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class HlfObjectDetailsService extends LoggerWrapper {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private map: Map<string, Promise<IHlfObjectDetails>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, private pipe: PipeService, private api: ApiService) {
        super(logger);
        this.map = new Map();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async picture(item: UID): Promise<string> {
        let { picture } = await this.get(item);
        return picture;
    }

    public async name(item: UID): Promise<string> {
        let { name } = await this.get(item);
        return name;
    }

    public async get(item: UID): Promise<IHlfObjectDetails> {
        let uid = getUid(item);
        if (this.map.has(uid)) {
            return this.map.get(uid)
        }
        let promise = new Promise<IHlfObjectDetails>(async resolve => {
            try {
                resolve(await this.api.api.hlfObjectDetailsGet(uid));
            }
            catch (error) {
                resolve({ id: null, name: this.pipe.language.translate('user.anonymous'), type: getType(uid), picture: Assets.getIcon('72') });
            }
        })
        this.map.set(uid, promise);
        return promise;
    }
}
