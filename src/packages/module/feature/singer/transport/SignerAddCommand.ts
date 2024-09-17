import { TransportCommand } from '@ts-core/common';

export class SingerAddCommand extends TransportCommand<void> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'SingerAddCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(SingerAddCommand.NAME);
    }
}

