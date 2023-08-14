import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { faLayerGroup, faHome } from '@fortawesome/free-solid-svg-icons';

import { NavigationOptions } from '../models/navigation';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  getNavigationItems(): Observable<NavigationOptions[]> {
    return of([
      {
        title: 'Main',
        icon: { name: faLayerGroup },
        items: [
          {
            icon: { name: faHome },
            title: 'Home Page',
            link: '/home',
          },
          {
            icon: { name: faHome },
            title: 'Welcome',
            link: '/starter',
          },
        ],
      },
    ]);
  }
}
