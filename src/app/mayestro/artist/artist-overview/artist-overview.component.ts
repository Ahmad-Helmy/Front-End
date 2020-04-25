import { ArtistService } from './../artist.service';
import { NotificationComponent } from './../../../open-mayestro/notification/notification.component';
import { IASong } from './../artist-song/artist-song.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MayestroService } from '../../mayestro.service';
import { IACard } from '../artist-card/artist-card.interface';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ICard } from '../../card/card.interface';

@Component({
  selector: 'app-artist-overview',
  templateUrl: './artist-overview.component.html',
  styleUrls: ['./artist-overview.component.css']
})
export class ArtistOverviewComponent implements OnInit {
  songs:Array<IASong>=[];
  albums:Array<IACard>=[];
  singles:Array<IACard>=[];
  id:any;
  constructor(private route:ActivatedRoute,private artist:ArtistService) { }

  ngOnInit() {
    
    this.route.params.pipe(
      switchMap(param=>{
        this.id=param['id']
        return combineLatest([
          this.artist.getArtistTopTracks(this.id),
          this.artist.getArtistAlbums(this.id),
          this.artist.getArtistSingles(this.id)
        ]); 
      })
      )
      .subscribe((comp:any)=>{

        comp[0].tracks.forEach((element:any) => {
          const song:IASong={
            name: element.name,
            duration:element.duration,
            image:element.image,
            isLiked:element.isLiked,
            id:element.id,
            url:element.url
          }
          this.songs.push(song)
        });
        comp[1].albums.forEach((element:any) => {
          const album:IACard={
            name: element.name,
            duration:0,
            image:element.image,
            isLiked:false,
            id:element.id,
            totalTracks:element.totalTracks
          }
          this.albums.push(album);
        });
        comp[2].tracks.forEach((element:any) => {
          const single:IACard={
            name: element.name,
            duration:element.duration,
            image:element.image,
            isLiked:element.isLiked,
            id:element.id,
            totalTracks:0
          }
          this.singles.push(single);
        });
      });
  

  }

}
