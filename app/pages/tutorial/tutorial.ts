/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthStoreService } from '../../core/store/auth.service';

interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  template: require('./tutorial.html')
})
export class TutorialPage {
  private slides: Slide[];
  private showSkip = true;

  constructor(private authSoreService: AuthStoreService,
              private nav: NavController,
              private menu: MenuController) {
    this.slides = [
      {
        title: 'Welcome to <b>ICA</b>',
        description: 'The <b>Ionic Conference App</b> is a practical preview of the Ionic Framework in action, and a ' +
        'demonstration of proper code use.',
        image: require('../../img/ica-slidebox-img-1.png')
      },
      {
        title: 'What is Ionic?',
        description: '<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality ' +
        'mobile apps with web technologies like HTML, CSS, and JavaScript.',
        image: require('../../img/ica-slidebox-img-2.png')
      },
      {
        title: 'What is Ionic Platform?',
        description: 'The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with ' +
        'integrated services like push notifications, native builds, user auth, and live updating.',
        image: require('../../img/ica-slidebox-img-3.png')
      }
    ];
  }

  startApp() {
    this.authSoreService.dispatchCheckToken();
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
