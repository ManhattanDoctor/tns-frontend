import { Logger, ObservableData, Loadable, LoadableEvent, LoadableStatus, PromiseHandler } from '@ts-core/common';
import { SignerService } from '@feature/singer/service';
import { HlfApiMonitor } from './HlfApiMonitor';
import { Injectable } from '@angular/core';
import { WindowService, NotificationService } from '@ts-core/angular';
import { Client } from '@common/platform/api';
import { HlfApiClient } from './HlfApiClient';
import * as _ from 'lodash';

@Injectable()
export class ApiService extends Loadable {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _api: Client;
    private _hlf: HlfApiClient;
    private _monitor: HlfApiMonitor;

    private isInitialized: boolean;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, windows: WindowService, notifications: NotificationService, signer: SignerService) {
        super();

        this._api = new Client(logger);
        this._hlf = new HlfApiClient(logger, signer);
        this._monitor = new HlfApiMonitor(logger, windows, notifications);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async initialize(url: string): Promise<void> {
        if (this.isInitialized) {
            return;
        }

        this.api.url = url;
        this.status = LoadableStatus.LOADING;
        this.observer.next(new ObservableData(LoadableEvent.STARTED));

        try {
            let { hlf } = await this.api.init();
            this.hlf.url = this.monitor.url = hlf.endpoint;
            this.hlf.settings.ledgerNameDefault = this.monitor.settings.ledgerNameDefault = hlf.name;

            this.monitor.connect();
            this.status = LoadableStatus.LOADED;
            this.observer.next(new ObservableData(LoadableEvent.COMPLETE));
        } catch (error: any) {
            this.status = LoadableStatus.ERROR;
            this.observer.next(new ObservableData(LoadableEvent.ERROR, null, error));
        } finally {
            this.observer.next(new ObservableData(LoadableEvent.FINISHED));
        }
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();

        this._monitor.destroy();
        this._monitor = null;

        this._hlf.destroy();
        this._hlf = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get api(): Client {
        return this._api;
    }

    public get hlf(): HlfApiClient {
        return this._hlf;
    }

    public get monitor(): HlfApiMonitor {
        return this._monitor;
    }
}