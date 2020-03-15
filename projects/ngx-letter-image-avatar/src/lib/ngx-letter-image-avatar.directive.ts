import { Directive, OnChanges, Input, ElementRef } from '@angular/core';

export interface INgxLetterImageAvatarSettings {
  name?: string;
  size?: number;
  font?: string;
  fontColor?: string;
  fill?: string;
  placeholder?: string;
}
// based on https://gist.github.com/leecrossley/6027780
@Directive({
  selector: '[ngxLetterImageAvatar]'
})
export class NgxLetterImageAvatarDirective implements OnChanges {

  public static defaults = {
    size: 500,
    placeholder: '?',
    font: 'Arial',
    fontColor: '#fff'
  };

  @Input('ngxLetterImageAvatar')
  public settings: INgxLetterImageAvatarSettings | string = {};

  @Input()
  public src: string;

  public normalizedSettings: INgxLetterImageAvatarSettings;

  public colors = [
    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
    '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
  ];

  public get name(): string {
    return this.normalizedSettings.name || '';
  }

  public get nameArray(): string[] {
    return String(this.name).toUpperCase().split(' ');
  }

  public get initials(): string {
    let initials = '';
    for (const word of this.nameArray) {
      initials = initials + word.charAt(0);
    }
    if (!initials) {
      initials = this.normalizedSettings.placeholder;
    }
    return initials;
  }

  public get ratio(): number {
    return window && window.devicePixelRatio || 1;
  }

  public get size(): number {
    return this.normalizedSettings.size;
  }

  public get sizeAcordingToPixelRatio(): number {
    return Math.floor(this.size * this.ratio);
  }

  public get charIndex(): number {
    return (this.initials === NgxLetterImageAvatarDirective.defaults.placeholder ? 72 : this.initials.charCodeAt(0)) - 64;
  }

  public get colorIndex(): number {
    return this.charIndex % 20;
  }

  public get fillStyle(): string {
    return this.normalizedSettings.fill || this.colors[this.colorIndex - 1];
  }

  public get fontSize(): number {
    return Math.floor(this.sizeAcordingToPixelRatio / this.initials.length);
  }

  public get font(): string {
    return this.normalizedSettings.font;
  }

  public get fontColor(): string {
    return this.normalizedSettings.fontColor;
  }

  public dataUri: string;

  constructor(public el: ElementRef) {

  }

  ngOnChanges() {
    this.setNormalizedSettings();
    this.draw();
  }

  private getDataUri(): any {
    let canvas: HTMLCanvasElement | null = document && document.createElement('canvas');
    canvas.width = this.sizeAcordingToPixelRatio;
    canvas.height = this.sizeAcordingToPixelRatio;

    const context = canvas.getContext('2d');
    context.fillStyle = this.fillStyle;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = `${this.fontSize}px ${this.font}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = this.fontColor;
    context.fillText(this.initials,
      this.sizeAcordingToPixelRatio / 2,
      this.sizeAcordingToPixelRatio / 1.9,
      this.sizeAcordingToPixelRatio);
    const dataUri = canvas.toDataURL();
    canvas = null;
    return dataUri;
  }

  private draw(): void {
    if (this.src) {
      this.el.nativeElement.src = this.src;
    } else {

      this.el.nativeElement.src = this.getDataUri();
    }
  }

  private setNormalizedSettings(): void {
    const inputSettings = typeof this.settings === 'string' ? { name: this.settings } : this.settings;
    this.normalizedSettings = {
      ...NgxLetterImageAvatarDirective.defaults,
      ...inputSettings
    };
  }
}
