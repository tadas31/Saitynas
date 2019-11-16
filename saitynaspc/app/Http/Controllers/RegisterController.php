<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Http\Resources\Register as RegisterResource;
use Illuminate\Support\Facades\Hash;
use Exception;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user() && auth()->user()->is_admin == true)
        {
            //get comments
            $users = User::all();

            if(sizeof($users) > 0)
                return RegisterResource::collection($users);
            else
                return response()->json( ['message' => 'no users found'], 404);
        }
        else
            return response()->json(['message' => 'Unauthorized'], 401);
    }


    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        try
        {
            $user = new User;

            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));

            if($user->save())
                return new RegisterResource($user);
            else
                return response()->json( ['message' => 'user was not registered']);
        }
        catch (Exception $ex)
        {
            return response()->json(['message' => $ex->getMessage()], 400);
        }
    }

    /**
     * give specific user admin privilages
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function makeAdmin($id)
    {
        if (auth()->user() && auth()->user()->is_admin == true)
        {
            $user = User::findOrFail($id);

            $user->is_admin = true;
            if($user->save())
                return new RegisterResource($user);
            else
                return response()->json( ['message' => 'failed to make user with id \''. $id. '\' into admin']);
        }
        else
            return response()->json(['message' => 'Unauthorized'], 401);
    }
}
