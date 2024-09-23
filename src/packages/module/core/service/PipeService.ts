import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '@ts-core/frontend';
import { PipeBaseService } from '@ts-core/angular';
import { CoinAmountPipe, CoinIdPipe, RolePipe } from '@shared/pipe';

@Injectable({ providedIn: 'root' })
export class PipeService extends PipeBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constants
    //
    //--------------------------------------------------------------------------

    private static ROLE_PIPE: RolePipe;
    private static COIN_ID_PIPE: CoinIdPipe;
    private static COIN_AMOUNT_PIPE: CoinAmountPipe;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(language: LanguageService, sanitizer: DomSanitizer) {
        super(language, sanitizer);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get role(): RolePipe {
        if (!PipeService.ROLE_PIPE) {
            PipeService.ROLE_PIPE = new RolePipe(this);
        }
        return PipeService.ROLE_PIPE;
    }

    public get coinId(): CoinIdPipe {
        if (!PipeService.COIN_ID_PIPE) {
            PipeService.COIN_ID_PIPE = new CoinIdPipe(this.language);
        }
        return PipeService.COIN_ID_PIPE;
    }
    public get coinAmount(): CoinAmountPipe {
        if (!PipeService.COIN_AMOUNT_PIPE) {
            PipeService.COIN_AMOUNT_PIPE = new CoinAmountPipe(this.language);
        }
        return PipeService.COIN_AMOUNT_PIPE;
    }

}
