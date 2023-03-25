import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from './../Components/Navbar';

export default function EditNews(props) {
    // console.log(props);
    const [title, setTitle] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id, title, descriptions, category,
        }
        router.post('/news/update', data);
        setTitle('');
        setDescriptions('');
        setCategory('');
    }
    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full lg:w-96 bg-base-100 shadow-xl m-2">
                <div className='p-4 text-2xl'>Edit Berita</div>
                <div className="card-body">
                    <input type="text" onChange={(title) => setTitle(title.target.value)} defaultValue={props.myNews.title} placeholder="judul" className="m-2 input input-bordered input-info w-full" />
                    <input type="text" onChange={(descriptions) => setDescriptions(descriptions.target.value)} defaultValue={props.myNews.descriptions} placeholder="Deskripsi" className="m-2 input input-bordered input-info w-full" />
                    <input type="text" onChange={(category) => setCategory(category.target.value)} defaultValue={props.myNews.category} placeholder="Kategori" className="m-2 input input-bordered input-info w-full" />
                    <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>Update</button>
                </div>
            </div>
        </div>
    )
}