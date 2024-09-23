import { TransportCommand } from '@ts-core/common';
import { HlfObjectId } from '@core/lib';

export class HlfObjectOpenBaseCommand<U = HlfObjectId, V = any> extends TransportCommand<IHlfObjectOpenDto<U>> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'HlfObjectOpenBaseCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(name: string, request: IHlfObjectOpenDto<U, V>) {
        super(name, request);
    }
}

export interface IHlfObjectOpenDto<U = HlfObjectId, V = any> {
    id: U;
    details?: V;
    isBriefly?: boolean;
}
