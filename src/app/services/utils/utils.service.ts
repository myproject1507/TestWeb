import { Injectable } from '@angular/core';

declare var jQuery: any;
declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // tslint:disable-next-line: only-arrow-functions
  showNotificationMessasge = function (from1, align1, icon1, message1, type1) {
    jQuery.notify({
      icon: icon1,
      message: message1
    }, {
      element: 'body',
      position: null,
      type: type1,
      allow_dismiss: true,
      newest_on_top: false,
      showProgressbar: false,
      placement: {
        from: from1,
        align: align1
      },
      offset: 20,
      spacing: 10,
      z_index: 1031,
      delay: 5000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '</div>'
    });
  }

  public confirmAlert(): Promise<any> {
    return new Promise((resolve, reject) => {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          swal.fire(
            'Deleted!',
            'Your record has been deleted successfully.',
            'success'
          )
          resolve(result)
        }
      },
      err => {
        reject(err)
      })
    });
  }
}
