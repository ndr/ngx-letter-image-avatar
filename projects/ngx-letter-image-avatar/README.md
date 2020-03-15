# [ngxLetterImageAvatar]

[ngxLetterImageAvatar] is an Angular2+ directive, which allows to create image (png) avatars according to first letters of strings (initials)

## Installation

Install ngxLetterImageAvatar directive using NPM:
```bash
npm install ngx-letter-image-avatar
```

## Usage
1. Import NgxLetterImageAvatar module:
```typescript
import { NgModule } from '@angular/core';
import { NgxLetterImageAvatarModule } from 'ngx-letter-image-avatar';

@NgModule({
  ...
  imports: [
    ...
    NgxLetterImageAvatarModule
  ]
})
export class AppModule {}
```


## Examples
```html
<img class="app-avatar" ngxLetterImageAvatar="John Doe" src="/assets/images/avatar.png" alt="avatar">
<img class="app-avatar" ngxLetterImageAvatar="John Doe" alt="avatar">
<img class="app-avatar" [ngxLetterImageAvatar]="{ name: 'John Doe' }" alt="avatar">
<img class="app-avatar" [ngxLetterImageAvatar]="{ name: 'Good day to you' }" alt="avatar">
```
![NgxLetterImageAvatar directive preview](https://raw.githubusercontent.com/ndr/ngx-letter-image-avatar/master/src/assets/images/screenshot.png)

## Options
```typescript
// you can pass as [ngxLetterImageAvatar] input object of type INgxLetterImageAvatarSettings or string (behave as name)
export interface INgxLetterImageAvatarSettings {
  name?: string; // string to get initials
  size?: number; // size. default = 500
  font?: string; // default = 'Arial'
  fontColor?: string; // default = '#FFFFFF'
  fill?: string; // default one of set depends of initials
  placeholder?: string; // default = '?'
}
```
