import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link  } from '@inertiajs/react';

export default function Dashboard(props) {
    const { polls }  = usePage().props
    console.log(props);

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Polls</h2>}
        >
            <Head title="You're in Polls" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're Polls!</div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-2 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Start</th>
                                        <th className="px-4 py-2">End</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {polls.map(({ id, title, start, end }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{ id }</td>
                                            <td className="border px-4 py-2">{ title }</td>
                                            <td className="border px-4 py-2">{ start }</td>
                                            <td className="border px-4 py-2">{ end }</td>
                                            <td className="border px-4 py-2">

                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("polls.edit", id)}
                                                >
                                                    Show
                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
