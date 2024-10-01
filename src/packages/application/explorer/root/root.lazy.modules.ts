//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { UserModule } from '@feature/user';
import { HlfModule } from '@feature/hlf';
import { CoinModule } from '@feature/coin';
import { ActionModule } from '@feature/action';
import { AuctionModule } from '@feature/auction';
import { NicknameModule } from '@feature/nickname';

export let LAZY_MODULES: Array<any> = [
    {
        id: HlfModule.ID,
        commands: HlfModule.COMMANDS,
        path: async () => (await import('@feature/hlf')).HlfModule
    },
    {
        id: UserModule.ID,
        commands: UserModule.COMMANDS,
        path: async () => (await import('@feature/user')).UserModule
    },
    {
        id: ActionModule.ID,
        commands: ActionModule.COMMANDS,
        path: async () => (await import('@feature/action')).ActionModule
    },
    {
        id: CoinModule.ID,
        commands: CoinModule.COMMANDS,
        path: async () => (await import('@feature/coin')).CoinModule
    },
    {
        id: NicknameModule.ID,
        commands: NicknameModule.COMMANDS,
        path: async () => (await import('@feature/nickname')).NicknameModule
    },
    {
        id: AuctionModule.ID,
        commands: AuctionModule.COMMANDS,
        path: async () => (await import('@feature/auction')).AuctionModule
    },
    /*
    {
        id: TaskModule.ID,
        commands: TaskModule.COMMANDS,
        path: async () => (await import('@feature/task')).TaskModule
    },
    {
        id: FileModule.ID,
        commands: FileModule.COMMANDS,
        path: async () => (await import('@feature/file')).FileModule
    },
    {
        id: TelegramModule.ID,
        commands: TelegramModule.COMMANDS,
        path: async () => (await import('@feature/telegram')).TelegramModule
    },
    {
        id: CoinModule.ID,
        commands: CoinModule.COMMANDS,
        path: async () => (await import('@feature/coin')).CoinModule
    },
    {
        id: PaymentModule.ID,
        commands: PaymentModule.COMMANDS,
        path: async () => (await import('@feature/payment')).PaymentModule
    },
    {
        id: OpenAiModule.ID,
        commands: OpenAiModule.COMMANDS,
        path: async () => (await import('@feature/openai')).OpenAiModule
    },
    {
        id: ConversationModule.ID,
        commands: ConversationModule.COMMANDS,
        path: async () => (await import('@feature/conversation')).ConversationModule
    },
    {
        id: OAuthModule.ID,
        commands: OAuthModule.COMMANDS,
        path: async () => (await import('@feature/oauth/oauth.module')).OAuthModule,
    }
    */
];
