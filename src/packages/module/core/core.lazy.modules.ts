//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

/*
import { UserModule } from '@feature/user';
import { CompanyModule } from '@feature/company';
import { SignerModule } from '@feature/singer';
import { ProjectModule } from '@feature/project';
import { CoinModule } from '@feature/coin';
import { LedgerModule } from '@feature/ledger';
*/

export const TRANSPORT_LAZY_MODULES = [
    /*
    {
        id: UserModule.ID,
        commands: UserModule.COMMANDS,
        path: async () => (await import('@feature/user')).UserModule
    },
    {
        id: CompanyModule.ID,
        commands: CompanyModule.COMMANDS,
        path: async () => (await import('@feature/company')).CompanyModule
    },
    {
        id: ProjectModule.ID,
        commands: ProjectModule.COMMANDS,
        path: async () => (await import('@feature/project')).ProjectModule
    },
    {
        id: CoinModule.ID,
        commands: CoinModule.COMMANDS,
        path: async () => (await import('@feature/coin')).CoinModule
    },
    {
        id: LedgerModule.ID,
        commands: LedgerModule.COMMANDS,
        path: async () => (await import('@feature/ledger')).LedgerModule
    },
    {
        id: SignerModule.ID,
        commands: SignerModule.COMMANDS,
        path: async () => (await import('@feature/singer')).SignerModule
    }
        */
];
