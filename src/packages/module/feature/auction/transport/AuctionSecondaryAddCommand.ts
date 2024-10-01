import { TransportCommand } from '@ts-core/common';

export class AuctionSecondaryAddCommand extends TransportCommand<IAuctionSecondaryAddDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AuctionSecondaryAddCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request?: IAuctionSecondaryAddDto) {
        super(AuctionSecondaryAddCommand.NAME, request);
    }
}

export interface IAuctionSecondaryAddDto {
    price?: number;
}

