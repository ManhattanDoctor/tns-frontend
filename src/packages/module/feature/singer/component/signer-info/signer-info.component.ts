import { Component, ViewContainerRef } from '@angular/core';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { ViewUtil, WindowService } from '@ts-core/angular';
import { SingerAddCommand } from '../../transport';
import { SignerService } from '@core/service';

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
        ViewUtil.addClasses(container.element, 'd-flex align-items-center');
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
        await this.windows.question('signer.remove.confirmation').yesNotPromise;
        this.service.remove(this.service.signer);
    }
}
