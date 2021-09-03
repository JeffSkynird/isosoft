<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

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
Route::group(['prefix' => 'v1'], function () {
    Route::group([
        'prefix' => 'auth',
    ], function() {
        Route::post('login', 'App\Http\Controllers\v1\Seguridad\AuthController@login');
        Route::post('logout', 'App\Http\Controllers\v1\Seguridad\AuthController@logout')->middleware('auth:api');

    });

    Route::post('users', 'App\Http\Controllers\v1\Seguridad\UsuarioController@create');
    Route::put('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@update');
    Route::get('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@show');

    Route::get('systems/{id}', 'App\Http\Controllers\v1\Evaluation\SystemController@show');
    Route::delete('systems/{id}', 'App\Http\Controllers\v1\Evaluation\SystemController@delete');
    Route::put('systems/{id}', 'App\Http\Controllers\v1\Evaluation\SystemController@update');

    Route::post('polls', 'App\Http\Controllers\v1\Evaluation\PollController@create');
    Route::get('polls/{id}', 'App\Http\Controllers\v1\Evaluation\PollController@show');
    Route::delete('polls/{id}', 'App\Http\Controllers\v1\Evaluation\PollController@delete');
    Route::put('polls/{id}', 'App\Http\Controllers\v1\Evaluation\PollController@update');
    Route::get('metrics', 'App\Http\Controllers\v1\Evaluation\MetricController@index');
    Route::get('questions', 'App\Http\Controllers\v1\Evaluation\QuestionController@index');
    Route::get('options', 'App\Http\Controllers\v1\Evaluation\QuestionController@indexOptions');
    Route::get('showByPoll/{id}', 'App\Http\Controllers\v1\Evaluation\MetricController@showByPoll');
    Route::get('poll_result/{id}', 'App\Http\Controllers\v1\Evaluation\PollController@obtenerResultado');
    Route::get('features_result', 'App\Http\Controllers\v1\Evaluation\PollController@obtenerResultadoCaracteristica');

    
    Route::middleware('auth:api')->group(function () {
        Route::get('obtener_panel_result', 'App\Http\Controllers\v1\Evaluation\PollController@obtenerPanelResult');
        Route::get('metrics_systems', 'App\Http\Controllers\v1\Evaluation\PollController@obtenerSistemasMetricas');

        
        Route::get('systems', 'App\Http\Controllers\v1\Evaluation\SystemController@index');
        Route::post('systems', 'App\Http\Controllers\v1\Evaluation\SystemController@create');
        Route::get('polls', 'App\Http\Controllers\v1\Evaluation\PollController@index');

        Route::put('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@updateAuth');
        Route::get('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@showAuth');

    });
   
});