import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CommonConceptComponent } from './common-concept/common-concept.component';
import { ToastComponent } from './toast/toast.component';
import { PersonComponent } from './person/person.component';
import { PersonEditComponent } from './person/components/person-edit/person-edit.component';


export const VIEWS_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      name: 'Trang chủ',
      title: 'Trang chủ'
    }
  },
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'search-engine',
        component: SearchEngineComponent,
        data: {
          name: 'Động cơ tìm kiếm',
          title: 'Động cơ tìm kiếm'
        }
      },
      {
        path: 'timeline',
        component: TimelineComponent,
        data: {
          name: 'Dòng thời gian',
          title: 'Dòng thời gian'
        }
      },
      {
        path: 'common-concept',
        component: CommonConceptComponent,
        data: {
          name: 'Định nghĩa component chung',
          title: 'Định nghĩa component chung'
        }
      },
      {
        path: 'toast',
        component: ToastComponent,
        data: {
          name: 'Thông báo nổi',
          title: 'Thông báo nổi'
        }
      },
      {
        path: 'person',
        component: PersonComponent,
        data: {
          name: 'Quản lý người dùng',
          title: 'Quản lý người dùng'
        }
      },
      {
        path: 'person-edit/:id',
        component: PersonEditComponent,
        data: {
          name: 'Chỉnh sửa thông tin người dùng',
          title: 'Chỉnh sửa thông tin người dùng',
          hide: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(VIEWS_ROUTES)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
