<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Poll extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'start', 'end'
    ];

    /**
     * Get the questions of the poll.
     */

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'poll_id');
    }


}
