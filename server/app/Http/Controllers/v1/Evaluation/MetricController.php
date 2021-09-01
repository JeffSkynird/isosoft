<?php

namespace App\Http\Controllers\v1\Evaluation;

use App\Http\Controllers\Controller;
use App\Models\Metric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
class MetricController extends Controller
{
    public function showByPoll(Request $request,$id){
        $data = \DB::select("select me.id,me.name as metric,sys.name as system,eva.score,eva.created_at from evaluations eva, metrics me,systems sys,polls pol where sys.id=pol.id_system and me.id=eva.id_metric and eva.id_pool=pol.id and pol.id=$id");
        return response()->json([
            "status" => "200",
            "data" => $data,
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
    public function index()
    {
        $data = Metric::all();
        return response()->json([
            "status" => "200",
            "data" => $data,
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
}
