import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminActivitiesService {

  rootUrl: any;
  constructor(private httpClient: HttpClient) {
    this.rootUrl = environment.apiUrl;
   }

   userFatwaList() {
    return this.httpClient.post(this.rootUrl + 'api/adminActivities/userFatwaList', null);
  }

  userFeedbackList() {
    return this.httpClient.post(this.rootUrl + 'api/adminActivities/userFeedbackList', null);
  }

  userSubsciberList() {
    return this.httpClient.post(this.rootUrl + 'api/adminActivities/userSubsciberList', null);
  }

  fetchJumaBayanList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchJumaBayanList');
  }

  fetchJumaBayanUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchJumaBayanUrList');
  }

  //******* Live Timer Setting******** */
  changeTimerSettingList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/changeTimerSettingList');
  }

  changeTimerSettingUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/changeTimerSettingUrList');
  }

  addEditTimerSetting(data: any) {
    let body = new FormData();
    var postdata = "{'TimerId':" + data.TimerId + ",'Title':'" + data.Title + "','Heading':'" + data.Heading + "','TimerValue':'" + data.TimerValue + "','Month':'" + data.Month + "','Date':'" + data.Date + "','Year':'" + data.Year + "','Hours':'" + data.Hours + "','Minutes':'" + data.Minutes + "','Seconds':'" + data.Seconds + "','UrTitle':'" + data.UrTitle + "','UrHeading':'" + data.UrHeading + "','MolanaName':'" + data.MolanaName + "','UrMolanaName':'" + data.UrMolanaName + "'}";
    body.append('jsondata', postdata);
    body.append('UrMolanaNameImg', data.UrMolanaNameImgUrl);
    body.append('MolanaNameImg', data.MolanaNameImgUrl);
    return this.httpClient.post(this.rootUrl + 'api/adminActivities/addEditTimerSetting', body);
  }

  deleteTimerSetting(id: number) {
    let params = {
      TimerId: id
    }
    return this.httpClient.post(this.rootUrl + 'api/adminActivities/deleteTimerSetting', params);
  }


  // ********** Asha'ar ***********************
  fetchAshaarList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchAshaarList');
  }

  FetchAshaarUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/FetchAshaarUrList');
  }

  fetchMolanaBayanList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchMolanaBayanList');
  }

  fetchMolanaBayanUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchMolanaBayanUrList');
  }

  fetchTodaysLessonList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchTodaysLessonList');
  }

  fetchTodaysLessonUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchTodaysLessonUrList');
  }

  fetchEnglishBooksList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchEnglishBooksList');
  }

  fetchUrduBooksList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchUrduBooksList');
  }

  fetchLatestBooksList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchLatestBooksList');
  }

  fetchSpecialCollectionList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchSpecialCollectionList');
  }

  fetchSpecialCollectionUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchSpecialCollectionUrList');
  }

  fetchSliderImageList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchSliderImageList');
  }

  fetchAdvertisementList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchAdvertisementList');
  }

  fetchAdvertisementUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchAdvertisementUrList');
  }

  fetchOnLoadImageAnnouncementList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchOnLoadImageAnnouncementList');
  }

  fetchShortClipList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchShortClipList');
  }

  fetchShortClipUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchShortClipUrList');
  }

  fetchMadarsaTimingList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchMadarsaTimingList');
  }

  fetchMadarsaTimingUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchMadarsaTimingUrList');
  }

  fetchNamazTimingList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchNamazTimingList');
  }

  fetchNamazTimingUrList() {
    return this.httpClient.get(this.rootUrl + 'api/adminActivities/fetchNamazTimingUrList');
  }
}
