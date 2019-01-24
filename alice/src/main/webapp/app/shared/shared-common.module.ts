import { NgModule } from '@angular/core';

import { AliceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [AliceSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [AliceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AliceSharedCommonModule {}
