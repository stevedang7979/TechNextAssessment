import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { LineChart } from '../components/LineChart';
import { BarChart } from '../components/BarChart';

export default function Tabs() {
    const [query, setQuery] = useState('');
    const [searchClicked, setsearchClicked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentResult, setCurrentResult] = useState([]);


    //table config
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Phase',
            dataIndex: 'phase',
            key: 'phase',
        }
    ];

    //fetch search API
    async function searchAPI(key) {
        try {
            let uri = "https://testtechnext1-pearl118.b4a.run/search/api/query/?query=" + key
            const response = await fetch(uri, {
                method: "GET",
            });
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    }



    //Start searching and update states
    async function startSearch() {
        setsearchClicked(true);
        setLoading(true)
        // console.log(query);
        if (query.length > 0) {
            let res = await searchAPI(query);
            setCurrentResult(res);
            setLoading(false)
            // console.log(currentResult)

        }
    }



    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-search-tab" data-bs-toggle="tab" data-bs-target="#search-tab-pane" type="button" role="tab" aria-controls="nav-search" aria-selected="true">Home</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#result-tab-pane" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Result</button>
                    <button className="nav-link" id="nav-plot-tab" data-bs-toggle="tab" data-bs-target="#plot-tab-pane" type="button" role="tab" aria-controls="nav-plot" aria-selected="false">Line Chart</button>
                    <button className="nav-link" id="nav-bar-tab" data-bs-toggle="tab" data-bs-target="#bar-tab-pane" type="button" role="tab" aria-controls="nav-bar" aria-selected="false">Bar Chart</button>

                </div>
            </nav>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="search-tab-pane" role="tabpanel" aria-labelledby="search-tab" tabIndex="0">
                    <div className={styles.container2}>
                        <div className='input-group shadow-sm p-3 mb-5 bg-white rounded'>
                            <div className="input-group">
                                <input type="text" className="form-control" name="querySearch" id="querySearch" placeholder="Enter your term here" aria-describedby="button-addon2" onChange={e => { setQuery(e.currentTarget.value); }} />
                                <button className="btn btn-primary" type="button" onClick={() => startSearch()} id="button-addon2" >Search</button>

                            </div>
                            {query.length == 0 && searchClicked &&
                                <div className={styles.h1}>
                                    Please enter a valid term!
                                </div>
                            }
                        </div>

                    </div>

                </div>
                <div className="tab-pane fade" id="result-tab-pane" role="tabpanel" aria-labelledby="result-tab" tabIndex="0">
                    <div>{
                        loading &&
                        <div className="d-flex justify-content-center mt-3">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    </div>
                    <div>
                        {
                            loading == false &&
                            <div>
                                <Table columns={columns} dataSource={currentResult} />
                            </div>
                        }
                    </div>
                </div>
                <div className="tab-pane fade" id="plot-tab-pane" role="tabpanel" aria-labelledby="plot-tab-pane" tabIndex="0">
                    <LineChart />
                </div>
                <div className="tab-pane fade" id="bar-tab-pane" role="tabpanel" aria-labelledby="bar-tab-pane" tabIndex="0">
                    <BarChart />
                </div>
            </div>

        </div>
    )
}
