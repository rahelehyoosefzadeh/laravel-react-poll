import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';

export default function Dashboard(props) {

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    const { poll, questions } = usePage().props;
    const [questionList, setQuestionList] = useState(questions);
    const [showForm, setshowForm] = useState(false);

    const handleClick = () => {
        setshowForm((previousState) => !previousState);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        options: '',
        qtype: ''
    });

    useEffect(() => {
        setQuestionList(questions);
    }, [questions]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = `/polls/${poll.id}/questions`;
        axios.post(url, formData)
            .then(response => {
                // Handle the successful response
                console.log(response.data);
                // Perform any necessary actions after saving the question
                const newQuestions = response.data.questions;
                setQuestionList(prevList => [...newQuestions]);
                setshowForm(false);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
                // Perform any necessary error handling
            });

    }


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Polls</h2>}
        >
            <Head title="You're in Polls" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-blue-300 text-gray-900">{poll.title} ( ID: {poll.id} )</div>
                        <div className="px-6 py-2 text-gray-900">From: {poll.start}</div>
                        <div className="px-6 py-2 text-gray-900">To: {poll.end}</div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-2 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionList.map(({ id, title }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{id}</td>
                                            <td className="border px-4 py-2">{title}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-6 bg-white border-b border-gray-200">
                                <PrimaryButton className="ml-4" disabled={processing} onClick={handleClick}>
                                    New Question
                                </PrimaryButton>
                            </div>
                            {showForm && (
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <form onSubmit={handleSubmit}>
                                        <meta name="csrf-token" content="{{ csrf_token() }}" />

                                        <div>
                                            <InputLabel htmlFor="title" value="Title" />
                                            <TextInput
                                                id="title"
                                                name="title"
                                                value={data.title}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={(e) => setData('title', e.target.value)}
                                            />

                                            <InputError message={errors.title} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="qtype" value="Question Type" />
                                            <TextInput
                                                id="qtype"
                                                name="qtype"
                                                value={data.qtype}
                                                className="mt-1 block w-haf"
                                                isFocused={true}
                                                onChange={(e) => setData('qtype', e.target.value)}
                                            />

                                            <InputError message={errors.qtype} className="mt-2" />
                                        </div>
                                        <div className="flex items-center justify-end mt-4">
                                            <PrimaryButton className="ml-4" disabled={processing}>
                                                Add Question
                                            </PrimaryButton>

                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
