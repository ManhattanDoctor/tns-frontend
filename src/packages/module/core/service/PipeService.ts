import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '@ts-core/frontend';
import { PipeBaseService } from '@ts-core/angular';
import { AmountPipe, RolePipe } from '@shared/pipe';

@Injectable({ providedIn: 'root' })
export class PipeService extends PipeBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constants
    //
    //--------------------------------------------------------------------------

    private static ROLE_PIPE: RolePipe;
    private static AMOUNT_PIPE: AmountPipe;

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

    public get amount(): AmountPipe {
        if (!PipeService.AMOUNT_PIPE) {
            PipeService.AMOUNT_PIPE = new AmountPipe();
        }
        return PipeService.AMOUNT_PIPE;
    }

}
