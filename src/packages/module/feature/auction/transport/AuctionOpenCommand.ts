import { HlfObjectOpenBaseCommand, IHlfObjectOpenDto } from "@feature/hlf/transport";

export class AuctionOpenCommand extends HlfObjectOpenBaseCommand {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AuctionOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IHlfObjectOpenDto) {
        super(AuctionOpenCommand.NAME, request);
    }
}
