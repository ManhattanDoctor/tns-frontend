import { ILogger, Transport, TransportCommandHandler } from '@ts-core/common';
import { RouterService } from '@core/service';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { WindowConfig } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { IHlfObjectOpenDto, HlfObjectOpenBaseCommand } from '@feature/hlf/transport';
import { HlfObjectId, HlfObject } from '@core/lib';
import { takeUntil, merge } from 'rxjs';
import { HlfObjectContainerBaseComponent } from '../../component';
import * as _ from 'lodash';

export abstract class HlfObjectBaseOpenHandler<U extends HlfObject, T extends HlfObjectId = HlfObjectId> extends TransportCommandHandler<IHlfObjectOpenDto<T>, HlfObjectOpenBaseCommand<T>> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: ILogger, transport: Transport, name: string, protected windows: WindowService, protected sheets: BottomSheetService, protected router: RouterService,) {
        super(logger, transport, name);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async execute(params: IHlfObjectOpenDto<T>): Promise<void> {
        if (params.isBriefly) {
            await this.openObjectBrief(params.id, params.details);
        } else if (this.hasUrl(params.id)) {
            await this.open(params.id);
        }
    }

    protected async open(name: T): Promise<void> {
        let { id } = await this.getItem(name);
        this.router.navigate(this.getUrl(id));
    }

    protected async openObjectBrief<V extends HlfObjectContainerBaseComponent<U, K>, K = any>(id: T, details?: K): Promise<V> {
        let item = await this.getItem(id);
        let config = this.getConfig(id, item);
        let content: V = null;
        if (this.windows.setOnTop(config.id)) {
            content = this.windows.get(config.id) as V;
            content.shake();
            return content;
        }

        content = this.windows.open(this.getComponent<V>(), config);
        content.details = details;
        content.item = item;
        content.isOpenBriefly = content.isBriefly = true;

        merge(content.back, content.forward, content.backward)
            .pipe(takeUntil(content.destroyed))
            .subscribe(() => content.close());
        return content;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected abstract getItem(id: HlfObjectId): Promise<U>;

    protected abstract getComponent<T = any>(): ComponentType<T>;

    protected getConfig(id: HlfObjectId, item: U): WindowConfig {
        let value = new WindowConfig(false, false, 800, 500);
        value.id = item.uid;
        value.isExpandable = this.isExpandable(id);
        return value;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected getUrl(id: HlfObjectId): string {
        return null;
    }

    protected hasUrl(id: HlfObjectId): boolean {
        return !_.isNil(this.getUrl(id));
    }

    protected isExpandable(id: HlfObjectId): boolean {
        return this.hasUrl(id);
    }

}
