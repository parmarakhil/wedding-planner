import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { GALLERY_ROUTE } from './gallery.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([GALLERY_ROUTE])],
  declarations: [GalleryComponent],
})
export class GalleryModule {}
