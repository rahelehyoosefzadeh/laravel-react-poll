import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm  } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';


export default function Dashboard(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        start: '',
        end: '',
        poll_status: '0',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("polls.store"));
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Poll</h2>}
        >
            <Head title="You're in Polls" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 bg-gray-300">You're Polls!</div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
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
                                    <InputLabel htmlFor="start" value="Start Date" />

                                    <TextInput
                                        id="start"
                                        name="start"
                                        type="date"
                                        value={data.start}
                                        className="mt-1 block w-half"
                                        onChange={(e) => setData('start', e.target.value)}
                                    />

                                    <InputError message={errors.start} className="mt-2" />
                                    <InputLabel htmlFor="start" value="End Date" />

                                    <TextInput
                                        id="end"
                                        name="end"
                                        type="date"
                                        value={data.end}
                                        className="mt-1 block w-half"
                                        onChange={(e) => setData('end', e.target.value)}
                                    />

                                    <InputError message={errors.end} className="mt-2" />
                                </div>


                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Save Poll
                                    </PrimaryButton>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
