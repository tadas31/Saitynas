<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComputerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('computers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('image_url')->nullable();

            $table->unsignedBigInteger('motherboard_id')->nullable();
            $table->unsignedBigInteger('cpu_id')->nullable();
            $table->unsignedBigInteger('ram_id')->nullable();
            $table->unsignedBigInteger('case_id')->nullable();
            $table->unsignedBigInteger('psu_id')->nullable();

            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('motherboard_id')
                ->references('id')
                ->on('parts')
                ->onDelete('set null');

            $table->foreign('cpu_id')
                ->references('id')
                ->on('parts')
                ->onDelete('set null');

            $table->foreign('ram_id')
                ->references('id')
                ->on('parts')
                ->onDelete('set null');

            $table->foreign('case_id')
                ->references('id')
                ->on('parts')
                ->onDelete('set null');

            $table->foreign('psu_id')
                ->references('id')
                ->on('parts')
                ->onDelete('set null');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('computers');
    }
}
