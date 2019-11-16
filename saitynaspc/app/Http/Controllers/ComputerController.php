<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Computer;
use App\Part;
use App\Http\Resources\Computer as ComputerResource;
use Exception;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get computers
        $computers = Computer::all();

        if (sizeof($computers) > 0)
            return ComputerResource::collection($computers);
        else
            return response()->json(  ['message' => 'no computers found'], 404);
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
                //create new computer
                $computer = new Computer;

                $computer->name = $request->input('name');
                $computer->description = $request->input('description');
                $computer->image_url = $request->input('image_url');


                $motherboard = $request->input('motherboard_id') != null ? Part::findOrFail($request->input('motherboard_id')) : null;
                if ($motherboard != null && $motherboard->type == 'motherboard')
                    $computer->motherboard_id = $motherboard->id;

                $cpu = $request->input('cpu_id') != null ? Part::findOrFail($request->input('cpu_id')) : null;
                if ($cpu != null && $cpu->type == 'cpu')
                    $computer->cpu_id = $cpu->id;

                $ram = $request->input('ram_id') != null ? Part::findOrFail($request->input('ram_id')) : null;
                if ($ram != null && $ram->type == 'ram')
                    $computer->ram_id = $ram->id;


                $case = $request->input('case_id') != null ? Part::findOrFail($request->input('case_id')) : null;
                if ($case != null && $case->type == 'case')
                    $computer->case_id = $case->id;


                $psu = $request->input('psu_id') != null ? Part::findOrFail($request->input('psu_id')) : null;
                if ($psu != null && $psu->type == 'psu')
                    $computer->psu_id = $psu->id;

                $computer->user_id = auth()->id();

                if($computer->save())
                    return new ComputerResource($computer);
                else
                return response()->json( ['message' => 'computer was not created']);
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
            //get computer
            $computer = Computer::findOrFail($id);

            return new ComputerResource($computer);
        }
        catch (Exception $ex)
        {
             return response()->json( ['message' => $ex->getMessage()], $ex->getCode());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function showByUser($id)
    {
        //get all coments of specific computer
        $computers = Computer::whereIn('user_id', [$id])->get();

        if (sizeof($computers) > 0)
            return ComputerResource::collection($computers);
        else
            return response()->json( ['message' => 'computers created by user with id \''. $id .'\' not found'], 404);
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

            if (auth()->user() && auth()->id() == Computer::findOrFail($id)->user_id )
            {
                //gets computer to update
                $computer = Computer::findOrFail($id);

                $computer->name = $request->input('name');
                $computer->description = $request->input('description');
                $computer->image_url = $request->input('image_url');

                $motherboard = $request->input('motherboard_id') != null ? Part::findOrFail($request->input('motherboard_id')) : null;
                if ($motherboard != null && $motherboard->type == 'motherboard')
                    $computer->motherboard_id = $motherboard->id;
                else
                    $computer->motherboard_id = null;

                $cpu = $request->input('cpu_id') != null ? Part::findOrFail($request->input('cpu_id')) : null;
                if ($cpu != null && $cpu->type == 'cpu')
                    $computer->cpu_id = $cpu->id;
                else
                    $computer->cpu_id = null;

                $ram = $request->input('ram_id') != null ? Part::findOrFail($request->input('ram_id')) : null;
                if ($ram != null && $ram->type == 'ram')
                    $computer->ram_id = $ram->id;
                else
                    $computer->ram_id = null;


                $case = $request->input('case_id') != null ? Part::findOrFail($request->input('case_id')) : null;
                if ($case != null && $case->type == 'case')
                    $computer->case_id = $case->id;
                else
                    $computer->case_id = null;


                $psu = $request->input('psu_id') != null ? Part::findOrFail($request->input('psu_id')) : null;
                if ($psu != null && $psu->type == 'psu')
                    $computer->psu_id = $psu->id;
                else
                    $computer->psu_id = null;


                if($computer->save())
                    return new ComputerResource($computer);
                else
                    return response()->json( ['message' => 'computer was not updated']);
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

            if ( auth()->user() && ( auth()->id() == Computer::findOrFail($id)->user_id || auth()->user()->is_admin == true ) )
            {

                //delete computer
                $computer = Computer::findOrFail($id);

                if($computer->delete())
                    return new ComputerResource($computer);
                else
                    return response()->json( ['message' => 'computer was not deleted']);
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
