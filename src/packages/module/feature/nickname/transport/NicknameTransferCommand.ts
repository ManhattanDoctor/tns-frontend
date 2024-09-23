import { TransportCommand } from '@ts-core/common';

export class NicknameTransferCommand extends TransportCommand<INicknameTransferDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'NicknameTransferCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: INicknameTransferDto) {
        super(NicknameTransferCommand.NAME, request);
    }
}

export interface INicknameTransferDto {
    to?: string;
}

