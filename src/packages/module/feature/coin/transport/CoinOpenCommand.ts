import { HlfObjectOpenBaseCommand, IHlfObjectOpenDto } from "@feature/hlf/transport";

export class CoinOpenCommand extends HlfObjectOpenBaseCommand {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CoinOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IHlfObjectOpenDto) {
        super(CoinOpenCommand.NAME, request);
    }
}
