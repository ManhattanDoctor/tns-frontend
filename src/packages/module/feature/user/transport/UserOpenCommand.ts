import { HlfObjectOpenBaseCommand, IHlfObjectOpenDto } from "@feature/hlf/transport";

export class UserOpenCommand extends HlfObjectOpenBaseCommand {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'UserOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IHlfObjectOpenDto) {
        super(UserOpenCommand.NAME, request);
    }
}
