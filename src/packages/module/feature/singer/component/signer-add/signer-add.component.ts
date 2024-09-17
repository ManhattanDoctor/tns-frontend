import { Component, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { ISigner } from '../../service';
import { Variables } from '@project/common/hlf/acl';

@Component({
    templateUrl: 'signer-add.component.html',
})
export class SingerAddComponent extends IWindowContent implements ISerializable<ISigner> {
    // --------------------------------------------------------------------------
    //
    //  Constants
    //
    // --------------------------------------------------------------------------

    public static EVENT_ADDED = 'EVENT_ADDED';

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public uid: string;
    public name: string;
    public publicKey: string;
    public privateKey: string;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private windows: WindowService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.uid = Variables.root.uid;
        this.name = 'ROOT_USER';
        this.publicKey = '0x1fc1e02161515812ddFE05B32Bb0ACCC2D5D739e';
        this.privateKey = '096d59a4fa23e40e5b360aadd037fb7c61b1043852d79e018e4cd1f098658b25';
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public serialize(): ISigner {
        return {
            uid: this.uid,
            name: this.name,
            key: {
                publicKey: this.publicKey,
                privateKey: this.privateKey,
            }
        };
    }

    public async submit(): Promise<void> {
        await this.windows.question('signer.addConfirmation').yesNotPromise;
        this.emit(SingerAddComponent.EVENT_ADDED);
    }
}
