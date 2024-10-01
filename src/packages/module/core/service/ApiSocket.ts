import { Injectable } from '@angular/core';
import { DateUtil, LoadableEvent, Logger } from '@ts-core/common';
import { TransportSocket, TransportSocketClient } from '@ts-core/socket-client';
import { NotificationService } from '@ts-core/angular';
import { filter, map, takeUntil } from 'rxjs';
import { SOCKET_NAMESPACE } from '@common/platform/api';
import * as _ from 'lodash';

export class ApiSocket extends TransportSocket {

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, private notifications: NotificationService) {
        super(logger, { timeout: DateUtil.MILLISECONDS_MINUTE }, new TransportSocketClient(logger, { reconnectionAttempts: 10, namespace: SOCKET_NAMESPACE, auth: {} }));

        this.socket.events.pipe(
            filter(event => event.type === LoadableEvent.COMPLETE && this.isHasDisconnectNotificationId()),
            takeUntil(this.destroyed))
            .subscribe(() => notifications.remove(this.disconnectNotificationId));

        this.socket.events.pipe(
            filter(event => event.type === LoadableEvent.ERROR && !this.isHasDisconnectNotificationId()),
            takeUntil(this.destroyed))
            .subscribe(async () => {
                await notifications.question(this.disconnectNotificationId, null, null, { id: this.disconnectNotificationId, closeDuration: DateUtil.MILLISECONDS_DAY }).yesNotPromise;
                this.socket.connect();
            });
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public connect(token: string): Promise<void> {
        this.socket.settings.auth['token'] = token;
        return this.socket.connect();
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private isHasDisconnectNotificationId(): boolean {
        return this.notifications.has(this.disconnectNotificationId);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    //--------------------------------------------------------------------------

    private get disconnectNotificationId(): string {
        return 'socket.reconnect.confirmation';
    }
}