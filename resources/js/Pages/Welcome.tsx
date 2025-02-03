import MainLayout from "@/Layouts/MainLayout"
import axios from "axios";
import { useEffect, useState } from "react";

interface Shortener {
    id: number;
    shortened_url: string;
    original_url: string;
    author_email: string;
    is_enabled: boolean;
    is_validated: boolean;
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

    return (
        <MainLayout>
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
                                {shortenerPagination.data.map((shortener: Shortener) => (
                                    <tr key={shortener.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 text-black dark:text-gray-200 font-bold">
                                        <a href={shortener.shortened_url} target="_blank">short url</a>
                                        </td>
                                        <td className="px-6 py-4 truncate max-w-md" title={shortener.original_url}>
                                            <a href={shortener.original_url} target="_blank">{shortener.original_url}</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {shortener.author_email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {shortener.is_enabled ? 'Yes' : 'No'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {shortener.is_validated != null ? 'Yes' : 'No'}
                                        </td>
                                        <td className="px-6 py-4 dark:text-white font-bold">
                                            {shortener.clicks}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                </li>
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
            </div>
        </MainLayout>
    )
}

export default Welcome;
