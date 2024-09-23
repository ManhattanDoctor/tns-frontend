import { Component, EventEmitter, ElementRef, Output, Input } from '@angular/core';
import { RouterService, ApiService } from '@core/service';
import { ViewUtil } from '@ts-core/angular';
import { IKeyAsymmetric, Destroyable, Transport, TransportCommand, TransportCommandAsync } from '@ts-core/common';
import { UserAddCommand } from '@feature/user/transport';
import { TransportSocket } from '@ts-core/socket-client';

@Component({
    selector: 'shell-header',
    templateUrl: './shell-header.component.html',
    styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public isNeedMenu: boolean;

    @Output()
    public openMenu: EventEmitter<void> = new EventEmitter();

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public socket: TransportSocket, private router: RouterService, private transport: Transport) {
        super();
        ViewUtil.addClasses(element, 'd-flex align-items-center');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public open(): void {
        this.openMenu.emit();
    }

    public back(): void {
        this.router.navigate('/');
    }

    public async test(): Promise<void> {
        this.transport.send(new UserAddCommand());
    }

    /*
    public async batch(): Promise<void> {
        let manager = new TransportCryptoManagerEd25519();

        let key: IKeyAsymmetric = {
            publicKey: "e365007e85508c6b44d5101a1d59d0061a48fd1bcd393186ccb5e7ae938a59a8",
            privateKey: "e87501bc00a3db3ba436f7109198e0cb65c5f929eabcedbbb5a9874abc2c73a3e365007e85508c6b44d5101a1d59d0061a48fd1bcd393186ccb5e7ae938a59a8"
        }
        let command = new TransportCommandAsync('transportFabricBatch');
        this.api.ledger.ledgerRequestSend(command, { signature: await TransportCommand.sign(command, manager, key) } as any);
    }
    */
}
