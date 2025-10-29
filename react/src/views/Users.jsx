import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    })


    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = (page = 1) => {
        setLoading(true);
        axiosClient.get(`/users?page=${page}`).then(({data}) => {
            setLoading(false);
            console.log(data);
            setUsers(data.data);
            setPagination({
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                per_page: data.meta.per_page,
                total: data.meta.total,
            });
        }).catch(() => {
            setLoading(false);
        })
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.last_page) {
            getUsers(newPage);
        }
    }

    const generatePageNumbers = () => {
        const pages = [];
        const current = pagination.current_page;
        const last = pagination.last_page;

        pages.push(1);

        let start = Math.max(2, current - 1);
        let end = Math.min(last-1, current+1);

        if (start > 2){
            pages.push('...');
        }

        for (let i = start; i<= end; i++){
            pages.push(i);
        }

        if(end < last - 1){
            pages.push('...');
        }

        if(last > 1) {
            pages.push(last);
        }

        return pages;
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Creation Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link to={'/users/'+u.id} className="btn-edit">Edit</Link>
                                        <button className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>

                {pagination.last_page > 1 && (
                    <div className="pagination" style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: '20px',
                        gap: '10px'
                    }}>

                        <button 
                            onClick={() => handlePageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1}
                            className="btn-pagination"
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                backgroundColor: pagination.current_page === 1 ? '#f5f5f5' : 'white',
                                cursor: pagination.current_page === 1 ? 'not-allowed' : 'pointer',
                                borderRadius: '4px'
                            }}
                        >
                            Previous
                        </button>


                        {generatePageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                disabled={page === '...'}
                                className={`btn-pagination ${pagination.current_page === page ? 'active' : ''}`}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    backgroundColor: pagination.current_page === page ? '#007bff' : 'white',
                                    color: pagination.current_page === page ? 'white' : 'black',
                                    cursor: page === '...' ? 'default' : 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                {page}
                            </button>
                        ))}

                        <button 
                            onClick={() => handlePageChange(pagination.current_page + 1)}
                            disabled={pagination.current_page === pagination.last_page}
                            className="btn-pagination"
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                backgroundColor: pagination.current_page === pagination.last_page ? '#f5f5f5' : 'white',
                                cursor: pagination.current_page === pagination.last_page ? 'not-allowed' : 'pointer',
                                borderRadius: '4px'
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}

                <div style={{ 
                    textAlign: 'center', 
                    marginTop: '10px', 
                    color: '#666',
                    fontSize: '14px'
                }}>
                    Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} entries
                </div>
            </div>
        </div>
    )
}