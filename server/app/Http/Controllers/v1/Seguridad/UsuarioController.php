<?php

namespace App\Http\Controllers\v1\Seguridad;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use \Validator;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class UsuarioController extends Controller
{
    public function create(Request $request)
    {
        $names = $request->input('names');
        $lastNames = $request->input('last_names');
        $email = $request->input('email');
        $password = $request->input('password');
        $vacios = Validator::make($request->all(), [
            'names' => 'required',
            'last_names' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            User::create([
                'names' => $names,
                'last_names' => $lastNames,
                'email' => $email,
                'password' => $password,
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
        $data = User::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function showAuth()
    {
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => Auth::user(),
            "type" => 'success'
        ]);
    }
    public function update(Request $request,$id){
        $names = $request->input('names');
        $lastNames = $request->input('last_names');
        $email = $request->input('email');
        $password = $request->input('password');
        $newPassword = $request->input('new_password');
        $vacios = Validator::make($request->all(), [
            'names' => 'required',
            'last_names' => 'required',
            'email' => 'required'
        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            $user = User::find($id);
            $user->names=$names;
            $user->last_names=$lastNames;
            $user->email=$email;
            if(!is_null($password)&&!is_null($newPassword)){
                if(Hash::check($password, $user->password)){
                    $user->password=$newPassword;
                }
            }
            $user->save();

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
    public function updateAuth(Request $request){
        $userAuth = Auth::user();
        $names = $request->input('names');
        $lastNames = $request->input('last_names');
        $email = $request->input('email');
        $password = $request->input('password');
        $vacios = Validator::make($request->all(), [
            'names' => 'required',
            'last_names' => 'required',
            'email' => 'required'
        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            $user = User::find($userAuth->id);
            $user->names=$names;
            $user->last_names=$lastNames;
            $user->email=$email;
            if(!is_null($password)){
                $user->password=$password;
            }
            $user->save();

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
        $data = User::find($id);
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
