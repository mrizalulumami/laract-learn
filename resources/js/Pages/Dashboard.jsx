import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import route from './../../../vendor/tightenco/ziggy/src/js/index';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotify] = useState(false);

    const handleSubmit = () => {
        const data = {
            title, descriptions, category,
        }
        router.post('/news', data);
        setIsNotify(true);
        setTitle('');
        setDescriptions('');
        setCategory('');
    }

    useEffect(() => {
        if (!props.myNews) {
            router.get('/news')
        }
        console.log('props', props);
        return;
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Berita saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isNotif && <div className="alert alert-info shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{props.flash.message}</span>
                        </div>
                    </div>
                    }
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <input type="text" onChange={(title) => setTitle(title.target.value)} value={title} placeholder="judul" className="m-2 input input-bordered input-info w-full" />
                        <input type="text" onChange={(descriptions) => setDescriptions(descriptions.target.value)} value={descriptions} placeholder="Deskripsi" className="m-2 input input-bordered input-info w-full" />
                        <input type="text" onChange={(category) => setCategory(category.target.value)} value={category} placeholder="Kategori" className="m-2 input input-bordered input-info w-full" />
                        <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>SUBMIT</button>
                    </div>
                </div>
                <div className='flex justify-center p-4'>
                    {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                        return (
                            <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl m-2">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{news.descriptions}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{news.category}</div>
                                        <div className="badge badge-outline">
                                            <Link href={route('edit.news')} method='get' data={{ id: news.id }} as='button'>
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-inline">
                                            <Link href={route('delete.news')} method='post' data={{ id: news.id }} as='button'>
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>Kamu belum memiliki berita</p>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
