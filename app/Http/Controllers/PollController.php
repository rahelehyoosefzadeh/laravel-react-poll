<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $polls = Poll::all();
        return Inertia::render('Polls/Index', ['polls' => $polls]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Polls/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        Validator::make($request->all(), [
            'title' => ['required'],
            'start' => ['required', 'before:end'],
            'end' => ['required', 'after:start'],
        ])->validate();

        $poll = Poll::create($request->all());

        $questions  = $poll::find($poll->id)->questions;
        return Inertia::render('Polls/Edit', [
            'poll' => $poll,
            'questions' => $questions,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Poll $poll)
    {
        //
        $questions  = $poll->questions();
        return Inertia::render('Polls/Edit', [
            'poll' => $poll,
            'questions' => $questions,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poll $poll)
    {
        //
        $questions  = $poll::find($poll->id)->questions;
        return Inertia::render('Polls/Edit', [
            'poll' => $poll,
            'questions' => $questions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Poll $poll)
    {
        //
        Validator::make($request->all(), [
            'title' => ['required'],
            'start' => ['required|before:end'],
            'end' => ['required|after:start'],
        ])->validate();

        Poll::find($poll)->update($request->all());

        return redirect()->route('polls.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poll $poll)
    {
        //
        Poll::find($poll)->delete();
        return redirect()->route('polls.index');
    }
}
