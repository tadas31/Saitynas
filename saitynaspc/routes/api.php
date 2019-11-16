<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    Route::post('users', 'RegisterController@index');
    Route::post('register', 'RegisterController@register');
    Route::put('makeadmin/{id}', 'RegisterController@makeAdmin');
});

//--------------------------------------------------------------------------------------

//List parts
Route::get('parts', 'PartController@index');

//List all parts of specified type
Route::get('parts/{type}', 'PartController@showByType');

//List single part
Route::get('part/{id}', 'PartController@show');

//Create new part
Route::post('part', 'PartController@store');

//Update part
Route::put('part/{id}', 'PartController@update');

//Delete part
Route::delete('part/{id}', 'PartController@destroy');

//--------------------------------------------------------------------------------------

//List computers
Route::get('computers', 'ComputerController@index');

//List all computers by user
Route::get('computers/{id}', 'ComputerController@showByUser');

//List single computer
Route::get('computer/{id}', 'ComputerController@show');

//Create new computer
Route::post('computer', 'ComputerController@store');

//Update computer
Route::put('computer/{id}', 'ComputerController@update');

//Delete computer
Route::delete('computer/{id}', 'ComputerController@destroy');

//--------------------------------------------------------------------------------------

//List comments
Route::get('comments', 'CommentController@index');

//List single comment
Route::get('comments/{id}', 'CommentController@show');

//Create new comment
Route::post('comment', 'CommentController@store');

//Update comment
Route::put('comment/{id}', 'CommentController@update');

//Delete comment
Route::delete('comment/{id}', 'CommentController@destroy');

//--------------------------------------------------------------------------------------

Route::fallback(
    function()
    {
        return response()->json(['message' => 'Page Not Found'], 404);
    }
);
