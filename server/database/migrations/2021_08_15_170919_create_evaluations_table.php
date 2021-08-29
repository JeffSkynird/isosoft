<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->double('score');
            $table->unsignedBigInteger('id_metric');
            $table->foreign('id_metric')
                ->references('id')
                ->on('metrics')->onDelete('cascade');
            $table->unsignedBigInteger('id_pool');
            $table->foreign('id_pool')
                ->references('id')
                ->on('polls')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluations');
    }
}
