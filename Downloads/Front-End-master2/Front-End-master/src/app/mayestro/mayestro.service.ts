import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../shared/services/auth.service";
import { map } from 'rxjs/operators/map'
import 'rxjs'

@Injectable({
  providedIn: "root"
})
export class MayestroService {
  id: any;
  constructor(private httpClient: HttpClient, private auth: AuthService) {}
 /**
  * gets an album 
  * @param id  album id
  */
  getAlbum(id) {
    return this.httpClient.get(this.auth.URL + `/albums/${id}`);
  }
  /**
  * gets tacks of an album 
  * @param id  album id
  */
  getTracks(id) {
    console.log("aaaa");
    return this.httpClient.get(this.auth.URL + `/albums/${id}/tracks`);
  }

   /**
  * gets a playlist 
  * @param id  playlist id
  */
  getPlaylist(id) {
    return this.httpClient.get(this.auth.URL + `/playlist/${id}`);
  }

  /**
  * gets tacks of a playlist 
  * @param id  playlist id
  */
  getPlaylistTracks(id) {
    return this.httpClient.get(this.auth.URL + `/playlist/${id}/tracks`);
  }

  /**
   * get home categories
   */
  getHome() {
    return this.httpClient.get(this.auth.URL + "/home");
  }
  /**
   * gets a category by its name
   * @param name category name
   */
  getSeeAll(name) {
    return this.httpClient.get(this.auth.URL + `/home/'${name}'`);
  }
  /**
   * gets playlists made by user
   */
  getMyPlaylists(){
    return this.httpClient.get(this.auth.URL+"/me/playlists",{
      headers: { token: localStorage.getItem("token") }
    });
  }
  
  /**
   * get tracks from a playlist
   * @param id of the playlist
   */
  getMytracks(id){
    return this.httpClient.get(this.auth.URL+`/me/playlists/${id}/tracks`,{
      headers: { token: localStorage.getItem("token") }
    });
  }
  /**
   * adds a song to a playlist
   * @param id of the song to be added to the playlist
   */
  putTrack(id:any){
    return this.httpClient.put(this.auth.URL+'/me/playlists',id).pipe(
      map((res: any) => {
        localStorage.setItem("token", res.token);
      })
    );
    
  }
  /**
   * remove a song from a playlist
   * @param id  of the song to be removed from the playlist
   */
    deleteTrack(id:any){
      return this.httpClient.delete(this.auth.URL+'/me/playlists',id).pipe(
        map((res: any) => {
          localStorage.setItem("token", res.token);
        })
      );
    }
  /**
   * gets playlist created by user
   * @param id of the playlist i created
   */
  getmyPlaylist(id) {
    
    return this.httpClient.get(this.auth.URL + `/me/playlists/${id}`,
    {
      headers: { token: localStorage.getItem("token") }, 
    });
  }
  /**
   * creates a playlist
   * @param name of playlist
   */
  createPlaylist(name){
    let obj={name}
    return this.httpClient.post(this.auth.URL+"/me/playlists",obj,
    {
      headers: { token: localStorage.getItem("token") }, 
    });
  }
}
