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
  @Input() commenter_info:Comment={id:-1,userId:-1,text:""};

  ngOnInit(){
    this.subtitle=this.commenter_info.text;
  }
}
