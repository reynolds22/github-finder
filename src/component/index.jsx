import React, {useState, useEffect} from "react";
import User from "./user";
import "./index.css";

export default function GitHubFinder(){

    const [userName, setUserName] = useState("reynolds22");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSubmit(){
        fetchGitHubData();
    };

    async function fetchGitHubData(){
        setLoading(true)
        const responce = await fetch(`https://api.github.com/users/${userName}`);
        const data = await responce.json();
        
        if(data){
            setUserData(data);
            setLoading(false);
            setUserName('');
        };

        console.log(data);
    };

    useEffect(()=>{
        fetchGitHubData();
    }, []);

    if(loading){
        return <h1>Loading Data ! Please Wait</h1>
    };

    return (
        <div className="gh-profile">
            <div className="input-wrapper">
                <input
                    name="search-username"
                    type="text"
                    placeholder="Search GitHub Username..."
                    value={userName}
                    onChange={(event)=> setUserName(event.target.value)}
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {userData !== null ? <User user={userData} /> : null}
        </div>
    );
};