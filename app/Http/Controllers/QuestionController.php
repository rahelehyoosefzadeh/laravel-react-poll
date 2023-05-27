<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Poll $poll)
    {
        //
        Validator::make($request->all(),[
            'title'=>['required'],
        ])->validate();

        $question =  New Question($request->all());

        $poll = $poll->questions()->save($question);
        // Return a response
        $poll_id = $poll->poll_id;
        $questions  =  Poll::find($poll->poll_id)->questions;
        return response()->json([
            'message' => 'Question saved successfully.',
            'poll' => $poll,
            'questions' => $questions
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        //
    }
}
