import { WindowService, NotificationService } from '@ts-core/angular';
import { LedgerApiSocket, LedgerSocketEvent } from '@hlf-explorer/common';
import { LoadableEvent, ILogger } from '@ts-core/common';
import { takeUntil, filter } from 'rxjs';
import * as _ from 'lodash';

export class HlfApiMonitor extends LedgerApiSocket {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: ILogger, windows: WindowService, notifications: NotificationService) {
        super(logger);

        this.events
            .pipe(
                filter(event => event.type === LoadableEvent.COMPLETE),
                takeUntil(this.destroyed)
            )
            .subscribe(() => notifications.remove(this.socketDisconnectNotificationId));

        this.events
            .pipe(
                filter(event => event.type === LoadableEvent.ERROR && !notifications.has(this.socketDisconnectNotificationId)),
                takeUntil(this.destroyed)
            )
            .subscribe(async event => {
                await notifications.question('error.socketDisconnected', { url: this.url, error: event.data }, null, { id: this.socketDisconnectNotificationId, }).yesNotPromise;
                this.connect();
            });

        this.events
            .pipe(
                filter(event => event.type === LedgerSocketEvent.LEDGER_DEFAULT_NOT_FOUND),
                takeUntil(this.destroyed)
            )
            .subscribe(() => windows.info('error.noLedger', { name: this.settings.ledgerNameDefault }));
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    private get socketDisconnectNotificationId(): string {
        return `socketDisconnect`;
    }
}
