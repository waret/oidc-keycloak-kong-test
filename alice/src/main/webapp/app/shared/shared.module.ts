import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { AliceSharedLibsModule, AliceSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [AliceSharedLibsModule, AliceSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [AliceSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AliceSharedModule {
    static forRoot() {
        return {
            ngModule: AliceSharedModule
        };
    }
}
