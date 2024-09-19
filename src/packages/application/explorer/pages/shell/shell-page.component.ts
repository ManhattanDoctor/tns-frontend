import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService, ViewUtil } from '@ts-core/angular';
import { ScrollCommand, ScrollService, ShellBaseComponent } from '@ts-core/angular-material';
import { ApiService, RouterService } from '@core/service';
import { ShellMenu } from './service';
import { MatSidenavContent } from '@angular/material/sidenav';
import { UserAddCommand } from '@common/hlf/acl/transport';
import { Transport } from '@ts-core/common';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'shell-page',
    styleUrl: './shell-page.component.scss',
    templateUrl: './shell-page.component.html'
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
        element: ElementRef,
        notifications: NotificationService,
        breakpointObserver: BreakpointObserver,
        private scroll: ScrollService,
        private transport: Transport,
        private router: RouterService,
        public menu: ShellMenu
    ) {
        super(notifications, breakpointObserver);
        ViewUtil.addClasses(element, 'd-block w-100 h-100');

        router.completed.pipe(takeUntil(this.destroyed)).subscribe(this.routerCompletedHandler);
        // transport.getDispatcher<MenuToggleEvent>(MenuToggleEvent.NAME).pipe(takeUntil(this.destroyed)).subscribe(() => this.toggleMenu());
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

    // --------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    // --------------------------------------------------------------------------

    protected get sideMediaQueryToCheck(): string {
        return `(min-width: ${992}px)`;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async ngAfterViewInit(): Promise<void> {
        this.initialize();
        this.scroll.container = this.container;
    }

    public scrollTop(): void {
        this.transport.send(new ScrollCommand());
    }
}
