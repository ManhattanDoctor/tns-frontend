import { Component, ViewContainerRef } from '@angular/core';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { ViewUtil, WindowService } from '@ts-core/angular';
import { SignerService } from '../../service';
import { SingerAddCommand } from '../../transport';

@Component({
    selector: 'signer-info',
    templateUrl: 'signer-info.component.html'
})
export class SingerInfoComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private transport: Transport, private windows: WindowService, public service: SignerService) {
        super();
        ViewUtil.addClasses(container.element, 'd-flex align-items-center pt-1 ps-2 pe-3 pb-1');
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public add(): void {
        this.transport.send(new SingerAddCommand());
    }

    public async remove(): Promise<void> {
        await this.windows.question('signer.removeConfirmation').yesNotPromise;
        this.service.remove(this.service.signer);
    }
}
