<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    use HasFactory;
    protected $fillable = [
        'poll_id','title', 'options', 'qtype'
    ];

    /**
     * Get the poll that owns the questions.
     */
    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class,'poll_id');
    }


}
