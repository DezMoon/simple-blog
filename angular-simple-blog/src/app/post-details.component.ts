import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  template: `
    <div *ngIf="selectedPost">
      <h2>{{ selectedPost.title }}</h2>
      <p>{{ selectedPost.content }}</p>
    </div>
  `,
})
export class PostDetailComponent {
  @Input() selectedPost: any;
}
