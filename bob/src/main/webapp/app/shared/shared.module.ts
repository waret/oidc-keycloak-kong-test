import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { BobSharedLibsModule, BobSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [BobSharedLibsModule, BobSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [BobSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BobSharedModule {
    static forRoot() {
        return {
            ngModule: BobSharedModule
        };
    }
}
