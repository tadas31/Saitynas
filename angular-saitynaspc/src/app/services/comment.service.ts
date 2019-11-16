import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentsUrl: string = 'http://localhost:90/saitynaspc/public/api/comments';
  commentUrl: string = 'http://localhost:90/saitynaspc/public/api/comment';

  constructor(private http: HttpClient) { }

  getCommentsByComputerId(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl + '/' + id);
  }

  createComment(comment: Comment): Observable<Comment> {
    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')
        })
      }
      return this.http.post<Comment>(this.commentUrl, comment, httpOptions);
    }
    return null;
  }

  editComment(comment: Comment): Observable<Comment> {
    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')
         })
      }
      return this.http.put<Comment>(this.commentUrl + '/' + comment.id, comment, httpOptions);
    }
    return null;
  }

  deleteComment(commentId: string): Observable<Comment> {
    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')

         })
      }
      return this.http.delete<Comment>(this.commentUrl + '/' + commentId, httpOptions);
    }
    return null;
  }
}
