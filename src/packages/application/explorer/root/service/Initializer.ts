import { Injectable } from '@angular/core';
import { ApplicationInitializer } from '@core/lib';
import { ApiService, SettingsService, SignerService } from '@core/service';
import { EXPLORER_LOCALE_PREFIXES, LocaleProject,  } from '@common/platform/api/locale';
import { NotificationService, PlatformService, RouterBaseService } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class Initializer extends ApplicationInitializer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        api: ApiService,
        settings: SettingsService,
        platform: PlatformService,
        language: LanguageService,
        router: RouterBaseService,
        notifications: NotificationService,
    ) {
        super(api, router, settings, platform, language);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected get localeProject(): LocaleProject {
        return LocaleProject.EXPLORER;
    }

    protected get localePrefixes(): Array<string> {
        return EXPLORER_LOCALE_PREFIXES;
    }
}
