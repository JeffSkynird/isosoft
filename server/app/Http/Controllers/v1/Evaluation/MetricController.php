<?php

namespace App\Http\Controllers\v1\Evaluation;

use App\Http\Controllers\Controller;
use App\Models\Metric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
class MetricController extends Controller
{
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
