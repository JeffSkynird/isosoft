<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMetricQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('metric_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_metric');
            $table->foreign('id_metric')
                ->references('id')
                ->on('metrics')->onDelete('cascade');
            $table->unsignedBigInteger('id_question');
            $table->foreign('id_question')
                ->references('id')
                ->on('questions')->onDelete('cascade');
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
        Schema::dropIfExists('metric_questions');
    }
}
