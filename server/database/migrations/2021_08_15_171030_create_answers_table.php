<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_evaluation');
            $table->foreign('id_evaluation')
                ->references('id')
                ->on('evaluations')->onDelete('cascade');
            $table->unsignedBigInteger('id_question');
            $table->foreign('id_question')
                ->references('id')
                ->on('questions')->onDelete('cascade');
            $table->unsignedBigInteger('id_option');
            $table->foreign('id_option')
                ->references('id')
                ->on('options')->onDelete('cascade');
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
        Schema::dropIfExists('answers');
    }
}
