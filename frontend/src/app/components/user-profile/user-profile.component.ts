import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  title="Alice";
  subtitle="Sponsored";
  @Input() commenter_info:Comment={_id:-1,commenter_id:-1, post_id:-1,text:"",createdAt:""};

  ngOnInit(){
    this.subtitle=this.commenter_info.text;
  }
}
