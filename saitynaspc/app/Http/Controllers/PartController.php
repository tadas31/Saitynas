<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Part;
use App\Http\Resources\Part as PartResource;
use Exception;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get parts
        $parts = Part::all();

        if (sizeof($parts) > 0)
            return PartResource::collection($parts);
        else
            return response()->json( ['message' => 'no parts found'], 404);
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

            if (auth()->user() && auth()->user()->is_admin == true)
            {
                //create new part
                $part = new Part;

                $part->type = $request->input('type');
                $part->model = $request->input('model');
                $part->specs = $request->input('specs');
                $part->image_url = $request->input('image_url');

                if($part->save())
                    return new PartResource($part);
                // else
                //     return ['message' => 'part was not created'];
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
        try
        {
            //get part
            $part = Part::findOrFail($id);
            return new PartResource($part);
        }
        catch (Exception $ex)
        {
            return response()->json( ['message' => $ex->getMessage()], $ex->getCode());
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  string  $type
     * @return \Illuminate\Http\Response
     */
    public function showByType($type)
    {
        //get all coments of specific computer
        $parts = Part::whereIn('type', [$type])->get();

        if (sizeof($parts) > 0)
            return PartResource::collection($parts);
        else
            return response()->json( ['message' => 'part of type \''. $type .'\' not found'], 404);
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

            if (auth()->user() && auth()->user()->is_admin == true)
            {
                //gets part to update
                $part = Part::findOrFail($id);

                $part->type = $request->input('type');
                $part->model = $request->input('model');
                $part->specs = $request->input('specs');
                $part->image_url = $request->input('image_url');

                if($part->save())
                    return new PartResource($part);
                // else
                //     return response()->json( ['message' => 'part was not updated']);
            }
            else
                return response()->json(['message' => 'Unauthorized'], 401);
        }
        catch (Exception $ex)
        {
            return response()->json(['message' => $ex->getMessage()], $ex->getCode());
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

            if (auth()->user() && auth()->user()->is_admin == true)
            {
                //delete part
                $part = Part::findOrFail($id);

                if($part->delete())
                    return new PartResource($part);
                // else
                //     return response()->json( ['message' => 'part was not deleted']);
            }
            else
                return response()->json(['message' => 'Unauthorized'], 401);
        }
        catch (Exception $ex)
        {
            return response()->json(['message' => $ex->getMessage()], $ex->getCode());
        }
    }
}
