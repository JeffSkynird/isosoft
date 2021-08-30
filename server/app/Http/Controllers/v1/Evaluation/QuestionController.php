<?php

namespace App\Http\Controllers\v1\Evaluation;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use DB;
class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $metric=$request->input('metric');
        $data = \DB::select("select * from questions  where id in (select id_question from metric_questions where id_metric=$metric)");

        return response()->json([
            "status" => "200",
            "data" => $data,
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
    public function indexOptions()
    {
        $data = Option::all();

        return response()->json([
            "status" => "200",
            "data" => $data,
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
}
