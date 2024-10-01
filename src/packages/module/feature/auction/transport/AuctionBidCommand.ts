import { TransportCommand } from '@ts-core/common';

export class AuctionBidCommand extends TransportCommand<IAuctionBidDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AuctionBidCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request?: IAuctionBidDto) {
        super(AuctionBidCommand.NAME, request);
    }
}

export interface IAuctionBidDto {
    auctionUid?: string;
}

