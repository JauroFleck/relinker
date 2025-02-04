import MainLayout from "@/Layouts/MainLayout"
import axios from "axios";
import { useEffect, useState } from "react";

interface Shortener {
    id: number;
    shortened_url: string;
    original_url: string;
    author_email: string;
    is_enabled: boolean;
    is_valid: boolean;
    response_time: number;
    clicks: number;
}

interface LinkPagination {
    active: boolean;
    label: string;
    url: string | null;
}

interface ShortenerPagination {
    current_page: number;
    data: Shortener[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkPagination[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

const Welcome = () => {

    const [shortenerPagination, setShortenerPagination] = useState<ShortenerPagination>();

    useEffect(() => {
        axios.get(route('shorteners.index')).then(response => {
            console.log(response.data);
            setShortenerPagination(response.data);
        });
    }, []);

    const previous = () => {
        if (!shortenerPagination?.prev_page_url) return;
        axios.get(shortenerPagination?.prev_page_url).then(response => {
            setShortenerPagination(response.data);
        });
    }

    const next = () => {
        if (!shortenerPagination?.next_page_url) return;
        axios.get(shortenerPagination?.next_page_url)
        .then(response => {
            setShortenerPagination(response.data);
        });
    }

    const goToPage = (page: number) => (event: React.MouseEvent) => {
        event.preventDefault();
        axios.get(route('shorteners.index', { page: page }))
        .then(response => {
            setShortenerPagination(response.data);
        });
    }

    function submitNewURL() {
        const original_url = (document.getElementById('original_url') as HTMLInputElement).value;
        const shortened_url = (document.getElementById('shortened_url') as HTMLInputElement).value;
        const author_email = (document.getElementById('author_email') as HTMLInputElement).value;

        axios.post(route('shorteners.store'), {
            original_url: original_url,
            desired_url: shortened_url,
            author_email: author_email
        }).then(response => {
            
            axios.get(route('shorteners.index', { page: shortenerPagination?.current_page, per_page: shortenerPagination?.per_page })).then(response => {
                setShortenerPagination(response.data);
            });

        }).catch(error => {
            console.log(error.response.data);
        });
    }

    const deleteShortened = (id: number) => (event: React.MouseEvent) => {
        axios.delete(route('shorteners.destroy', { shortener: id }))
        .then(response => {
            axios.get(route('shorteners.index', { page: shortenerPagination?.current_page, per_page: shortenerPagination?.per_page })).then(response => {
                setShortenerPagination(response.data);
            });
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    const validateUrl = (id: number) => (event: React.MouseEvent) => {
        axios.put(route('validateUrl', { id: id }))
        .then(response => {
            console.log(response.data);
            axios.get(route('shorteners.index', { page: shortenerPagination?.current_page, per_page: shortenerPagination?.per_page })).then(response => {
                setShortenerPagination(response.data);
            });
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    return (
        <MainLayout title="Home">
            <div className="container p-5 mx-auto my-5 bg-gray-200 dark:bg-slate-800 rounded-lg shadow-lg dark:text-gray-200">
                <h1 className="text-3xl font-semibold text-center mb-3">Shortened URLs</h1>
                {shortenerPagination ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Shortened URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Original URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author e-mail
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Enabled
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Validated
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Clicks
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">More</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {shortenerPagination.data.map((shortener: Shortener) => (
                                    <tr key={shortener.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 text-black dark:text-gray-200 font-bold">
                                        <a href={shortener.shortened_url} target="_blank">{route('home') + '/' + shortener.shortened_url}</a>
                                        </td>
                                        <td className="px-6 py-4 truncate max-w-md" title={shortener.original_url}>
                                            <a href={shortener.original_url} target="_blank">{shortener.original_url}</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {shortener.author_email}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {shortener.is_enabled ? 'Yes' : 'No'}
                                        </td>
                                        <td className="px-6 py-4 relative flex">
                                            <span className="w-full text-center">{shortener.is_valid != null ? (`Yes (${shortener.response_time}ms)`) : 'No'}</span>
                                            <svg onClick={validateUrl(shortener.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hover:cursor-pointer hover:text-blue-500 size-4 absolute right-12"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                                        </td>
                                        <td className="px-6 py-4 dark:text-white font-bold text-center">
                                            {shortener.clicks}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" onClick={deleteShortened(shortener.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h3a1 1 0 110 2h-1v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5H2a1 1 0 110-2h3V2zm2 1v1h4V3H8zm-3 4v9a1 1 0 001 1h8a1 1 0 001-1V7H5z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                Showing&nbsp;
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {shortenerPagination.from}-{shortenerPagination.to}&nbsp;
                                </span>
                                of&nbsp;
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {shortenerPagination.total}
                                </span>
                            </span>
                            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                <li>
                                    <a href="#" onClick={previous} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                                </li>
                                {shortenerPagination.current_page > 2 && (
                                    <li>
                                        <a href="#" onClick={goToPage(shortenerPagination.current_page - 2)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            {shortenerPagination.current_page - 2}
                                        </a>
                                    </li>
                                )}
                                {shortenerPagination.current_page > 1 && (
                                    <li>
                                        <a href="#" onClick={goToPage(shortenerPagination.current_page - 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            {shortenerPagination.current_page - 1}
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                        {shortenerPagination.current_page}
                                    </a>
                                </li>
                                {shortenerPagination.current_page < shortenerPagination.last_page && (
                                    <li>
                                        <a href="#" onClick={goToPage(shortenerPagination.current_page + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            {shortenerPagination.current_page + 1}
                                        </a>
                                    </li>
                                )}
                                {shortenerPagination.current_page < shortenerPagination.last_page - 1 && (
                                    <li>
                                        <a href="#" onClick={goToPage(shortenerPagination.current_page + 2)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            {shortenerPagination.current_page + 2}
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <a href="#" onClick={next} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) : ( // Loading skeleton
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Shortened URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Original URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author e-mail
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Enabled
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Validated
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Clicks
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">More</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(5)].map((_, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse">
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/4"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/4"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/4"></div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/4"></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="mt-8 rounded bg-gray-100 dark:bg-sky-950 p-5">
                    <h2 className="text-2xl font-semibold text-center mb-3">Add New URL</h2>
                    <form className="grid grid-cols-9 gap-3">
                        <div className="col-span-4">
                            <label htmlFor="original_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original URL</label>
                            <input type="text" id="original_url" name="shortened_url" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-800 focus:border-stone-800 sm:text-sm dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="shortened_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Desired Shortened URL (optional)</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 select-none">
                                    {route('home')}/
                                </span>
                                <input type="text" id="shortened_url" name="prefix" className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 focus:ring-stone-800 focus:border-stone-800 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="author_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author E-mail</label>
                            <input type="email" id="author_email" name="author_email" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-800 focus:border-stone-800 sm:text-sm dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="text-center col-span-1 flex">
                            <button type="button" onClick={submitNewURL} className="mt-auto inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add URL</button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

export default Welcome;
