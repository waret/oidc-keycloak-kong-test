import { NgModule } from '@angular/core';

import { BobSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [BobSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BobSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BobSharedCommonModule {}
