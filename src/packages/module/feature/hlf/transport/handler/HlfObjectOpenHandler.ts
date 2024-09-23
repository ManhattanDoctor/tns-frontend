import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { IHlfObjectOpenDto, HlfObjectOpenCommand } from '../../transport';
import { HlfObjectBaseComponent } from '../../component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class HlfObjectOpenHandler extends TransportCommandHandler<IHlfObjectOpenDto, HlfObjectOpenCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger) {
        super(logger, transport, HlfObjectOpenCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IHlfObjectOpenDto): Promise<void> {
        HlfObjectBaseComponent.open(this.transport, params.id, params.isBriefly);
    }
}
