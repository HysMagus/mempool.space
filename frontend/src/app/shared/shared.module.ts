import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbButtonsModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { BytesPipe } from './pipes/bytes-pipe/bytes.pipe';
import { RoundPipe } from './pipes/math-round-pipe/math-round.pipe';
import { CeilPipe } from './pipes/math-ceil/math-ceil.pipe';
import { ChartistComponent } from '../statistics/chartist.component';

@NgModule({
  imports: [
    CommonModule,
    NgbButtonsModule.forRoot(),
    NgbModalModule.forRoot(),
  ],
  declarations: [
    ChartistComponent,
    RoundPipe,
    CeilPipe,
    BytesPipe,
  ],
  exports: [
    RoundPipe,
    CeilPipe,
    BytesPipe,
    NgbButtonsModule,
    NgbModalModule,
    ChartistComponent,
  ],
  providers: [
    BytesPipe
  ]
})
export class SharedModule { }
