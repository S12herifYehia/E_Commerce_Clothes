import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

import gsap from 'gsap';
import { Power2 } from 'gsap-trial';

import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrl: './scroll-bar.component.scss',
})
export class ScrollBarComponent {
  @ViewChild('bar') bar!: ElementRef;
  @ViewChild('val') val!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}

  render: Renderer2 = inject(Renderer2);

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.scrolling();  
  }

  @HostListener('window:scroll', ['$event'])
  onscroll() {
    this.scrolling();
  }

  scrolling() {
    if (isPlatformBrowser(this.platformid)) {
      var top = document.documentElement.scrollTop;

      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      var val = Math.round((top / height) * 100);

      this.render.setStyle(
        this.bar.nativeElement,
        'background',
        `conic-gradient(#FF7043 ${val}%, white ${val}% )`,
        
      );
    }
  }

  Scroll_top() {
    gsap.to(window, { scrollTo: 0, duration: 2, ease: 'power2.inOut' });
  }
}
