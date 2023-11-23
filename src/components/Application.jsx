import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Application = () => {
  let [search, setSearch] = useState("chicken");
  let [query, setquery] = useState("");
  let [data, setData] = useState([]);
  let [main , setMain] = useState("home-app");
  let [err,setErr] = useState("err-none");

  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  let Foodfetch = async () => {
    let Auth = await axios.post("http://localhost:8000/user/auth", {
      token: token,
    }).catch(err => {
        if(err.response.status === 404){
            console.log("un");
            setMain("main-none");
            setErr("err");
        }
    })
    if (Auth.status == 200) {
      let res = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=6d249271&app_key=fc9f11c3503fbe6e9f2729caf476b899`
      );
      setData(res.data.hits);
    }else{
        console.log("Unauthorised")
    }
  };

  let Query = () => {
    setquery(search);
  };

  let Logout = async () => {
    let res = await axios.post("http://localhost:8000/user/logout" , {
      token : token
    }).catch(err => {
      if(err.response.status === 404){
        console.log("unauthorised")
      }
    })

    if(res.status === 200){
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  useEffect(() => {
    Foodfetch();
  }, [query]);
  return (
    <div>
    <div className={main}>
      <div className="search-area">
        <div className="input-home">
          <input
            type="text"
            placeholder="Enter any receipe name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="btn-home">
          <button onClick={Query}>Search</button>
        </div>
      </div>
      <div className="overall-food">
        {data.map((i) => {
          return (
            <div className="display-food">
              <div className="food-img">
                <img src={i.recipe.image} alt="" />
              </div>
              <div className="name">
                <h4>{i.recipe.label}</h4>
              </div>
              <div className="type">
                <p>{i.recipe.cuisineType[0]}</p>
                <p>{i.recipe.mealType[0]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <div className={err}>
        <div className="warn">
            <img src="Images/warn.svg" alt="" />
        </div>
        <div className="warn-msg">
            <h3>Error Occurs on Server!!</h3>
            <div className="link">
                <span onClick={Logout}>login again!!</span>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Application;
