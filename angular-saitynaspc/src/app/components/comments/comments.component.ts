import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

import { Comment } from '../../models/Comment';
import { ActivatedRoute } from '@angular/router';
import { format } from 'url';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html' ,
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  userId: string = localStorage.getItem('UserId');
  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;

  isEditing: boolean = false;
  editingId: string;


  comment: Comment = new Comment();
  editedComment: string;

  comments: Comment[];
  computer_id: string;

  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.computer_id = this.route.snapshot.paramMap.get('id');

    this.commentService.getCommentsByComputerId(this.computer_id).subscribe(comments => {
      this.comments = comments;
    });
  }

  onSubmit() {
    if (this.comment != null){
      const newComment: Comment = {
        id: null,
        user_id: null,
        user_name: null,
        comment: this.comment.comment,
        computer_id:  this.computer_id
      }

      this.commentService.createComment(newComment).subscribe(comment => {
        this.comments.push(comment);
      });
    }
  }

  onEdit() {
    if (this.comment != null){
      const newComment: Comment = {
        id: this.editingId,
        user_id: null,
        user_name: null,
        comment: this.editedComment,
        computer_id:  this.computer_id
      }

      this.commentService.editComment(newComment).subscribe(comment => {
        this.isEditing = false;
        this.editingId = "-1";
        this.editedComment = "";
        this.ngOnInit();
      });
    }
  }

  onDelete(commentId: string, responce: boolean) {
    if (responce)
      this.commentService.deleteComment(commentId).subscribe(comment => {
        this.ngOnInit();
      });
  }

}
