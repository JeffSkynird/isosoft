<?php

namespace App\Http\Controllers\v1\Evaluation;

use App\Http\Controllers\Controller;
use App\Models\System;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use \Validator;
class SystemController extends Controller
{

    public function index(){
        $user = Auth::user();
        $data = System::where('id_user', $user->id)->orderBy('created_at')->get();
        return response()->json([
            "status" => "200",
            "data"=>$data,
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
    public function create(Request $request)
    {
        $name = $request->input('name');
        $url = $request->input('url');
        $description = $request->input('description');
       $user = Auth::user();
        $vacios = Validator::make($request->all(), [
            'name' => 'required',
            'url' => 'required'
        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            System::create([
                'name' => $name,
                'url' => $url,
                'description' => $description,
                'id_user'=>$user->id
              
            ]);
            return response()->json([
                "status" => "200",
                "message" => 'Registro exitoso',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function show($id)
    {
        $data = System::find($id);
        if(!is_null($data)){
            return response()->json([
                "status" => "200",
                "message" => 'Datos obtenidos con éxito',
                "data" => $data,
                "type" => 'success'
            ]);
        }else{
            return response()->json([
                "status" => "500",
                "message" => "Datos no encontrados",
                "type" => 'error'
            ]);
        }
        
    }
    public function update(Request $request,$id){
        $name = $request->input('name');
        $url = $request->input('url');
        $description = $request->input('description');
        $vacios = Validator::make($request->all(), [
            'name' => 'required',
            'url' => 'required'
        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            $system = System::find($id);
            $system->name=$name;
            $system->url=$url;
            $system->description=$description;
            $system->save();

            return response()->json([
                "status" => "200",
                "message" => 'Modificación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function delete($id)
    {
        $data = System::find($id);
        if(!is_null($data)){
            $data->delete();
            return response()->json([
                "status" => "200",
                "message" => 'Eliminación exitosa',
                "type" => 'success'
            ]);
        }else{
            return response()->json([
                "status" => "500",
                "message" => 'Datos no encontrados',
                "type" => 'error'
            ]);
        }
    }
}
