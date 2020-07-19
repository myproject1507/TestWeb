import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/account/admin-login/admin-login.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserFatwaComponent } from './components/user-fatwa/user-fatwa.component';
import { UserFeedbackComponent } from './components/user-feedback/user-feedback.component';
import { DarulIftaServiceOnOffComponent } from './components/darul-ifta-service-on-off/darul-ifta-service-on-off.component';
import { LiveBayanTimerSettingComponent } from './components/live-bayan-timer-setting/live-bayan-timer-setting.component';
import { JumaBayanComponent } from './components/juma-bayan/juma-bayan.component';
import { ShortVideoClipComponent } from './components/short-video-clip/short-video-clip.component';
import { MadarsaTimeSettingComponent } from './components/madarsa-time-setting/madarsa-time-setting.component';
import { NamazTimeSettingComponent } from './components/namaz-time-setting/namaz-time-setting.component';
import { AudioAshaarComponent } from './components/audio/audio-ashaar/audio-ashaar.component';
import { AudioMaulanaBayanComponent } from './components/audio/audio-maulana-bayan/audio-maulana-bayan.component';
import { LessonTodayComponent } from './components/lesson-today/lesson-today.component';
import { UrduBooksComponent } from './components/books/urdu-books/urdu-books.component';
import { EnglishBooksComponent } from './components/books/english-books/english-books.component';
import { LatestBooksComponent } from './components/books/latest-books/latest-books.component';
import { SpecialCollectionComponent } from './components/special-collection/special-collection.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SliderSettingComponent } from './components/activities/slider-setting/slider-setting.component';
import { ImportantKnowledgeComponent } from './components/activities/important-knowledge/important-knowledge.component';
import { AnnouncementComponent } from './components/activities/announcement/announcement.component';
import { UserSubscribersComponent } from './components/user-subscribers/user-subscribers.component';
import { ReplyFatwaComponent } from './components/partial-components/user-fatwa-partial/reply-fatwa/reply-fatwa.component';
import { MasterLayoutComponent } from './shared/master-layout/master-layout.component';
import { ViewsComponent } from './components/views/views.component';
import { UnauthoriseUserComponent } from './components/unauthorise-user/unauthorise-user.component';
import { EditUsernameComponent } from './components/account/edit-username/edit-username.component';
import { EditEmailIdComponent } from './components/account/edit-email-id/edit-email-id.component';
import { ViewProfileDetailsComponent } from './components/account/view-profile-details/view-profile-details.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ProfileSettingComponent } from './components/account/profile-setting/profile-setting.component';
import { EditNameComponent } from './components/account/edit-name/edit-name.component';
import { EditMobileNumberComponent } from './components/account/edit-mobile-number/edit-mobile-number.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    UserFatwaComponent,
    UserFeedbackComponent,
    DarulIftaServiceOnOffComponent,
    LiveBayanTimerSettingComponent,
    JumaBayanComponent,
    ShortVideoClipComponent,
    MadarsaTimeSettingComponent,
    NamazTimeSettingComponent,
    AudioAshaarComponent,
    AudioMaulanaBayanComponent,
    LessonTodayComponent,
    UrduBooksComponent,
    EnglishBooksComponent,
    LatestBooksComponent,
    SpecialCollectionComponent,
    GalleryComponent,
    SliderSettingComponent,
    ImportantKnowledgeComponent,
    AnnouncementComponent,
    UserSubscribersComponent,
    MasterLayoutComponent,
    ViewsComponent,
    UnauthoriseUserComponent,
    EditUsernameComponent,
    EditEmailIdComponent,
    ViewProfileDetailsComponent,
    ProfileSettingComponent,
    EditNameComponent,
    EditMobileNumberComponent,
    ErrorComponent,
    ReplyFatwaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
