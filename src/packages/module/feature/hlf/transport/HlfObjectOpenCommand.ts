import { TransportCommand } from '@ts-core/common';
import { HlfObjectId } from '@core/lib';
import { IHlfObjectOpenDto } from './HlfObjectOpenBaseCommand';

export class HlfObjectOpenCommand<V = any> extends TransportCommand<IHlfObjectOpenDto<HlfObjectId, V>> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'HlfObjectOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IHlfObjectOpenDto<HlfObjectId, V>) {
        super(HlfObjectOpenCommand.NAME, request);
    }
}
