import { Logger, ObservableData, Loadable, LoadableEvent, LoadableStatus } from '@ts-core/common';
import { Injectable } from '@angular/core';
import { WindowService, NotificationService } from '@ts-core/angular';
import { Client } from '@common/platform/api';
import { HlfApiClient } from './HlfApiClient';
import { WalletService } from './WalletService';
import { SignerService } from './SignerService';
import { TransportSocket } from '@ts-core/socket-client';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ApiService extends Loadable {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _api: Client;
    private _hlf: HlfApiClient;
    private _socket: TransportSocket;

    private isInitialized: boolean;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, api: Client, socket: TransportSocket, wallet: WalletService, signer: SignerService) {
        super();

        this._api = api;
        this._socket = socket;
        this._hlf = new HlfApiClient(logger, wallet, signer);
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

        this.api.url = this.socket.socket.url = url;
        this.status = LoadableStatus.LOADING;
        this.observer.next(new ObservableData(LoadableEvent.STARTED));

        try {
            let { hlf } = await this.api.init();
            this.hlf.url = hlf.endpoint;
            this.hlf.settings.ledgerNameDefault = hlf.name;

            await this.socket.socket.connect();
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

    public get socket(): TransportSocket {
        return this._socket;
    }
}