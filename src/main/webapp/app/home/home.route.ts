import { Route } from '@angular/router';
import { GalleryComponent } from 'app/gallery/gallery.component';

import { HomeComponent } from './home.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    pageTitle: 'Shehnai',
  },
};
