import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Comment } from '../../models/comment.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/auth.selectors';

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

  constructor(private store:Store){
    this.store.select(selectUser).subscribe((response)=>{
      console.log("response in userProfile: "+JSON.stringify(response))
    })
  }

  ngOnInit(){
    this.subtitle=this.commenter_info.text;

  }
}
