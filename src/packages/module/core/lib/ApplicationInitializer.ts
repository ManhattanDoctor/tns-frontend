import { Destroyable } from '@ts-core/common';
import { LanguageService } from '@ts-core/frontend';
import { ILanguageLoader, LanguageFileLoader } from '@ts-core/language';
import { PlatformService, RouterBaseService } from '@ts-core/angular';
import { ApiService, SettingsService } from '../service';
import axios from 'axios';
import * as _ from 'lodash';

export abstract class ApplicationInitializer extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        protected api: ApiService,
        protected router: RouterBaseService,
        protected settings: SettingsService,
        protected platform: PlatformService,
        protected language: LanguageService,
    ) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async initialize(): Promise<void> {
        this.settings.initialize(await this.getConfig(), this.router.getParams());
        this.language.loader = await this.getLanguageLoader();

        await this.api.initialize(this.settings.apiUrl);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async getLanguageLoader<T = any>(): Promise<ILanguageLoader<T>> {
        return new LanguageFileLoader(`${this.settings.assetsUrl}language/`, this.localePrefixes);
    }

    protected async getConfig(): Promise<any> {
        let { data } = await axios.get('config.json');
        return data;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected abstract get localeProject(): string;

    protected abstract get localePrefixes(): Array<string>;
}
