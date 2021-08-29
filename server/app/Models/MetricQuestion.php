<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetricQuestion extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_metric',
        'id_question'
    ];
}
