import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-list',
  template: `
    <div *ngFor="let post of posts" (click)="selectPost(post)">
      {{ post.title }}
    </div>
  `,
})


export class PostListComponent {
  @Input() posts: any[];
  @Output() postSelected = new EventEmitter<any>();

  selectPost(post: any) {
    this.postSelected.emit(post);
  }
}
