<?php

namespace App\Http\Controllers\v1\Evaluation;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Evaluation;
use App\Models\Metric;
use App\Models\Option;
use App\Models\Poll;
use App\Models\System;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;
use \Validator;

class PollController extends Controller
{
    public function obtenerSistemasMetricas($id){
        $user = Auth::user();

        $data = \DB::select("select sys.name as system,me.name as metric,avg(eva.score) from metrics me, evaluations eva, polls po, systems sys where me.id=eva.id_metric and eva.id_pool=po.id and po.id_system=sys.id and sys.id=$id and sys.id_user=$user->id
        group by sys.name,me.name
        ");
        return $data;
    }
    public function obtenerPanelResult(Request $request){
        $user = Auth::user();
        $data = \DB::select("select avg(po.score),sys.id,sys.name from systems sys,polls po where sys.id_user=$user->id and po.id_system=sys.id group by sys.id,sys.name");
        $total=array();
        $labels=array();
        $values=array();
        foreach ($data as $val) {
            array_push($labels,$val->name);
            array_push($values,round(floatval($val->avg),2));
        }
        foreach ($data as $val) {
            $dat=$this->obtenerSistemasMetricas($val->id);
           array_push($total,array(
               "name"=>$val->name,
               "avg"=>round($val->avg,2),
               "detail"=>$dat
           ));
        }
       
        return response()->json([
            "status" => "200",
            "data" =>$total,
            "data1"=>array(
                "labels"=>$labels,
                "values"=>$values
            ),
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
    
    public function obtenerResultadoCaracteristica(Request $request){
        $idPoll=$request->input('id_poll');
        $idMetric =$request->input('id_metric');
   
        $data = \DB::select("select q.id,q.title,op.score from questions q,answers ans,evaluations eva,metrics me,options op where ans.id_option=op.id and eva.id_pool=$idPoll and eva.id_metric =me.id and me.id=$idMetric and q.id=ans.id_question and ans.id_evaluation=eva.id group by q.id,q.title,eva.score,op.score order by q.id");
        $labels=array();
        $values=array();
        foreach ($data as $val) {
            array_push($labels,$val->title);
            array_push($values,round(floatval($val->score),2));
        }
       
        return response()->json([
            "status" => "200",
            "data" => array(
                    'data'=>$data,
                    'sub_caracteristica'=>$labels,
                    'score'=>$values,
            ),
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
    public function obtenerResultado($id){
        $poll = Poll::find($id);
        $system=System::find($poll->id_system);
        $data = \DB::select("select me.name,eva.score from metrics me,evaluations eva, polls po, systems sys where eva.id_pool = po.id and po.id_system=sys.id and me.id=eva.id_metric and po.id=$id");
        $dataF=array();
       
        $dataF2=array();
        foreach ($data as $val) {
            array_push($dataF,$val->name);
            array_push($dataF2,round(floatval($val->score),2));
        }
       
        return response()->json([
            "status" => "200",
            "data" => array(
                
                    'poll'=>$poll,
                    'system'=>$system,
                    'metric'=>$dataF,
                    'score'=>$dataF2
                
            ),
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
    public function index()
    {
        $idUser = Auth::user();
        $data = \DB::select("select po.*,sy.name as system from polls po,systems sy where po.id_system =sy.id and po.id_system in (select id from systems where id_user=$idUser->id) order by po.id desc");
        return response()->json([
            "status" => "200",
            "data" => $data,
            "message" => 'Información obtenida con exitoso',
            "type" => 'success'
        ]);
    }
    public function create(Request $request)
    {
        $name = $request->input('name');
        $system = $request->input('system');
        $description = $request->input('description');
        $evaluations = $request->input('evaluations');
        //$user = Auth::user();
        $vacios = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'system' => 'required',
            'evaluations' => 'required'

        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            $poll=Poll::create([
                'name' => $name,
                'id_system' => $system,
                'descripcion' => $description,
                'score' => 0
            ]);
            $totalPoll=0;
            foreach ($evaluations as $val) {

                $evalua = Evaluation::create([
                    'id_metric' => $val['id_metric'],
                    'id_pool' => $poll->id,
                    'score' => 0
                ]);
                $totalEva=0;
                foreach ($val['answers'] as $val2) {
                    $this->saveAnswers(null,$evalua->id,$val2['id_question'],$val2['id_option']);
                    $op = Option::find($val2['id_option']);
                    $totalEva+=$op->score;
                }
                $totalEvaF=$totalEva/(count($val['answers'])!=0?count($val['answers']):1);
                $ev =Evaluation::find($evalua->id);
                $ev->score=round($totalEvaF, 2);
                $ev->save();

                $totalPoll+=$totalEvaF;
            }
            
            $totalPollF=$totalPoll/(Metric::count()!=0?Metric::count():1);
            $po = Poll::find($poll->id);
            $po->score=round($totalPollF,2);
            $po->save();
            return response()->json([
                "status" => "200",
                "message" => 'Registro exitoso',
                'id_poll'=>$poll->id,
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
    public function saveAnswers($idAnswer,$idEvaluation,$idQuestion,$idOption){
        $data = \DB::select("select id from answers where id_evaluation=$idEvaluation and id_question=$idQuestion");

        if($data!=null){
            $answer = Answer::find($data[0]->id);
            $answer->id_option = $idOption;
            $answer->save();
        }else{
            Answer::create([
                'id_option' => $idOption,
                'id_evaluation' => $idEvaluation,
                'id_question' => $idQuestion
            ]);
        }
       
        
    }
    public function show($id)
    {
        $data = Poll::find($id);
        $data2 = \DB::select("select * from evaluations where id_pool=$id");
        $data3 = \DB::select("select an.*,eva.id_metric as id_metric from answers an,evaluations eva where eva.id=an.id_evaluation and an.id_evaluation in (select id from evaluations where id_pool=$id)");
        if (!is_null($data)) {
            return response()->json([
                "status" => "200",
                "message" => 'Datos obtenidos con éxito',
                "data" => ([
                    "poll"=>$data,
                    "evaluations"=>$data2,
                    "answers"=>$data3
                ]),
                "type" => 'success'
            ]);
        } else {
            return response()->json([
                "status" => "500",
                "message" => "Datos no encontrados",
                "type" => 'error'
            ]);
        }
    }
    public function update(Request $request,$id)
    {
        $name = $request->input('name');
        $system = $request->input('system');
        $description = $request->input('description');
        $evaluations = $request->input('evaluations');
        //$user = Auth::user();
        $vacios = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'system' => 'required',
            'evaluations' => 'required'

        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            $poll=Poll::find($id);
            $poll->name=$name;
            $poll->id_system=$system;
            $poll->descripcion=$description;
            $poll->save();

            $totalPoll=0;
            foreach ($evaluations as $val) {
                $eva = Evaluation::where([
                    ['id_metric', '=', $val['id_metric']],
                    ['id_pool', '=', $poll->id]
                ])->first();
                $evalua=null;
                if(is_null($eva)){
                    $evalua = Evaluation::create([
                        'id_metric' => $val['id_metric'],
                        'id_pool' => $poll->id,
                        'score' => 0
                    ]);
                }else{
                    $eva->id_metric=$val['id_metric'];
                    $eva->id_pool=$poll->id;
                    $eva->save();
                }
               
                $totalEva=0;
                foreach ($val['answers'] as $val2) {
                    $this->saveAnswers(1,($eva==null?$evalua->id:$eva->id),$val2['id_question'],$val2['id_option']);
                    $op = Option::find($val2['id_option']);
                    $totalEva+=$op->score;
                }
                $totalEvaF=$totalEva/(count($val['answers'])!=0?count($val['answers']):1);
                $ev =Evaluation::find(($eva==null?$evalua->id:$eva->id));
                $ev->score=round($totalEvaF, 2);
                $ev->save();

                $totalPoll+=$totalEvaF;
            }
            $totalPollF=$totalPoll/(Metric::count()!=0?Metric::count():1);
            $po = Poll::find($poll->id);
            $po->score=round($totalPollF,2);
            $po->save();
            return response()->json([
                "status" => "200",
                "message" => 'Actualización exitoso',
                'id_poll'=>$poll->id,
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
        $data = Poll::find($id);
        if (!is_null($data)) {
            $data->delete();
          /*   $dataEvaluation = Evaluation::where('id_pool', $id)->get();
            $dataEvaluation->delete(); */
            return response()->json([
                "status" => "200",
                "message" => 'Eliminación exitosa',
                "type" => 'success'
            ]);
        } else {
            return response()->json([
                "status" => "500",
                "message" => 'Datos no encontrados',
                "type" => 'error'
            ]);
        }
    }
}
