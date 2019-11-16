<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Comment;
use App\Http\Resources\Comment as CommentResource;
use Exception;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get comments
        $comments = Comment::all();

        if(sizeof($comments) > 0)
            return CommentResource::collection($comments);
        else
            return response()->json( ['message' => 'no comments found'], 404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try
        {
            // $this->middleware('auth:api', ['except' => ['login']]);

            if (auth()->user())
            {
                //create new comment
                $comment = new Comment;

                $comment->user_id = auth()->id();
                $comment->user_name = auth()->user()->name;

                $comment->comment = $request->input('comment');
                $comment->computer_id = $request->input('computer_id');

                if($comment->save())
                    return new CommentResource($comment);
                else
                    return response()->json( ['message' => 'comment was not created']);
            }
            else
                return response()->json(['message' => 'Unauthorized'], 401);
        }
        catch (Exception $ex)
        {
            return response()->json( ['message' => $ex->getMessage()], $ex->getCode());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //get all coments of specific computer
        $comments = Comment::whereIn('computer_id', [$id])->get();

        if(sizeof($comments) > 0)
            return CommentResource::collection($comments);
        else
            return response()->json( ['message' => 'no comments found'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try
        {
            // $this->middleware('auth:api', ['except' => ['login']]);

            if (auth()->user() && auth()->id() == Comment::findOrFail($id)->user_id )
            {
                //gets comment to update
                $comment = Comment::findOrFail($id);

                $comment->user_id = auth()->id();
                $comment->user_name = auth()->user()->name;

                $comment->comment = $request->input('comment');

                if($comment->save())
                    return new CommentResource($comment);
                else
                    return response()->json( ['message' => 'comment was not updated'] );
            }
            else
                return response()->json(['message' => 'Unauthorized'], 401);
        }
        catch (Exception $ex)
        {
             return response()->json( ['message' => $ex->getMessage()], $ex->getCode());
        }
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try
        {
            // $this->middleware('auth:api', ['except' => ['login']]);

            if ( auth()->user() && ( auth()->id() == Comment::findOrFail($id)->user_id || auth()->user()->is_admin == true ) )
            {
                //delete comment
                $comment = Comment::findOrFail($id);

                if($comment->delete())
                    return new CommentResource($comment);
                else
                    return response()->json( ['message' => 'comment was not deleted'] );
            }
            else
                return response()->json(['message' => 'Unauthorized'], 401);
        }
        catch (Exception $ex)
        {
             return response()->json( ['message' => $ex->getMessage()], $ex->getCode());
        }
    }
}
