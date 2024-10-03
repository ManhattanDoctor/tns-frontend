import { TransportCommand } from '@ts-core/common';

export class UserEditCommand extends TransportCommand<string> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'UserEditCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request?: string) {
        super(UserEditCommand.NAME, request);
    }
}