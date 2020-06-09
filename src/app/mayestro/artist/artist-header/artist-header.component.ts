import { ArtistService } from './../artist.service';
import { Component, OnInit, Input,HostBinding  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-artist-header',
  templateUrl: './artist-header.component.html',
  styleUrls: ['./artist-header.component.css']
})

/**
 * Artist Header component 
 */

export class ArtistHeaderComponent implements OnInit {
/**
 * boolean to check if the user follow this artist
 */
  isFollowed=true;
  isPalyed=true;

/**
 * artistInfo object to contain artist information  
 */
  artistInfo={
    name:'',
    id:'',
    img:'',
    followers:''
  };
  id: any;
 
  constructor(private route:ActivatedRoute,private artist:ArtistService) { }
  
  /**
   * get artist information from the server and pass it to the object 
   */

  ngOnInit() {

    this.route.params.pipe(
      switchMap(param=>{
        this.id=param['id']
        return this.artist.getArtist(this.id)
       
      })
      )
      .subscribe((comp:any)=>{
       
        this.artistInfo.id=comp.id;
        this.artistInfo.name=comp.name;
        this.artistInfo.img=comp.image;
        this.isFollowed=comp.isFollowed;
      });
  }

  /**
   * change follow button label
   */

  follow()
  {
    if(this.isFollowed==true)
       this.isFollowed=false;
    else this.isFollowed=true;
  }

  /**
   * change play button label 
   */

  pLay(){
    
    if(this.isPalyed==true)
       this.isPalyed=false;
    else this.isPalyed=true;
  }

}