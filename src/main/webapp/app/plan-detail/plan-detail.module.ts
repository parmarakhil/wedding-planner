import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PlanDetailComponent } from './plan-detail.component';
import { PlanDetail_ROUTE } from './paln-detail.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([PlanDetail_ROUTE])],
  declarations: [PlanDetailComponent],
})
export class PlandetailModule {}
