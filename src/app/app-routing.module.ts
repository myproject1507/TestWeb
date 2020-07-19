import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLayoutComponent } from './shared/master-layout/master-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserFatwaComponent } from './components/user-fatwa/user-fatwa.component';
import { UserFeedbackComponent } from './components/user-feedback/user-feedback.component';
import { UserSubscribersComponent } from './components/user-subscribers/user-subscribers.component';
import { ViewsComponent } from './components/views/views.component';
import { DarulIftaServiceOnOffComponent } from './components/darul-ifta-service-on-off/darul-ifta-service-on-off.component';
import { LiveBayanTimerSettingComponent } from './components/live-bayan-timer-setting/live-bayan-timer-setting.component';
import { ShortVideoClipComponent } from './components/short-video-clip/short-video-clip.component';
import { JumaBayanComponent } from './components/juma-bayan/juma-bayan.component';
import { MadarsaTimeSettingComponent } from './components/madarsa-time-setting/madarsa-time-setting.component';
import { NamazTimeSettingComponent } from './components/namaz-time-setting/namaz-time-setting.component';
import { AudioAshaarComponent } from './components/audio/audio-ashaar/audio-ashaar.component';
import { AudioMaulanaBayanComponent } from './components/audio/audio-maulana-bayan/audio-maulana-bayan.component';
import { LessonTodayComponent } from './components/lesson-today/lesson-today.component';
import { EnglishBooksComponent } from './components/books/english-books/english-books.component';
import { UrduBooksComponent } from './components/books/urdu-books/urdu-books.component';
import { LatestBooksComponent } from './components/books/latest-books/latest-books.component';
import { SpecialCollectionComponent } from './components/special-collection/special-collection.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SliderSettingComponent } from './components/activities/slider-setting/slider-setting.component';
import { ImportantKnowledgeComponent } from './components/activities/important-knowledge/important-knowledge.component';
import { AnnouncementComponent } from './components/activities/announcement/announcement.component';
import { UnauthoriseUserComponent } from './components/unauthorise-user/unauthorise-user.component';
import { AdminLoginComponent } from './components/account/admin-login/admin-login.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { EditUsernameComponent } from './components/account/edit-username/edit-username.component';
import { EditEmailIdComponent } from './components/account/edit-email-id/edit-email-id.component';
import { ViewProfileDetailsComponent } from './components/account/view-profile-details/view-profile-details.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ProfileSettingComponent } from './components/account/profile-setting/profile-setting.component';
import { AdminGuard } from './guards/admin-guard/admin.guard';
import { ErrorComponent } from './components/error/error.component';
import { ReplyFatwaComponent } from './components/partial-components/user-fatwa-partial/reply-fatwa/reply-fatwa.component';


const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent},
  { path: '', redirectTo: 'admin-login', pathMatch: 'full'},
  { path: 'dashboard', component: MasterLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'user-fatwa', component: UserFatwaComponent },
      { path: 'user-feedback', component: UserFeedbackComponent },
      { path: 'subscribers', component: UserSubscribersComponent },
      { path: 'views', component: ViewsComponent },
      { path: 'fatwa-service-setting', component: DarulIftaServiceOnOffComponent },
      { path: 'live-bayan-timer-setting', component: LiveBayanTimerSettingComponent },
      { path: 'juma-molana-bayan', component: JumaBayanComponent },
      { path: 'short-video-clip', component: ShortVideoClipComponent },
      { path: 'madarsa-timing-setting', component: MadarsaTimeSettingComponent },
      { path: 'namaz-timing-setting', component: NamazTimeSettingComponent },
      { path: 'audio-ashaar', component: AudioAshaarComponent },
      { path: 'audio-molana-bayan', component: AudioMaulanaBayanComponent },
      { path: 'lesson-of-today', component: LessonTodayComponent },
      { path: 'english-books', component: EnglishBooksComponent },
      { path: 'urdu-books', component: UrduBooksComponent },
      { path: 'latest-books', component: LatestBooksComponent },
      { path: 'special-collection', component: SpecialCollectionComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'slider-setting', component: SliderSettingComponent },
      { path: 'knowledgebase', component: ImportantKnowledgeComponent },
      { path: 'announcement', component: AnnouncementComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'edit-username', component: EditUsernameComponent },
      { path: 'edit-emailid', component: EditEmailIdComponent },
      { path: 'profile-setting', component: ProfileSettingComponent },
      { path: 'view-profile-details', component: ViewProfileDetailsComponent },
      { path: 'reply-fatwa', component: ReplyFatwaComponent },
      { path: '**', component: UnauthoriseUserComponent }
    ], canActivate : [AdminGuard]
  },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
