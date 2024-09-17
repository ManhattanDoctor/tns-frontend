import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService, ViewUtil } from '@ts-core/angular';
import { ShellBaseComponent } from '@ts-core/angular-material';
import { RouterService, SettingsService } from '@core/service';
import { takeUntil } from 'rxjs/operators';
import { ShellMenu } from './service';
import { MatSidenavContent } from '@angular/material/sidenav';
import { Transport } from '@ts-core/common';

@Component({
    templateUrl: './shell-page.component.html',
    styleUrls: ['./shell-page.component.scss']
})
export class ShellPageComponent extends ShellBaseComponent implements AfterViewInit {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild('container', { static: true })
    public container: MatSidenavContent;
    public isNeedScrollButton: boolean = false;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        notifications: NotificationService,
        breakpointObserver: BreakpointObserver,
        element: ElementRef,
        private router: RouterService,
        private transport: Transport,
        public settings: SettingsService,
        public menu: ShellMenu
    ) {
        super(notifications, breakpointObserver);
        ViewUtil.addClasses(element, 'd-block w-100 h-100');

        router.completed.pipe(takeUntil(this.destroyed)).subscribe(this.routerCompletedHandler);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    public async ngAfterViewInit(): Promise<void> {
        this.initialize();
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handler
    //
    //--------------------------------------------------------------------------

    private routerCompletedHandler = (): void => {
        if (!this.router.isUrlActive(this.router.previousUrl)) {
            this.scrollTop();
        }
        if (!this.isNeedSide) {
            this.isShowMenu = false;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public scrollTop(): void {
        this.container.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
