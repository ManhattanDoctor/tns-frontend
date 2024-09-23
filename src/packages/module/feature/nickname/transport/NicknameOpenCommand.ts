import { HlfObjectOpenBaseCommand, IHlfObjectOpenDto } from "@feature/hlf/transport";

export class NicknameOpenCommand extends HlfObjectOpenBaseCommand {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'NicknameOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IHlfObjectOpenDto) {
        super(NicknameOpenCommand.NAME, request);
    }
}
