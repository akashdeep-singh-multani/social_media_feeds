import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Comment } from '../../models/comment.model';
import { Store } from '@ngrx/store';
import { BASE_URL } from '../../environment/environment';
import { CookieService } from 'ngx-cookie-service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  title="";
  subtitle="Sponsored";
  avatar_image="";
  BASE_URL=BASE_URL;
  @Input() commenter_info:Comment={_id:-1,commenter_id:-1, post_id:-1,text:"",createdAt:""};

  constructor(private store:Store, private cookieService:CookieService){
    // this.store.select(selectUser).subscribe((response)=>{
    //   console.log("response in userProfile: "+JSON.stringify(response))
      
    //   if(response){
    //     this.title=response.username;
    //     this.avatar_image=BASE_URL+'uploads/'+response.image;
    //   }
      
    // })
    const token=this.cookieService.get('jwt');;
    const user=decodeJwtToken(token).user;
    this.title=user.username;
    this.avatar_image=BASE_URL+'uploads/'+user.image;
    // const user=decodedData.user;
                        // console.log("decodeData user: "+JSON.stringify(user));
  }

  ngOnInit(){
    this.subtitle=this.commenter_info.text;

  }
}
