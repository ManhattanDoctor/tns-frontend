import { TransportCommand } from '@ts-core/common';

export class AuctionPrimaryAddCommand extends TransportCommand<IAuctionPrimaryAddDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AuctionPrimaryAddCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request?: IAuctionPrimaryAddDto) {
        super(AuctionPrimaryAddCommand.NAME, request);
    }
}

export interface IAuctionPrimaryAddDto {
    nickname?: string;
}

