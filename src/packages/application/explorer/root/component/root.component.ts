import { Component, ElementRef, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { LoadingService, LoadingServiceManager, LanguageService, ThemeService, Assets } from '@ts-core/frontend';
import { Transport, TransportHttpCommandAsync, LoggerWrapper, Logger, LoggerLevel, LoadableEvent } from '@ts-core/common';
import { WindowService, ApplicationComponent, ViewUtil } from '@ts-core/angular';
import { ApiService, RouterService, SettingsService, WalletService } from '@core/service';
import { AssetsCdnProvider, ErrorUtil } from '@core/lib';
import { Language } from '@ts-core/language';
import { filter, map, merge, takeUntil } from 'rxjs';
import * as _ from 'lodash';
import 'numeral/locales/ru';
import 'moment/locale/ru';

@Component({
    selector: 'root',
    templateUrl: 'root.component.html',
    styleUrls: ['root.component.scss']
})
export class RootComponent extends ApplicationComponent<SettingsService> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public isLoading: boolean;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        @Inject(Logger) private logger: LoggerWrapper,
        private element: ElementRef,
        private transport: Transport,

        private api: ApiService,
        private wallet: WalletService,
        private router: RouterService,
        private windows: WindowService,

        protected theme: ThemeService,
        protected settings: SettingsService,
        protected language: LanguageService,

        public loading: LoadingService,
        icon: MatIconRegistry
    ) {
        super();
        icon.setDefaultFontSetClass('fas');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected initialize(): void {
        super.initialize();

        ViewUtil.addClasses(this.element, 'd-block h-100');

        this.initializeObservers();
        this.theme.loadIfExist(this.settings.theme);
        this.language.loadIfExist(this.settings.language);

        this.transport.level = this.logger.level = this.settings.isProduction ? LoggerLevel.LOG : LoggerLevel.LOG;
    }

    protected initializeAssets(): void {
        Assets.provider = new AssetsCdnProvider(this.settings.assetsUrl, this.settings.assetsUrl);
    }

    private initializeObservers(): void {
        let manager = this.addDestroyable(new LoadingServiceManager(this.loading));
        manager.addLoadable(this.language, this.api.socket, this.api.hlf, this.api.api, this.router);

        // Api
        merge(this.api.api.events)
            .pipe(
                filter(event => event.type === LoadableEvent.ERROR),
                map(<T>(event) => event.data as TransportHttpCommandAsync<T>),
                filter(command => command.isHandleError && !_.isNil(command.error)),
                takeUntil(this.destroyed)
            ).subscribe(data => this.apiLoadingError(data));
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async apiLoadingError<T>(command: TransportHttpCommandAsync<T>): Promise<void> {
        let error = command.error;

        let { key, params } = ErrorUtil.getTranslation(error);
        if (command.isHandleError) {
            this.windows.info(key, params);
        }
    }

    protected languageLoadingError(item: Language, error: Error): void {
        let message = `Unable to load language "${item.locale}"`;
        if (!_.isNil(error)) {
            message += `, error: ${error}`;
        }
        this.windows.info(message);
    }

    protected async readyHandler(): Promise<void> {
        await this.api.initialize(this.settings.apiUrl);
    }
}

