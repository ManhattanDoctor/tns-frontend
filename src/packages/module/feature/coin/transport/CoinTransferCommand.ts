import { TransportCommand } from '@ts-core/common';

export class CoinTransferCommand extends TransportCommand<ICoinTransferDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CoinTransferCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: ICoinTransferDto) {
        super(CoinTransferCommand.NAME, request);
    }
}

export interface ICoinTransferDto {
    to?: string;
    amount?: number;
}

